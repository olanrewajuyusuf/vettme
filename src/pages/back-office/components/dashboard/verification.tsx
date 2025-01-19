import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { verificationsData } from "@/lib/placeholderData";
import { Badge } from "@/components/ui/badge";
import { TbFilterSearch } from "react-icons/tb";
import Pagination from "../pagination";

export default function BackOfficeVerifications() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
        <div className="flex justify-between items-center p-5">
            <p className="text-[20px] font-semibold">All Verifications</p>
            <p className="text-[16px] mr-5 flex items-center gap-2 cursor-pointer"><TbFilterSearch /> Filter</p>
        </div>

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
            {verificationsData.map((item) => (
              <TableRow key={item.id} onClick={() => navigate(`verification/${item.id}`)}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.personnels}</TableCell>
                <TableCell>
                  <Badge
                    className={`pointer-events-none ${
                      item.status === "completed"
                        ? "bg-green-400"
                        : item.status === "pending"
                        ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent"
                        : item.status === "failed"
                        ? "bg-red-500"
                        : "bg-orange-400"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination />
      </div>
    </>
  );
}
