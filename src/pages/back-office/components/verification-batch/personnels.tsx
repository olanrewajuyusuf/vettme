// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { personnelsData } from "@/lib/placeholderData";
// import { useNavigate, useParams } from "react-router-dom";
// import { TrashIcon } from "@radix-ui/react-icons";
// import { Badge } from "@/components/ui/badge";
// import Pagination from "../pagination";

const PersonnelsLog = () => {
  // const navigate = useNavigate();
  // const { verification_id } = useParams();
  // const id = parseInt(verification_id!);
  
  // const data = personnelsData[id - 1];
  return (
    <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden">
      <div className="w-full h-[300px] flex justify-center items-center">
        <h3>No Personnels data.</h3>
      </div>
        {/* <Table>
          <TableHeader className="bg-stroke-clr">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Personnel Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((item, idx) => (
              <TableRow
                key={idx}
                onClick={() =>
                  navigate(`personnel/${idx + 1}`, { state: item })
                }
              >
                <TableCell>
                  <span className="w-7 h-7 flex items-center justify-center bg-gray-400 font-medium rounded-lg text-xs">
                    {`${item.name.split("")[0].toUpperCase()}${item.name
                      .split("")[1]
                      .toUpperCase()}`}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Badge
                    className={`pointer-events-none ${
                      item.status === "verified"
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
                <TableCell>
                  <TrashIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination /> */}
    </div>
  )
}

export default PersonnelsLog;