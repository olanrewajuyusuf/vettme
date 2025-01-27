import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import loader from "@/assets/loader.svg";
import { useFetchAddresses, useFetchAgents } from "@/hooks/backOffice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
  
  interface AgentProps {
    agentName: string;
    email: string;
    address: string;
    lga: string;
    state: string;
    accessCode: string;
  }
  
  interface addressesProps {
    id: string;
    personnelName: string;
    personnelType: string;
    country: string;
    state: string;
    lga: string;
    address: string;
    status: string;
  }
  
  const AgentInfo = () => {
    const [checked, setChecked] = useState<string[]>([]);
    const [agent, setAgent] = useState<AgentProps | null>(null);
    const [pendingAddresses, setPendingAddresses] = useState<addressesProps[] | null>(null);
    const { fetchAddresses } = useFetchAddresses();
    const { fetchAgents } = useFetchAgents();
    const { id } = useParams();
  
    useEffect(() => {
      const getAgents = async () => {
        try {
          const data = await fetchAgents();
          const singleAgent = data.result.filter((item: any) => item.id === id);
          setAgent(singleAgent[0]);
        } catch (error) {
          console.error("Failed to fetch Field Agent:", error);
        }
      };
  
      const getAddresses = async () => {
        try {
          const data = await fetchAddresses();
          setPendingAddresses(data.data);
        } catch (error) {
          console.error("Failed to fetch pending addresses:", error);
        }
      };
  
      getAgents();
      getAddresses();
    }, [fetchAgents, id, fetchAddresses]);
  
    const toggleChecked = (id: string) => {
      setChecked((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Checked IDs:", checked);
    };
  
    return (
      <>
        <div className="grid grid-cols-2 gap-5">
            <div className="">
                <h1 className="text-2xl">Assign Address(es) to Agent: 
                    <span 
                    className="text-sm text-white bg-blue-400 px-3 py-2 ml-2 rounded-full"
                    >
                        {agent?.agentName}
                    </span>
                </h1>
                <p className="mt-5">All Addresses are being filtered based on Agent's State and pending status of the Address.</p>
            </div>
            <div className="bg-white p-5 rounded-lg">
            <Table>
                <TableBody className="h-8">
                <TableRow>
                    <TableCell className="border-r-[1px] border-gray-200">
                    <span className="text-blue-500 font-bold">Name:</span> {agent?.agentName}
                    </TableCell>
                    <TableCell>
                    <span className="text-blue-500 font-bold">Address:</span> {agent?.address}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-[1px] border-gray-200">
                    <span className="text-blue-500 font-bold">Email:</span> {agent?.email}
                    </TableCell>
                    <TableCell className="">
                    <span className="text-blue-500 font-bold">State:</span> {agent?.state}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="border-r-[1px] border-gray-200">
                    <span className="text-blue-500 font-bold">Access Code:</span> {agent?.accessCode}
                    </TableCell>
                    <TableCell>
                    <span className="text-blue-500 font-bold">LGA:</span> {agent?.lga}
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </div>
        </div>
  
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="text-center pb-3 border-b-[1px] border-gray-200">All assigned Addresses</h3>
            <div className="w-full h-[300px] flex justify-center items-center">
              <p>No Assigned Address.</p>
            </div>
          </div>
  
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-5 rounded-lg">
                <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-200">
                    <h3>All pending Addresses</h3>
                    <Button type="submit" className="red-gradient">Submit</Button>
                </div>
              {pendingAddresses === null ? (
                <div className="w-full h-[300px] flex items-center justify-center">
                  <img src={loader} alt="Loading" className="w-10" />
                </div>
              ) : pendingAddresses?.length === 0 ? (
                <div className="w-full h-[300px] flex justify-center items-center">
                  <h3>No available address data.</h3>
                </div>
              ) : (
                <div className="h-[300px] overflow-y-scroll">
                <Table>
                  <TableHeader className="bg-blue-700">
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead className="text-white">Address</TableHead>
                      <TableHead className="text-white">State</TableHead>
                      <TableHead className="text-white">LGA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAddresses?.map((item) => (
                      <TableRow key={item.id} onClick={() => toggleChecked(item.id)}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={checked.includes(item.id)}
                            className="hidden"
                            readOnly
                          />
                          {checked.includes(item.id) ? (
                            <CheckCircledIcon className="text-blue-500" />
                          ) : (
                            <CrossCircledIcon className="text-destructive" />
                          )}
                        </TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>{item.lga}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              )}
            </div>
          </form>
        </div>
      </>
    );
  };
  
  export default AgentInfo;
  