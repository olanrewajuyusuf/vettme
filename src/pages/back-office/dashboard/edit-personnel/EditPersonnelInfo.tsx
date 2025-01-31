import { Button } from "@/components/ui/button";
import { EditPersonnelInformation } from "../../components/editInfo/edit";
import { EditGuarantorInformation } from "../../components/editInfo/editGuarantorInfo";
import { EditProffessionalInformation } from "../../components/editInfo/editProffessionalInfo";
import { EditMentalHealth } from "../../components/editInfo/editMentalHealth";
import Nav from "../../components/nav";

const EditPersonnelInfo = () => {
  return (
    <div>
      <Nav title='Admin' />
      <div className="max-w-[775px] mx-auto px-5">
          <div>
              <h2>Christy Blabber</h2>
              <p className="text-sm">Date Created: 23/01/2024 at 07:23 PM</p>
          </div>

          <EditPersonnelInformation />
          <EditGuarantorInformation />
          <EditProffessionalInformation />
          <EditMentalHealth />

          <div className="flex gap-3">
            <Button className="red-gradient">Save changes</Button>
          </div>
      </div>
    </div>
  )
}

export default EditPersonnelInfo