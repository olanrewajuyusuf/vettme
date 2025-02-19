import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLocation, useNavigate } from "react-router-dom";
import { ThickArrowLeftIcon, ThickArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";
import { useDeleteAgent, useFetchAgents } from "@/hooks/backOffice";
import { useEffect, useMemo, useState } from "react";
import { BiPhoneIncoming } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { VerificationSkeleton } from "@/components/SkeletonUi";

interface agentsProps {
    id: string,
    agentName: string,
    phone_number: string,
    email: string,
    accessCode: string,
    country: string,
    lga: string,
    state: string,
}

const AllAgents = () => {
    const [ agents, setAgents ] = useState<agentsProps[] | null>(null);
    const { fetchAgents } = useFetchAgents();
    const { deleteAgent } = useDeleteAgent();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getAgents = async () => {
          try {
            const data = await fetchAgents();
            setAgents(data.result);
          } catch (error) {
            console.error("Failed to fetch Field Agents:", error);
            setError("Failed to fetch Field Agents")
          } finally {
            setLoading(false);
          }
        };
    
        getAgents();
    }, [fetchAgents]);    

    const filteredAgents = agents
        ? agents
            .filter((agent) => {
                const query = searchQuery.toLowerCase();
                return (
                    agent.agentName.toLowerCase().includes(query) ||
                    agent.country.toLowerCase().includes(query) ||
                    agent.state.toLowerCase().includes(query) ||
                    agent.lga.toLowerCase().includes(query)
                );
            })
        : null;

    const noAgentsMessage =
        filteredAgents && filteredAgents.length === 0
        ? `No Country, State or LGA match ${searchQuery}...`
        : null;

    const itemsPerPage = 10;
    const location = useLocation();
    
    // Get current page from URL, defaulting to 1 if not present
    const currentPage = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get("page") || "1", 10);
        return page > 0 ? page : 1;
    }, [location.search]);
    
    // Calculate total pages and paginated data
    const totalPages = Math.ceil((filteredAgents?.length || 0) / itemsPerPage);
    const paginatedData = useMemo(
        () =>
        filteredAgents?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [filteredAgents, currentPage, itemsPerPage]
    );
    
    // Handle page change by updating URL
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(location.search);
        params.set("page", page.toString());
        navigate({ search: params.toString() });
    };

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
                <div className="py-4 border-b-[1px] border-stroke-clr px-5">
                    <div className="relative w-[33%]">
                        <Input
                            type="text"
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-sm"
                            placeholder="Search by name, country, state, or LGA"
                        />
                        <SearchIcon className="text-stroke-clr absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
                {/* Loading, Error, and No Data States */}
                {loading && (
                    <div className="flex flex-col gap-3">
                        <VerificationSkeleton />
                        <VerificationSkeleton />
                        <VerificationSkeleton />
                    </div>
                )}
                {error && (
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <h3>{error}</h3>
                    </div>
                )}
                {noAgentsMessage && (
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <h3>{noAgentsMessage}</h3>
                    </div>
                )}
                {paginatedData && paginatedData.length > 0 && (
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
                        {paginatedData?.map((agent: agentsProps) => (
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
                {/* Pagination Controls */}
                <div className="flex items-center justify-center w-full gap-3 py-3 border-t-[1px]">
                    <Button
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      className="bg-green-600 text-white hover:bg-green-500"
                    >
                      <ThickArrowLeftIcon/>
                    </Button>
                    <p>
                      Page <span className="font-bold">{currentPage}</span> of <span className="font-bold text-blue-700">{totalPages}</span>
                    </p>
                    <Button
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      className="bg-green-600 text-white hover:bg-green-500"
                    >
                      <ThickArrowRightIcon/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AllAgents;