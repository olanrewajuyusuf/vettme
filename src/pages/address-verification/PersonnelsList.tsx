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
import { getGeolocation } from "@/lib/geolocation";

const PersonnelsList = () => {
  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    getGeolocation(
      async (location, accuracy) => {
        console.log('Latitude:', location.lat, 'Longitude:', location.lon, 'Accuracy:', accuracy);
  
        // Save the location to localStorage
        localStorage.setItem('savedLocations', JSON.stringify(location));

      },
      (errorMessage) => {
        alert(`Error: ${errorMessage}`);
      }
    );

    navigate(`address-form/${id}`)
  }
  return (
    <>
    <Nav />
    <div className="mb-10 px-5 md:px-20">
        <div className="bg-white pt-5">
            <h1 className="text-2xl md:text-3xl font-light ml-5 mb-5">List of Personnels to verify</h1>
        <Table>
          <TableHeader className="bg-stroke-clr">
            <TableRow className="h-[50px] ">
              <TableHead></TableHead>
              <TableHead className="w-[15%] text-black bg-red-200 font-bold">Personnels Name</TableHead>
              <TableHead className="w-[50%] text-black bg-blue-200 font-bold">Personnels Address</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personnelsInfo.map((item, idx) => (
              <TableRow key={item.id} className="hover:bg-slate-200">
                <TableCell className="font-medium text-white bg-destructive w-2">{idx + 1}</TableCell>
                <TableCell className="w-[25%]">{item.name}</TableCell>
                <TableCell className="w-[50%]">{item.Address}</TableCell>
                <TableCell className="text-center">
                    <button 
                      onClick={() => handleClick(item.id)} 
                      className="px-5 py-2 rounded-full border-[1px] border-destructive hover:bg-destructive hover:text-white"
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