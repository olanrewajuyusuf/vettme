import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useActivateCompany, useDeleteCompany, useFetchCompany } from "@/hooks/backOffice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { UpdateIcon, TrashIcon, ThickArrowRightIcon, ThickArrowLeftIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { VerificationSkeleton } from "@/components/SkeletonUi";
import { Button } from "@/components/ui/button";

interface CompanyProps {
    id: string,
    companyId: string,
    companyName: string,
    isVerified: boolean,
    isActive: boolean,
    createdAt: Date,
    email: string,
    balance: number,
}
  
  export default function AllCompanies() {
    const navigate = useNavigate();
    const { fetchCompany } = useFetchCompany();
    const { activateCompany } = useActivateCompany();
    const { deleteCompany } = useDeleteCompany();
    const [companyInfo, setCompanyInfo] = useState<CompanyProps[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const filter = searchParams.get("filter") || "all";
  
    useEffect(() => {
      const getCompanyInfo = async () => {
        try {
          const data = await fetchCompany();
          setCompanyInfo(data.result.companies);
        } catch (error) {
          console.error("Failed to fetch company info:", error);
          setError("Failed to fetch Company")
        } finally {
          setLoading(false);
        }
      };
  
      getCompanyInfo();
    }, [fetchCompany]);

    // Handle Filter Change
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setSearchParams({ filter: selectedFilter });
    };
    
    // Filter Addresses
    const filteredCompany = companyInfo
      ? companyInfo
          .filter((company) => {
              const query = searchQuery.toLowerCase();
              return (
                  company.companyName.toLowerCase().includes(query)
              );
          })
          .filter((company) =>
              filter === "active" ? company.isActive === true :
              filter === "inactive" ? company.isActive === false :
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
    const totalPages = Math.ceil((filteredCompany?.length || 0) / itemsPerPage);
    const paginatedData = useMemo(
        () =>
          filteredCompany?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [filteredCompany, currentPage, itemsPerPage]
    );
    
    // Handle page change by updating URL
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(location.search);
        params.set("page", page.toString());
        navigate({ search: params.toString() });
    };
    
    const noCompanyMessage =
      filteredCompany && filteredCompany.length === 0
        ? filter === "active"
            ? "No Active Company."
            : filter === "inactive"
            ? "No Inactive Company"
            : "No Registered Company."
        : null;
    

    const handleActivate = async (companyId: string) => {
        try {
            await activateCompany({companyId});
            const updatedCompanies = await fetchCompany();
            setCompanyInfo(updatedCompanies.result.companies);
        } catch (error: any) {
            console.error("Failed to activate company:", error.message);
        }
    };

    const handleDelete = async (companyId: string) => {
      try {
          await deleteCompany(companyId);
          const updatedCompanies = await fetchCompany();
          setCompanyInfo(updatedCompanies.result.companies);
      } catch (error: any) {
          console.error("Failed to delete company:", error.message);
      }
    };

    return (
      <>
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
                      <option value="active">Active</option>
                      <option value="inactive">Not Active</option>
                  </select>
              </div>
              <div className="relative w-[33%]">
                  <Input
                      type="text"
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                      placeholder="Search companies by name"
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
          {noCompanyMessage && (
              <div className="w-full h-[300px] flex justify-center items-center">
                  <h3>{noCompanyMessage}</h3>
              </div>
          )}
          {paginatedData && paginatedData.length > 0 && (
          <Table>
            <TableHeader className="bg-blue-700 h-8">
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Company ID</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead></TableHead>
                <TableHead className="text-white">Date Initiated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData?.map((company: CompanyProps) => (
                <TableRow
                  key={company.id}
                  onClick={() => navigate(`verification-batch/${company.id}`)}
                >
                  <TableCell className="text-xs font-medium uppercase flex items-center gap-1">
                  <div className={`w-6 h-6 grid place-items-center text-white rounded-sm bg-purple-600`}>
                      {company.companyName.slice(0, 2)}
                  </div>
                  <span>{company.companyName}</span>
                  </TableCell>
                  <TableCell className="text-blue-400">{company.companyId}</TableCell>
                  <TableCell className="text-gray-400">{company.email}</TableCell>
                  <TableCell className="text-xs">
                    <div
                      className={`pointer-events-none w-2 h-2 ${
                        company.isVerified
                          ? "bg-green-400"
                          : "bg-red-500"
                        }`}
                    >
                    </div>
                    {company.isVerified? "Verified" : "Not Verified"}
                  </TableCell>
                  <TableCell className="text-xs">
                    <div
                      className={`pointer-events-none w-2 h-2 ${
                        company.isActive
                          ? "bg-green-400"
                          : "bg-red-500"
                        }`}
                    >
                    </div>
                    {company.isActive? "Active" : "Not Active"}
                  </TableCell>
                  <TableCell>{moment(company.createdAt).format("MMM DD, YYYY")}</TableCell>
                  <TableCell>
                    <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className="focus:outline-none"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <BiDotsVerticalRounded className="text-xl" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="cursor-pointer">
                            <div
                              className="cursor-pointer border-b-[1px] text-xs border-gray-200 px-4 pb-2 mb-2 flex items-center gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActivate(company.id);
                              }}
                            >
                                <UpdateIcon className={`${company.isActive && 'text-destructive'}`} /> 
                                {!company.isActive? "Activate": (<span className="text-destructive">Deactivate</span>)}
                            </div>
                            <div
                              className="cursor-pointer text-destructive text-xs px-4 flex items-center gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(company.id);
                              }}
                            >
                                <TrashIcon /> 
                                Delete
                            </div>
                        </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)}
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
      </>
    );
}
  