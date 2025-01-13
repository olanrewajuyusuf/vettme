import { Button } from "@/components/ui/button";
import PersonelAccordion from "../../components/personnel/personelAccordion";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderInfo from "../../components/personnel/header";

const PersonnelInfo = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  return (
    <div className="px-10 pb-10">
        <div className="mb-[30px] flex justify-between items-center">
          <div>
            <h2>{state.name}</h2>
            <p className="text-sm">Date Created: 23/01/2024 at 07:23 PM</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-2 bg-gray-200 text-base-clr hover:bg-gray-300"
              onClick={() => navigate("edit")}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:text-green-900 hover:bg-green-400"
            >
              Publish
            </Button>
          </div>
        </div>

        <HeaderInfo />
        <PersonelAccordion />

        <div className="flex gap-3">
          <Button className="red-gradient">Download Data</Button>
        </div>
    </div>
  )
}

export default PersonnelInfo;