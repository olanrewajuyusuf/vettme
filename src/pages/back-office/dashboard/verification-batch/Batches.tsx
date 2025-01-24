import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { useNavigate, useParams } from "react-router-dom";
  import loader from "@/assets/loader.svg";
  import { Badge } from "@/components/ui/badge";
  import Pagination from "../../components/pagination";
  import { useFetchVerificationBatches } from "@/hooks/backOffice";
  import { useEffect, useState } from "react";
  import { Input } from "@/components/ui/input";
  import { SearchCodeIcon } from "lucide-react";
  
  interface batchesProps {
    id: string,
    title: string,
    max: number,
    status: string,
    verificationType: string,
    createdAt: string,
  }
  
  export default function Batches() {
    const { id } = useParams();
    const { fetchVerificationBatches } = useFetchVerificationBatches(id);
    const [ getBatches, setGetBatches ] = useState<batchesProps[] | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const getBatchesInfo = async () => {
        try {
          const data = await fetchVerificationBatches();
            console.log(data)
            setGetBatches(data.data);
        } catch (error) {
          console.error("Failed to fetch company info:", error);
        }
      };
  
      getBatchesInfo();
    }, [fetchVerificationBatches, id]);
    
    return (
      <>
        <div className="mb-10">
            <h1 className="font-normal">All Verification Batches</h1>
            <p>This is where you get all batches being process by this company</p>
        </div>
        <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
            <div className="w-full p-5 grid grid-cols-3 border-b-[1px] border-stroke-clr">
                  <div className="flex items-center gap-3">
                      <p>Filter by: </p>
                      <select name="" id="" className="btn px-3">
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                      </select>
                  </div>
                  <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search by title or type"
                        className="max-w-sm"
                    />
                    <SearchCodeIcon className="text-stroke-clr absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
            </div>
          
          {getBatches === null ? (
              <div className="w-full h-[500px] flex items-center justify-center">
                <img src={loader} alt="" className="w-10" />
              </div>
            ) :
            getBatches.length === 0 ? (
              <div className="w-full h-[300px] flex justify-center items-center">
                  <h3>No Verification initiated.</h3>
              </div>
            ) : (
          <Table>
            <TableHeader className="bg-stroke-clr">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Personnels</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Initiated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getBatches.map((batch: batchesProps) => (
                <TableRow key={batch.id} onClick={() => navigate(`verification/${batch.id}`)}>
                  <TableCell className="font-medium">{batch.title}</TableCell>
                  <TableCell>{batch.max}</TableCell>
                  <TableCell>
                    <Badge
                      className={`pointer-events-none ${
                        batch.status === "completed"
                          ? "bg-green-400"
                          : batch.status === "pending"
                          ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent"
                          : batch.status === "failed"
                          ? "bg-red-500"
                          : "bg-orange-400"
                      }`}
                    >
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{batch.verificationType}</TableCell>
                  <TableCell>{batch.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)}
          {getBatches === null || getBatches.length === 0  || <Pagination />}
        </div>
      </>
    );
}
  