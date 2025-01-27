import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination";
import loader from "@/assets/loader.svg";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDeleteAgent, useFetchAgents } from "@/hooks/backOffice";
import { useEffect, useState } from "react";
import { BiPhoneIncoming } from "react-icons/bi";

interface agentsProps {
    id: string,
    agentName: string,
    phone_number: string,
    email: string,
    accessCode: string,
    lga: string,
    state: string,
}

const AllAgents = () => {
    const [ agents, setAgents ] = useState<agentsProps[] | null>(null);
    const { fetchAgents } = useFetchAgents();
    const { deleteAgent } = useDeleteAgent();
    const navigate = useNavigate();

    useEffect(() => {
        const getAgents = async () => {
          try {
            const data = await fetchAgents();
            setAgents(data.result);
          } catch (error) {
            console.error("Failed to fetch Field Agents:", error);
          }
        };
    
        getAgents();
    }, [fetchAgents]);

    const handleDelete = async (agentId: string) => {
        try {
            await deleteAgent(agentId);
            const updatedAgents = await fetchAgents();
            setAgents(updatedAgents.result);
        } catch (error: any) {
            console.error("Failed to delete company:", error.message);
        }
    };

    return (
        <div>
            <h1 className="font-normal">All Registered Agents</h1>
            <p className="mb-10">Manage all Field Agent information here.</p>
            <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
                <div className="w-full py-4 grid grid-cols-3 border-b-[1px] border-stroke-clr px-5">
                    <div className="flex items-center gap-3">
                        <p>Filter by: </p>
                        <select name="" id="" className="btn px-3">
                            <option value="country">Country</option>
                            <option value="state">State</option>
                            <option value="lga">LGA</option>
                        </select>
                    </div>
                </div>
                {agents === null ? (
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <img src={loader} alt="" className="w-10" />
                    </div>
                ) :
                agents.length === 0 ? (
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <h3>No registered Agent.</h3>
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-blue-700 h-8">
                            <TableRow>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Access Code</TableHead>
                                <TableHead className="text-white">Email</TableHead>
                                <TableHead className="text-white">State</TableHead>
                                <TableHead className="text-white">LGA</TableHead>
                                <TableHead className="text-white">Phone</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agents.map((agent: agentsProps) => (
                            <TableRow
                                key={agent.id}
                                onClick={() => navigate(`agent-info/${agent.id}`)}
                            >
                                <TableCell className="text-xs font-medium uppercase flex items-center gap-1">
                                    <div 
                                    className={`w-6 h-6 grid place-items-center text-white rounded-md bg-purple-600`}
                                    >
                                        {agent.agentName.slice(0, 2)}
                                    </div>
                                    <span>{agent.agentName}</span>
                                </TableCell>
                                <TableCell className='text-purple-600'>{agent.accessCode}</TableCell>
                                <TableCell className="text-gray-400">{agent.email}</TableCell>
                                <TableCell className="text-gray-400">{agent.state}</TableCell>
                                <TableCell className="text-gray-400">{agent.lga}</TableCell>
                                <TableCell className="flex items-center gap-1"><BiPhoneIncoming className="text-blue-400"/>{agent.phone_number}</TableCell>
                                <TableCell>
                                    <div
                                    className="cursor-pointer text-destructive text-xs px-4 flex items-center gap-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(agent.id);
                                    }}
                                    >
                                        <TrashIcon /> 
                                    </div>
                                </TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>

                )}
                {agents === null || agents?.length === 0  || <Pagination />}
            </div>
        </div>
    );
}

export default AllAgents;