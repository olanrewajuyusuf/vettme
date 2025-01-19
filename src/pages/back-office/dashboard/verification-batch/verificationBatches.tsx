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
import { TbFilterSearch } from "react-icons/tb";
import Pagination from "../../components/pagination";
import { useFetchVerificationBatches } from "@/hooks/backOffice";
import { useEffect, useState } from "react";

interface batchesProps {
  id: string,
  title: string,
  max: number,
  status: string,
  verificationType: string,
  createdAt: string,
}

export default function VerificationBatches() {
  const { id } = useParams();
  const { FetchVerificationBatches } = useFetchVerificationBatches(id);
  const [ getBatches, setGetBatches ] = useState<batchesProps[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getBatchesInfo = async () => {
      try {
        const data = await FetchVerificationBatches();
          console.log(data)
          setGetBatches(data.data);
      } catch (error) {
        console.error("Failed to fetch company info:", error);
      }
    };

    getBatchesInfo();
  }, [FetchVerificationBatches, id]);
  
  return (
    <>
      <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
        <div className="flex justify-between items-center p-5">
            <p className="text-[20px] font-semibold">All Verifications</p>
            <p className="text-[16px] mr-5 flex items-center gap-2 cursor-pointer"><TbFilterSearch /> Filter</p>
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
