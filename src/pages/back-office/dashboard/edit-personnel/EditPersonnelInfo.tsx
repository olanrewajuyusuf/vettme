import { Button } from "@/components/ui/button";
import { EditPersonnelInformation } from "../../components/editInfo/edit";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchBatchesResponse, useUpdateFinding, useUpdateVerdict } from "@/hooks/backOffice";
import { getFilteredData } from "@/lib/filteredObjects";
import { 
  academicInput, 
  guarantorInput1, 
  guarantorInput2, 
  guarantorInput3, 
  guarantorInput4, 
  mentalHealthInput, 
  personalInput, 
  professionalInput1, 
  professionalInput2 } from "@/utils/field";

const EditPersonnelInfo = () => {
  const [claims, setClaims] = useState<any | "">("");
  const {fetchBatchesResponse} = useFetchBatchesResponse();
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [radioData, setRadioData] = useState({});
  const { updateFinding } = useUpdateFinding();
  const { updateVerdict } = useUpdateVerdict();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioData({ ...radioData, [e.target.name]: true });
  };

  useEffect(() => {
      const getResponse = async () => {
        try {
          const data = await fetchBatchesResponse(params.verification_id as string);          
          const resp = data.data.filter((item: any)=> item.id === params.id);
          setClaims(resp);
        } catch (error) {
          console.error("Failed to get batches response:", error);
        }
      };
      getResponse();
  }, [fetchBatchesResponse, params.verification_id, params.id])

  //Incoming claim, finding and verdict
  const personalInformation = getFilteredData(claims && claims[0].responses, personalInput, "pi");
  const guarantorInformation = getFilteredData(claims && claims[0].responses, guarantorInput1, "gi", "1");
  const guarantorInformation2 = getFilteredData(claims && claims[0].responses, guarantorInput2, 'gi', "2");
  const guarantorInformation3 = getFilteredData(claims && claims[0].responses, guarantorInput3, "gi", '3');
  const guarantorInformation4 = getFilteredData(claims && claims[0].responses, guarantorInput4, "gi", '4');
  const academicInformation = getFilteredData(claims && claims[0].responses, academicInput, "ai");
  const professionalInformation = getFilteredData(claims && claims[0].responses, professionalInput1, "pri", "1");
  const professionalInformation2 = getFilteredData(claims && claims[0].responses, professionalInput2, "pri", '2');
  const mentalInformation = getFilteredData(claims && claims[0].responses, mentalHealthInput, "mhi");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const verdict = {
      results: radioData,
    }
    
    try {
      await updateFinding(formData, params.id as string);
      await updateVerdict(verdict, params.id as string);
      navigate(-1);
    } catch (error: any) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <div>
      <div className="">
          <div>
              <h1 className="font-normal">Edit {claims && claims[0].responses.piFullname} Information here.</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {personalInformation.length > 0 && <EditPersonnelInformation data={personalInformation} title="Personnel Information" handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            {guarantorInformation.length > 0 && <EditPersonnelInformation data={guarantorInformation} title={guarantorInformation2.length > 0 ? "1st Guarantor Information" : "Guarantor Information"} handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            {guarantorInformation2.length > 0 && <EditPersonnelInformation data={guarantorInformation2} title="2nd Guarantor Information" handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            {guarantorInformation3.length > 0 && <EditPersonnelInformation data={guarantorInformation3} title="3rd Guarantor Information" handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            {guarantorInformation4.length > 0 && <EditPersonnelInformation data={guarantorInformation4} title="4th Guarantor Information" handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            {academicInformation.length > 0 && <EditPersonnelInformation data={academicInformation} title="Academic Information" handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            {professionalInformation.length > 0 && <EditPersonnelInformation data={professionalInformation} title={professionalInformation2.length > 0 ? "1st Professional Information" : "Professional Information"} handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            {professionalInformation2.length > 0 && <EditPersonnelInformation data={professionalInformation2} title="2nd Professional Information" handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            {mentalInformation.length > 0 && <EditPersonnelInformation data={mentalInformation} title="Mental Health Information" handleInputChange={handleInputChange} handleRadioChange={handleRadioChange} />}
            <div className="flex gap-3">
              <Button className="red-gradient">Save changes</Button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default EditPersonnelInfo