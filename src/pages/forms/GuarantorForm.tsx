import images from "@/assets/Images";
import { useNavigate, useParams } from "react-router-dom";
import { PiRecordFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/api/baseUrl";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import FormSubmissionModal from "@/components/modals/FormSubmissionModal";
import { TbCurrencyNaira } from "react-icons/tb";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

interface GuarantorForm {
    personnelName: string,           
    responseId: string,
    awarenessQuestion: boolean,
    liabilityQuestion: boolean,
    carQuestion?: boolean,
    carValue?: number, 
    propertyQuestion?: boolean,
    propertyValue?: number, 
    idCard?: string, 
    bankStatement?: string, 
    guarantorId: string,
    livenessCheck: string
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

const GuarantorForm = () => {
  const navigate = useNavigate();

  const { 
    id, 
    personnelName, 
    guarantorId,
    verificationType
  } = useParams();

  const [idCardUrl, setIdCardUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bankStatementUrl, setBankStatementUrl] = useState<string>('');
  const [showBuilding, setShowBuilding] = useState<Checked>(false);
  const [showLand, setShowLand] = useState<Checked>(false);
  const [showCar, setShowCar] = useState<Checked>(false);
  const [showOthers, setShowOthers] = useState<Checked>(false);
  const [formData, setFormData] = useState<GuarantorForm>({
    personnelName: `${personnelName}`,
    responseId: `${id}`,
    awarenessQuestion: false,
    liabilityQuestion: false,
    guarantorId: `${guarantorId}`,
    livenessCheck: ''
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('guarantorFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);
  
  const handleIdCardUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vettmepro"); // Replace with your upload preset
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ijm-global-limited/image/upload",
          formData
        );
        const uploadedIdCardUrl = response.data.secure_url;
        setIdCardUrl(uploadedIdCardUrl);
  
        // Retrieve current form data from localStorage
        const storedFormData = localStorage.getItem("guarantorFormData");
        let updatedFormData = storedFormData ? JSON.parse(storedFormData) : {};
  
        // Add the new idCard URL to the existing form data
        updatedFormData = { ...updatedFormData, idCard: uploadedIdCardUrl };
  
        // Save the updated form data back to localStorage
        localStorage.setItem("guarantorFormData", JSON.stringify(updatedFormData));
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image");
      }
    }
  };
  
  const handleBankStatementUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vettmepro"); // Replace with your upload preset
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ijm-global-limited/raw/upload",
          formData
        );
        const uploadedBankStatementUrl = response.data.secure_url;
        setBankStatementUrl(uploadedBankStatementUrl);
  
        // Retrieve current form data from localStorage
        const storedFormData = localStorage.getItem("guarantorFormData");
        let updatedFormData = storedFormData ? JSON.parse(storedFormData) : {};
  
        // Add the new bankStatement URL to the existing form data
        updatedFormData = { ...updatedFormData, bankStatement: uploadedBankStatementUrl };
  
        // Save the updated form data back to localStorage
        localStorage.setItem("guarantorFormData", JSON.stringify(updatedFormData));
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image");
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    // Update the form data state
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "number"
          ? value === "" ? "" : Number(value) // ✅ Allows empty input
          : type === "radio"
          ? value === "true"
          : value,
      };
  
      // Save to localStorage
      localStorage.setItem('guarantorFormData', JSON.stringify(updatedData));
  
      return updatedData;
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Retrieve the form data from localStorage
    const storedFormData = localStorage.getItem("guarantorFormData");
    const updatedFormData = storedFormData ? JSON.parse(storedFormData) : {};

    const livenessConfidence = localStorage.getItem("livenessConfidence");

    // Ensure all form data is included
    const formToSubmit = {
      ...formData,
      idCard: idCardUrl || updatedFormData.idCard,  // Use the latest idCard if available
      bankStatement: bankStatementUrl || updatedFormData.bankStatement,  // Use the latest bankStatement if available
      livenessCheck: livenessConfidence || formData.livenessCheck
    };

    try {
      // Submit the form data to the server
      await axios.post(`${baseUrl}/guarantor-form`, formToSubmit);
  
      setModalOpen(true)
  
      // Optionally clear localStorage after successful submission
      localStorage.removeItem("guarantorFormData");
      localStorage.removeItem("livenessConfidence");
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit form.");
    } finally {
      setIsLoading(false);
    }
};

  return (
    <>
    {<FormSubmissionModal isOpen={modalOpen} />}
    <div className="min-h-[100svh] py-10 grid place-content-center">
        <form onSubmit={handleSubmit} className="text-blue-950 w-[90%] max-w-[500px] mx-auto">
            <div className="guarantor rounded-2xl h-[70px] flex justify-between items-center gap-10 pr-5 border-b-2 border-stroke-clr">
                <div className="">
                  <img src={images.logo} alt="Vettme" className="h-8 pl-5 object-contain" />
                </div>
                <h2 className="md:text-lg text-sm text-center uppercase mt-1">Guarantor's<br /> Verification Form</h2>
            </div>
            <div className="guarantor rounded-2xl mt-7">
            <p
            className="text-sm font-normal mb-5 px-5 pt-5 pb-2 border-b-[1px] border-stroke-clr"
            >
              Our employment process requires that a person seeking employment 
              in our establishment should produce a creditable, responsible and 
              acceptable person as a guarantor as a prerequisite to employment confirmation.
            </p>

            {/* =======JSX for Logistic and Loan verifications======= */}
            {/* {!(verificationType === "LOGISTICS" || verificationType === "LOAN") && ( */}
            <div className="px-5 pb-5">
              <fieldset className="text-sm font-light border-b-[1px] border-stroke-clr pb-3 mb-3">
                <legend>Are you aware that you'll be standing as a guarantor for Mr/Mrs {personnelName}?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="awarenessQuestionYes">
                      <input type="radio" id="awarenessQuestionYes" name="awarenessQuestion" className="mr-1" value="true" checked={formData.awarenessQuestion == true} onChange={handleChange}/>
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="awarenessQuestionNo">
                      <input type="radio" id="awarenessQuestionNo" name="awarenessQuestion" className="mr-1" value="false" checked={formData.awarenessQuestion == false} onChange={handleChange}/>
                      No
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset className="text-sm font-light border-b-[1px] border-stroke-clr pb-3 mb-3">
                <legend>Do you agree to be liable to any damages caused by our employee?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="liabilityQuestionYes">
                      <input type="radio" id="liabilityQuestionYes" name="liabilityQuestion" className="mr-1" value="true" checked={formData.liabilityQuestion == true} onChange={handleChange}/>
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="liabilityQuestionNo">
                      <input type="radio" id="liabilityQuestionNo" name="liabilityQuestion" className="mr-1" value="false" checked={formData.liabilityQuestion == false} onChange={handleChange}/>
                      No
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset className="text-sm font-light border-b-[1px] border-stroke-clr pb-3 mb-3">
                <legend>Do you own a property?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="propertyQuestionYes">
                      <input type="radio" id="propertyQuestionYes" name="propertyQuestion" className="mr-1" value="true" checked={formData.propertyQuestion === true} onChange={handleChange} />
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="propertyQuestionNo">
                      <input type="radio" id="propertyQuestionNo" name="propertyQuestion" className="mr-1" value="false" checked={formData.propertyQuestion === false} onChange={handleChange} />
                      No
                    </label>
                  </li>
                </ul>
                <p className="mt-3">Select the type of your property</p>
                <div className="guarantor-inp rounded-full p-2 mt-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full bg-red-300">Type of property</DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[100%]">
                      <DropdownMenuCheckboxItem
                        checked={showBuilding}
                        onCheckedChange={setShowBuilding}
                      >
                        House
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={showLand}
                        onCheckedChange={setShowLand}
                      >
                        Land
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={showCar}
                        onCheckedChange={setShowCar}
                      >
                        Car
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={showOthers}
                        onCheckedChange={setShowOthers}
                      >
                        Others
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-5 mb-3">
                  <label htmlFor="propertyValue">What is the value of your property?</label>
                  <div className="relative mt-3">
                    <input 
                    type="number" 
                    id="propertyValue" 
                    name="propertyValue" 
                    className="guarantor-inp w-full bg-transparent rounded-full py-2 pl-8 text-blue-950 font-bold outline-none placeholder:text-blue-900" 
                    value={formData?.propertyValue ?? 0} 
                    onChange={handleChange} 
                    placeholder="0"
                    />
                    <span className="text-gray-900 font-bold absolute top-1/2 left-3 -translate-y-1/2 text-[18px]"><TbCurrencyNaira /></span>
                  </div>
                </div>
              </fieldset>
              <div className="mt-3 text-sm font-light">
                  <label htmlFor="idCard">Upload your corporate ID card!</label>
                  <input type="file" id="idCard" className="guarantor-inp rounded-full  mt-3 px-5 w-full py-1 pl-3 text-gray-900 outline-none" onChange={(e) => handleIdCardUrl(e)}  />
              </div>
              <div className="mt-3 text-sm font-light">
                  <label htmlFor="bankStatement">Upload your six months Bank statement!</label>
                  <input type="file" id="bankStatement" className="guarantor-inp rounded-full  mt-3 px-5 w-full py-1 pl-3 text-gray-900 outline-none" onChange={(e) => handleBankStatementUrl(e)}  />
              </div>
              <div className="mt-3 text-sm font-light border-y-[1px] border-stroke-clr py-3 mb-5">
                  <span>Click the button below for the liveness check!</span>
                  <button
                    onClick={()=> navigate('liveness-check')}
                    className="guarantor-inp flex items-center gap-2 hover:bg-white mt-3 pl-3 rounded-full text-gray-900 text-sm font-bold"
                  >
                    <span>Click</span>
                    <PiRecordFill  className="text-destructive text-4xl"/>
                  </button>
              </div>

                 <button type="submit"
                  className="grid place-items-center w-full bg-destructive py-4 mt-2 rounded-xl text-white font-bold hover:bg-red-700"
                  disabled={isLoading}
                 >
                  {isLoading ? <Spinner /> : "Submit"}
                </button>
            </div>
            {/* )} */}

            {/* ========JSX for Professional verifications only========= */}
            {(verificationType === "LOGISTICS" || verificationType === "LOAN") && (
            <div className="px-5 pb-5">
              <fieldset className="text-sm font-light border-b-[1px] border-stroke-clr pb-3 mb-3">
                <legend>Are you aware that you'll be standing as a guarantor for Mr/Mrs {personnelName}?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="awarenessQuestionYes">
                      <input type="radio" id="awarenessQuestionYes" name="awarenessQuestion" className="mr-1" value="true" checked={formData.awarenessQuestion == true} onChange={handleChange}/>
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="awarenessQuestionNo">
                      <input type="radio" id="awarenessQuestionNo" name="awarenessQuestion" className="mr-1" value="false" checked={formData.awarenessQuestion == false} onChange={handleChange}/>
                      No
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset className="text-sm font-light border-b-[1px] border-stroke-clr pb-3 mb-3">
                <legend>Do you agree to be liable to any damages caused by our employee?</legend>
                <ul className="flex items-center gap-5 mt-2">
                  <li>
                    <label htmlFor="liabilityQuestionYes">
                      <input type="radio" id="liabilityQuestionYes" name="liabilityQuestion" className="mr-1" value="true" checked={formData.liabilityQuestion == true} onChange={handleChange}/>
                      Yes
                    </label>
                  </li>
                  <li>
                    <label htmlFor="liabilityQuestionNo">
                      <input type="radio" id="liabilityQuestionNo" name="liabilityQuestion" className="mr-1" value="false" checked={formData.liabilityQuestion == false} onChange={handleChange}/>
                      No
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div className="mt-3 text-sm font-light">
                  <label htmlFor="idCard">Upload your corporate ID card!</label>
                  <input type="file" id="idCard" className="guarantor-inp rounded-full  mt-3 px-5 w-full py-1 pl-3 text-gray-900 outline-none" onChange={(e) => handleIdCardUrl(e)}  />
              </div>
              <div className="mt-3 text-sm font-light border-y-[1px] border-stroke-clr py-3 mb-5">
                  <span>Click the button below for the liveness check!</span>
                  <button
                    onClick={()=> navigate('liveness-check')}
                    className="guarantor-inp flex items-center gap-2 hover:bg-white mt-3 pl-3 rounded-full text-gray-900 text-sm font-bold"
                  >
                    <span>Click</span>
                    <PiRecordFill  className="text-destructive text-4xl"/>
                  </button>
              </div>

                 <button type="submit"
                  className="grid place-items-center w-full bg-destructive py-4 mt-2 rounded-xl text-white font-bold hover:bg-red-700"
                  disabled={isLoading}
                 >
                  {isLoading ? <Spinner /> : "Submit"}
                </button>
            </div>)}
            </div>
        </form>
    </div>
    </>
  )
}

export default GuarantorForm;