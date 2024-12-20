import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import Nav from "../back-office/components/nav";
import { personnelsInfo } from "@/lib/placeholderData";

const PersonnelsList = () => {
    const navigate = useNavigate();
  return (
    <>
    <Nav />
    <div className="mb-10 px-5 md:px-20">
        <div className="bg-white pt-5">
            <h1 className="text-2xl md:text-3xl font-light ml-5 mb-5">List of Personnels to verify</h1>
            {/* <p className="text-xl md:text-2xl mb-5">Agent: <span className="font-light">Donald Ugochukwu</span></p> */}
        <Table>
          <TableHeader className="bg-stroke-clr">
            <TableRow className="h-[50px] ">
              <TableHead></TableHead>
              <TableHead className="w-[15%] text-black font-bold">Personnels Name</TableHead>
              <TableHead className="w-[50%] text-black font-bold">Personnels Address</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personnelsInfo.map((item, idx) => (
              <TableRow key={item.id} className="hover:bg-slate-200">
                <TableCell className="font-medium text-white bg-destructive w-2">{idx + 1}</TableCell>
                <TableCell className="w-[25%] bg-red-200">{item.name}</TableCell>
                <TableCell className="w-[50%] bg-blue-200">{item.Address}</TableCell>
                <TableCell className="text-center">
                    <button 
                    onClick={() => navigate(`address-form/${item.id}`)} 
                    className="px-5 py-2 rounded-full border-[1px] border-destructive bg-destructive text-white"
                    >
                        Start Verification
                    </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
    </div>
    </>
  )
}

export default PersonnelsList;