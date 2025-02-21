import { Button } from "@/components/ui/button";
import { EditPersonnelInformation } from "../../components/editInfo/edit";
import { EditGuarantorInformation } from "../../components/editInfo/editGuarantorInfo";
import { EditProffessionalInformation } from "../../components/editInfo/editProffessionalInfo";
import { EditMentalHealth } from "../../components/editInfo/editMentalHealth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchBatchesResponse } from "@/hooks/backOffice";

const EditPersonnelInfo = () => {
  const [claims, setClaims] = useState<any | "">("");
  const {fetchBatchesResponse} = useFetchBatchesResponse();
  const params = useParams();
  console.log(params);

  useEffect(() => {
      const getResponse = async () => {
        try {
          const data = await fetchBatchesResponse(params.verification_id as string);
          console.log(data);
          
          const resp = data.data.filter((item: any)=> item.id === params.id);
          setClaims(resp);
        } catch (error) {
          console.error("Failed to get batches response:", error);
        }
      };
      getResponse();
  }, [fetchBatchesResponse, params.verification_id, params.id])

  return (
    <div>
      <div className="">
          <div>
              <h1>Edit {claims && claims[0].responses.piFullname} Information here.</h1>
          </div>

          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <EditPersonnelInformation />
            <EditGuarantorInformation />
            <EditProffessionalInformation />
            <EditMentalHealth />

            <div className="flex gap-3">
              <Button className="red-gradient">Save changes</Button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default EditPersonnelInfo