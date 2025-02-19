import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MixerVerticalIcon, ThickArrowLeftIcon, ThickArrowRightIcon } from "@radix-ui/react-icons";
import { useFetchAddresses } from "@/hooks/backOffice";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VerificationSkeleton } from "@/components/SkeletonUi";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

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
    const [addresses, setAddresses] = useState<addressesProps[] | null>(null);
    const { fetchAddresses } = useFetchAddresses();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
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

    // Handle Filter Change
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setSearchParams({ filter: selectedFilter });
    };

    // Filter Addresses
    const filteredAddresses = addresses
        ? addresses
            .filter((address) => {
                const query = searchQuery.toLowerCase();
                return (
                    address.personnelName.toLowerCase().includes(query) ||
                    address.country.toLowerCase().includes(query) ||
                    address.state.toLowerCase().includes(query) ||
                    address.lga.toLowerCase().includes(query)
                );
            })
            .filter((batch) =>
                filter === "pending" ? batch.status === "PENDING" :
                filter === "failed" ? batch.status === "FAILED" :
                filter === "completed" ? batch.status === "COMPLETED" :
                filter === "in_progress" ? batch.status === "INPROGRESS" :
                true
            )
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
    const totalPages = Math.ceil((filteredAddresses?.length || 0) / itemsPerPage);
    const paginatedData = useMemo(
        () =>
        filteredAddresses?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [filteredAddresses, currentPage, itemsPerPage]
    );

    // Handle page change by updating URL
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(location.search);
        params.set("page", page.toString());
        navigate({ search: params.toString() });
    };

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
                {/* Filter and Search */}
                <div className="flex justify-between items-center py-4 border-b-[1px] border-stroke-clr px-5">
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
                {noAddressMessage && (
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <h3>{noAddressMessage}</h3>
                    </div>
                )}

                {/* Table of Addresses */}
                {paginatedData && paginatedData.length > 0 && (
                    <Table>
                        <TableHeader className="bg-blue-700 h-8">
                            <TableRow>
                                <TableHead className="text-white">#</TableHead>
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
                            {paginatedData.map((address) => (
                                <TableRow
                                    key={address.id}
                                    onClick={() => navigate(`address-detail/${address.id}`)}
                                >
                                    <TableCell>
                                      <div 
                                      className={`
                                        w-7 h-7 grid place-items-center text-white uppercase rounded-sm ${address.personnelType === "guarantor" ? "bg-blue-500" : "bg-purple-600"}
                                      `}
                                      >
                                        {address.personnelName.slice(0, 2)}
                                      </div>
                                    </TableCell>
                                    <TableCell>{address.personnelName}</TableCell>
                                    <TableCell className={`${address.personnelType === "guarantor" ? "text-blue-500" : "text-purple-600"}`}>
                                        <MixerVerticalIcon /><span>{address.personnelType}</span>
                                    </TableCell>
                                    <TableCell className="text-gray-400">{address.country}</TableCell>
                                    <TableCell className="text-gray-400">{address.state}</TableCell>
                                    <TableCell className="text-gray-400">{address.lga}</TableCell>
                                    <TableCell className="text-gray-400">{address.address}</TableCell>
                                    <TableCell>
                                        <Badge className={`pointer-events-none ${address.status === "VERIFIED" ? "bg-green-400" : address.status === "PENDING" ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent" : address.status === "FAILED" ? "bg-red-500" : "bg-orange-400"}`}>
                                            {address.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
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

export default AllAddresses;
