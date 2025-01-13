import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { ClipboardIcon } from "@radix-ui/react-icons"; //, TrashIcon useNavigate
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
// import { verifications } from "@/utils/data";
// import { Badge } from "@/components/ui/badge";

export default function Verifications() {
  // const navigate = useNavigate();
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
          <Input
            type="text"
            placeholder="Search by verification title"
            className="max-w-sm"
          />
          <div className=""></div>
        </div>
        <div className="w-full h-[300px] flex justify-center items-center">
          <h3>No Verification Batch available.</h3>
        </div>

        {/* <Table>
          <TableHeader className="bg-stroke-clr">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Personnels</TableHead>
              <TableHead>Personnels Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verifications.map((item) => (
              <TableRow key={item.id} onClick={() => navigate(item.id)}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.personnels}</TableCell>
                <TableCell>{item.verified}</TableCell>
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
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <TrashIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>
    </>
  );
}
