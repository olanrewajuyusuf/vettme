import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardIcon, TrashIcon } from "@radix-ui/react-icons"; //, TrashIcon useNavigate
import { Input } from "@/components/ui/input";
import loader from "@/assets/loader.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchBatches } from "@/hooks/company";
import { Badge } from "@/components/ui/badge";
import moment from "moment";

interface BatchesProps {
  id: string,
  title: string,
  status: string,
  createdAt: string,
  max: string,
}

export default function Verifications() {
  const [ batches, setBatches ] = useState<BatchesProps[] | null>(null);
  const { fetchBatches } = useFetchBatches();
  const navigate = useNavigate();

  useEffect(() => {
    const getBatches = async () => {
      try {
        const data = await fetchBatches();
        setBatches(data.data);
      } catch (error) {
        console.error("Failed to fetch Verification batches:", error);
      }
    };

    getBatches();
}, [fetchBatches]);

  return (
    <>
      <div className="mb-[30px] flex justify-between items-center">
        <div>
          <h2>Verifications</h2>
          <p className="text-sm">All your verifications in one place</p>
        </div>
        <Link to="/verifications/new">
          <Button className="gap-2 red-gradient">
            <ClipboardIcon /> Start New Verification
          </Button>
        </Link>
      </div>

      <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
        <div className="w-full py-4 flex justify-between items-center border-b-[1px] border-stroke-clr px-5">
          <div className="flex items-center gap-3">
            <p>Filter by: </p>
            <select name="" id="" className="btn px-3">
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <Input
            type="text"
            placeholder="Search by verification title"
            className="max-w-sm"
          />
        </div>

        {batches === null ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <img src={loader} alt="" className="w-10" />
          </div>
        ) :
        batches?.length === 0 ? (
          <div className="w-full h-[300px] flex justify-center items-center">
            <h3>No Verification Batch available.</h3>
          </div>
        ) : (
        <Table>
          <TableHeader className="bg-stroke-clr">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Personnels</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches?.map((item) => (
              <TableRow 
                key={item.id} 
                onClick={() => navigate(item.id)}
              >
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.max}</TableCell>
                <TableCell>
                  <Badge
                    className={`pointer-events-none ${
                      item.status === "COMPLETED"
                        ? "bg-green-400"
                        : item.status === "PENDING"
                        ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent"
                        : item.status === "FAILED"
                        ? "bg-red-500"
                        : "bg-orange-400"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{moment(item.createdAt).format("MMM DD, YYYY")}</TableCell>
                <TableCell>
                  <TrashIcon 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </div>
    </>
  );
}
