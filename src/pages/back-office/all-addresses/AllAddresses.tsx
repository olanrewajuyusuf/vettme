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
import { Badge } from "@/components/ui/badge";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
import { useFetchAddresses } from "@/hooks/backOffice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VerificationSkeleton } from "@/components/SkeletonUi";

interface addressesProps {
    id: string,
    personnelName: string,
    personnelType: string,
    country: string,
    state: string,
    lga: string,
    address: string,
    status: string,
}

const AllAddresses = () => {
    const [ addresses, setAddresses ] = useState<addressesProps[] | null>(null);
    const { fetchAddresses } = useFetchAddresses();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") || "all";
    const navigate = useNavigate();

    useEffect(() => {
        const getAddresses = async () => {
          try {
            const data = await fetchAddresses();            
            setAddresses(data.data);
          } catch (error) {
            console.error("Failed to fetch company info:", error);
            setError("Failed to fetch Addresses");
          } finally {
            setLoading(false);
          }
        };
    
        getAddresses();
    }, [fetchAddresses]); 
    
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setSearchParams({ filter: selectedFilter });
      };
      
      const filteredAddresses = addresses
          ? filter === "pending"
            ? addresses.filter((batch) => batch.status === "PENDING")
            : filter === "failed"
            ? addresses.filter((batch) => batch.status === "FAILED")
            : filter === "completed"
            ? addresses.filter((batch) => batch.status === "COMPLETED")
            : filter === "in_progress"
            ? addresses.filter((batch) => batch.status === "INPROGRESS")
            : addresses
          : null;
      
        const noAddressMessage =
            filteredAddresses && filteredAddresses.length === 0
            ? filter === "completed"
              ? "You have no completed Address."
              : filter === "pending"
              ? "You have no pending Address."
              : filter === "in_progress"
              ? "You have no In progress Address."
              : filter === "failed"
              ? "You have no failed Address."
              : "No processing Address."
            : null;

    return (
        <div>
            <h1 className="font-normal">All personnel's addresses</h1>
            <p className="mb-10">Manage all Personnel's addresses to be verified or already verified.</p>
            <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
                <div className="w-full py-4 grid grid-cols-3 border-b-[1px] border-stroke-clr px-5">
                    <div className="flex items-center gap-3">
                        <p>Filter by: </p>
                        <select
                            name="filter"
                            id="filter"
                            className="btn px-3"
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>
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
                {noAddressMessage && (
                    <div className="w-full h-[300px] flex justify-center items-center">
                    <h3>{noAddressMessage}</h3>
                    </div>
                )}
                {filteredAddresses && filteredAddresses.length > 0 && (
                    <Table>
                        <TableHeader className="bg-blue-700 h-8">
                            <TableRow>
                                <TableHead className="text-white"></TableHead>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Type</TableHead>
                                <TableHead className="text-white">Country</TableHead>
                                <TableHead className="text-white">State</TableHead>
                                <TableHead className="text-white">LGA</TableHead>
                                <TableHead className="text-white">Address</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAddresses?.map((address: addressesProps) => (
                            <TableRow
                                key={address.id}
                                onClick={() => navigate(`address-detail/${address.id}`)}
                            >
                                <TableCell className="">
                                    <div 
                                    className={`
                                        w-7 h-7 grid place-items-center text-white uppercase rounded-sm ${address.personnelType === "guarantor" ? "bg-blue-500" : "bg-purple-600"}
                                    `}
                                    >
                                        {address.personnelName.slice(0, 2)}
                                    </div>
                                </TableCell>
                                <TableCell>{address.personnelName}</TableCell>
                                <TableCell className={`
                                    ${address.personnelType === "guarantor" ? "text-blue-500" : "text-purple-600"}
                                `}
                                >
                                    <MixerVerticalIcon/><span>{address.personnelType}</span>
                                </TableCell>
                                <TableCell className="text-gray-400">{address.country}</TableCell>
                                <TableCell className="text-gray-400">{address.state}</TableCell>
                                <TableCell className="text-gray-400">{address.lga}</TableCell>
                                <TableCell className="text-gray-400">{address.address}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={`pointer-events-none ${
                                        address.status === "VERIFIED"
                                            ? "bg-green-400"
                                            : address.status === "PENDING"
                                            ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent"
                                            : address.status === "FAILED"
                                            ? "bg-red-500"
                                            : "bg-orange-400"
                                        }`}
                                    >
                                        {address.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>

                )}
                {addresses === null || addresses?.length === 0  || <Pagination />}
            </div>
        </div>
    );
}

export default AllAddresses;


