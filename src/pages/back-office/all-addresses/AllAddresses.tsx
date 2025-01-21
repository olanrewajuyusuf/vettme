import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination";
import { Badge } from "@/components/ui/badge";
import loader from "@/assets/loader.svg";
import { HomeIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import { useFetchAddresses } from "@/hooks/backOffice";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        const getAddresses = async () => {
          try {
            const data = await fetchAddresses();
            setAddresses(data.result);
          } catch (error) {
            console.error("Failed to fetch company info:", error);
          }
        };
    
        getAddresses();
    }, [fetchAddresses]);

    return (
        <div>
            <h1 className="font-normal">All personnel's addresses</h1>
            <p className="mb-10">Manage all Personnel's addresses to be verified or already verified.</p>
            <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
                <div className="w-full py-4 grid grid-cols-3 border-b-[1px] border-stroke-clr px-5">
                    <div className="flex items-center gap-3">
                        <p>Filter by: </p>
                        <select name="" id="" className="btn px-3">
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>
                {addresses === null ? (
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <img src={loader} alt="" className="w-10" />
                    </div>
                ) :
                addresses.length === 0 ? (
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <h3>No available address data.</h3>
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-blue-700 h-8">
                            <TableRow>
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
                            {addresses.map((address: addressesProps) => (
                            <TableRow
                                key={address.id}
                                // onClick={() => navigate(`verification-batch/${company.id}`)}
                            >
                                <TableCell className="font-medium text-xs uppercase flex items-center gap-1">
                                    <div 
                                    className={`
                                        w-6 h-6 grid place-items-center text-white rounded-md ${address.personnelType === "guarantor" ? "bg-blue-500" : "bg-purple-600"}
                                    `}
                                    >
                                        {address.personnelName.slice(0, 2)}
                                    </div>
                                    <span>{address.personnelName}</span>
                                </TableCell>
                                <TableCell className={`
                                    ${address.personnelType === "guarantor" ? "text-blue-500" : "text-purple-600"}
                                `}
                                >
                                    <MixerVerticalIcon/><span>{address.personnelType}</span>
                                </TableCell>
                                <TableCell className="text-gray-400">{address.country}</TableCell>
                                <TableCell className="text-gray-400">{address.state}</TableCell>
                                <TableCell className="text-gray-400">{address.lga}</TableCell>
                                <TableCell className="text-gray-400 flex items-center gap-1"><HomeIcon/>{address.address}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={`pointer-events-none ${
                                        address.status === "verified"
                                            ? "bg-green-400"
                                            : address.status === "pending"
                                            ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent"
                                            : address.status === "failed"
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