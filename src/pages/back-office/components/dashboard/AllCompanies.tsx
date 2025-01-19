import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { TbFilterSearch } from "react-icons/tb";
import Pagination from "../pagination";
import loader from "@/assets/loader.svg";
import { useEffect, useState } from "react";
import { useActivateCompany, useDeleteCompany, useFetchCompany } from "@/hooks/backOffice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { UpdateIcon, TrashIcon } from "@radix-ui/react-icons";
import DeleteCompany from "@/components/modals/DeleteCompany";

interface companyProps {
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
    // console.log(fetchCompany);
    
    const [companyInfo, setCompanyInfo] = useState<companyProps[] | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // const [activateModalOpen, setActivateModalOpen] = useState(false);
  
    useEffect(() => {
      const getCompanyInfo = async () => {
        try {
          const data = await fetchCompany();
            console.log(data)
          setCompanyInfo(data.result.companies);
        } catch (error) {
          console.error("Failed to fetch company info:", error);
        }
      };
  
      getCompanyInfo();
    }, [fetchCompany]);

    const handleActivate = async (companyId: string) => {
        try {
            await activateCompany({companyId});
            const updatedCompanies = await fetchCompany();
            setCompanyInfo(updatedCompanies.result.companies);
            // console.log("Activation response:", response);
        } catch (error: any) {
            console.error("Failed to activate company:", error.message);
        }
    };

    const handleDelete = async (companyId: string) => {
      try {
          await deleteCompany(companyId);
          const updatedCompanies = await fetchCompany();
          setCompanyInfo(updatedCompanies.result.companies);
          // console.log("Activation response:", response);
      } catch (error: any) {
          console.error("Failed to delete company:", error.message);
      }
  };

    console.log(companyInfo);
    return (
      <>
        {deleteModalOpen && (
            <DeleteCompany
            isOpen={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
            />
        )}
        <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
          <div className="flex justify-between items-center p-5">
            <p className="text-[20px] font-semibold">All Companies</p>
            <p className="text-[16px] mr-5 flex items-center gap-2 cursor-pointer">
              <TbFilterSearch /> Filter
            </p>
          </div>

          {companyInfo === null ? (
            <div className="w-full h-[500px] flex items-center justify-center">
              <img src={loader} alt="" className="w-10" />
            </div>
          ) :
           companyInfo?.length === 0 ? (
            <div className="w-full h-[300px] flex justify-center items-center">
                <h3>No Company available.</h3>
            </div>
          ) : (
          <Table>
            <TableHeader className="bg-stroke-clr">
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
                <TableHead>Date Initiated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyInfo?.map((company: any) => (
                <TableRow
                  key={company.id}
                  onClick={() => navigate(`verification-batch/${company.id}`)}
                >
                  <TableCell className="text-gray-400">{company.companyId}</TableCell>
                  <TableCell className="font-medium">{company.companyName}</TableCell>
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
          {companyInfo === null || companyInfo?.length === 0  || <Pagination />}
        </div>
      </>
    );
}
  