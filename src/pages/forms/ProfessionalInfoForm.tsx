import { baseUrl } from "@/api/baseUrl";
import images from "@/assets/Images";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface formData {
    personnelName: string,
    responseId: string,
    organizationName: boolean,
    organizationEmail: boolean,
    employmentStartDate: boolean,
    employmentType: boolean,
    professionalSkills: boolean,
    referenceName: boolean,
    organizationId: string,
}

interface formData2 {
    personnelName: string,
    responseId: string,
    organizationName: boolean,
    organizationEmail: boolean,
    employmentStartDate: boolean,
    employmentType: boolean,
    professionalSkills: boolean,
    referenceName: boolean,
    organizationId: string,
}

function ProfessionalInfo() {
    const { id, personnelName, organizationId } = useParams<{ organizationId: string, id: string, personnelName: string }>();
    const [claim, setClaim] = useState({
        priOrganizationName: "",
        priOrganizationEmail: "",
        priEmploymentStartDate: "",
        priEmploymentType: "",
        priProfessionalSkills: "",
        priProfessionalReferenceName: "",
        priOrganizationName2: "",
        priOrganizationEmail2: "",
        priEmploymentStartDate2: "",
        priEmploymentType2: "",
        priProfessionalSkills2: "",
        priProfessionalReferenceName2: ""
    })

    const [formData, setFormData] = useState<formData>({
        personnelName: `${personnelName}`,
        responseId: `${id}`,
        organizationName: false,
        organizationEmail: false,
        employmentStartDate: false,
        employmentType: false,
        professionalSkills: false,
        referenceName: false,
        organizationId: '1',
    })

    const [formData2, setFormData2] = useState<formData2>({
        personnelName: `${personnelName}`,
        responseId: `${id}`,
        organizationName: false,
        organizationEmail: false,
        employmentStartDate: false,
        employmentType: false,
        professionalSkills: false,
        referenceName: false,
        organizationId: '2',
    })

    useEffect(() => {
        const getClaim = async() => {
            try{
            const res = await axios.get(`${baseUrl}/verification-response/one/${id}`)
            console.log(res.data.data.responses)
            setClaim(res.data.data.responses)
            } catch(err){
            console.error(err)
            }
        }
        getClaim()
    }, [id])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log("Changing:", name, "to", value);
        setFormData((prev) => ({
            ...prev,
            [name]: value === "true",
        }));
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log("Changing:", name, "to", value);
        setFormData2((prev) => ({
            ...prev,
            [name]: value === "true",
        }));
    };
    
    

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const info = await axios.post(`${baseUrl}/professional-form`, formData)
            console.log(info)
            alert("Successfully submitted")
        }catch(err){
            console.error(err)
        }
      };

      const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const info = await axios.post(`${baseUrl}/professional-form`, formData2)
            console.log(info)
            alert("Successfully submitted")
        }catch(err){
            console.error(err)
        }
      };
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <nav className="max-w-lg w-full bg-white shadow-md rounded-xl py-4 px-6 flex justify-between items-center">
                <div>
                    <img src={images.logo} alt="Vettme" className="h-8 object-contain" />
                </div>
            </nav>

            {organizationId && organizationId == "1" && (
            <div className="bg-white shadow-lg rounded-xl p-6 mt-2 max-w-lg w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Employment Verification for {personnelName}
                </h2>

                <form onSubmit={handleSubmit}>
                {claim.priOrganizationName && (
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr/Mrs {personnelName} work in your Organization ({claim.priOrganizationName})?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="organizationNameYes" className="hidden peer" name="organizationName" value="true" checked={formData.organizationName === true} onChange={handleChange} />
                            <label
                                htmlFor="organizationNameYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="organizationNameNo"  className="hidden peer" name="organizationName" value="false" checked={formData.organizationName === false} onChange={handleChange}/>
                            <label
                                htmlFor="organizationNameNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                {claim.priOrganizationEmail && (
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Is this your organization's email ({claim.priOrganizationEmail})?
                    </legend>
                    
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="organizationEmailYes" className="hidden peer" name="organizationEmail" value="true" checked={formData.organizationEmail === true} onChange={handleChange} />
                            <label
                                htmlFor="organizationEmailYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="organizationEmailNo" className="hidden peer" name="organizationEmail" value="false" checked={formData.organizationEmail === false} onChange={handleChange}/>
                            <label
                                htmlFor="organizationEmailNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                {claim.priEmploymentStartDate && (
                <fieldset className="mb-5">
                    
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr/Mrs {personnelName} start working in your Organization on {claim.priEmploymentStartDate }?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="employmentStartDateYes" className="hidden peer" name="employmentStartDate" value="true" checked={formData.employmentStartDate === true} onChange={handleChange} />
                            <label
                                htmlFor="employmentStartDateYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="employmentStartDateNo" className="hidden peer" name="employmentStartDate" value="false" checked={formData.employmentStartDate === false} onChange={handleChange} />
                            <label
                                htmlFor="employmentStartDateNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}


                {claim.priEmploymentType && (
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Was the employment type of Mr/Mrs {personnelName} {claim.priEmploymentType}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="employmentTypeYes" className="hidden peer" name="employmentType" value="true" checked={formData.employmentType === true} onChange={handleChange}/>
                            <label
                                htmlFor="employmentTypeYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="employmentTypeNo" className="hidden peer" name="employmentType" value="false" checked={formData.employmentType === false} onChange={handleChange}/>
                            <label
                                htmlFor="employmentTypeNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                {claim.priProfessionalSkills && (
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Would you say that Mr/Mrs {personnelName} possesses these skills: {claim.priProfessionalSkills}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="professionalSkillsYes" className="hidden peer" name="professionalSkills" value="true" checked={formData.professionalSkills === true} onChange={handleChange}/>
                            <label
                                htmlFor="professionalSkillsYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="professionalSkillsNo" className="hidden peer" name="professionalSkills" value="false" checked={formData.professionalSkills === false} onChange={handleChange}/>
                            <label
                                htmlFor="professionalSkillsNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                {claim.priProfessionalReferenceName && (  
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Mr/Mrs {personnelName} used Mr/Mrs {claim.priProfessionalReferenceName} as a reference. Have you worked with them, and would you consider them a good referral?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="referenceNameYes" className="hidden peer" name="referenceName" value="true" checked={formData.referenceName === true} onChange={handleChange}/>
                            <label
                                htmlFor="referenceNameYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="referenceNameYes" className="hidden peer" name="referenceName" value="false" checked={formData.referenceName === false} onChange={handleChange}/>
                            <label
                                htmlFor="referenceNameYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}
                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition" type="submit">
                    Submit
                </button>
                </form>
                
            </div>
            )}

            {organizationId && organizationId == "2" && (
            <div className="bg-white shadow-lg rounded-xl p-6 mt-2 max-w-lg w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Employment Verification for {personnelName}
                </h2>

                <form onSubmit={handleSubmit2}>
                {claim.priOrganizationName2 && (
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr/Mrs {personnelName} work in your Organization ({claim.priOrganizationName2})?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="organizationNameYes" className="hidden peer" name="organizationName" value="true" checked={formData2.organizationName === true} onChange={handleChange2} />
                            <label
                                htmlFor="organizationNameYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="organizationNameNo"  className="hidden peer" name="organizationName" value="false" checked={formData2.organizationName === false} onChange={handleChange2}/>
                            <label
                                htmlFor="organizationNameNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                {claim.priOrganizationEmail2 && (
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Is this your organization's email ({claim.priOrganizationEmail2})?
                    </legend>
                    
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="organizationEmailYes" className="hidden peer" name="organizationEmail" value="true" checked={formData2.organizationEmail === true} onChange={handleChange2} />
                            <label
                                htmlFor="organizationEmailYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="organizationEmailNo" className="hidden peer" name="organizationEmail" value="false" checked={formData2.organizationEmail === false} onChange={handleChange2}/>
                            <label
                                htmlFor="organizationEmailNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                {claim.priEmploymentStartDate2 && (
                <fieldset className="mb-5">
                    
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Did Mr/Mrs {personnelName} start working in your Organization on {claim.priEmploymentStartDate2}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="employmentStartDateYes" className="hidden peer" name="employmentStartDate" value="true" checked={formData2.employmentStartDate === true} onChange={handleChange2} />
                            <label
                                htmlFor="employmentStartDateYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="employmentStartDateNo" className="hidden peer" name="employmentStartDate" value="false" checked={formData2.employmentStartDate === false} onChange={handleChange2} />
                            <label
                                htmlFor="employmentStartDateNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}


                {claim.priEmploymentType2 && (
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Was the employment type of Mr/Mrs {personnelName} {claim.priEmploymentType2}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="employmentTypeYes" className="hidden peer" name="employmentType" value="true" checked={formData2.employmentType === true} onChange={handleChange2}/>
                            <label
                                htmlFor="employmentTypeYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="employmentTypeNo" className="hidden peer" name="employmentType" value="false" checked={formData2.employmentType === false} onChange={handleChange2}/>
                            <label
                                htmlFor="employmentTypeNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                {claim.priProfessionalSkills2 && (
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Would you say that Mr/Mrs {personnelName} possesses these skills: {claim.priProfessionalSkills2}?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="professionalSkillsYes" className="hidden peer" name="professionalSkills" value="true" checked={formData2.professionalSkills === true} onChange={handleChange2}/>
                            <label
                                htmlFor="professionalSkillsYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="professionalSkillsNo" className="hidden peer" name="professionalSkills" value="false" checked={formData2.professionalSkills === false} onChange={handleChange2}/>
                            <label
                                htmlFor="professionalSkillsNo"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                {claim.priProfessionalReferenceName2 && (  
                <fieldset className="mb-5">
                    <legend className="text-gray-700 text-sm font-medium mb-2">
                        Mr/Mrs {personnelName} used Mr/Mrs {claim.priProfessionalReferenceName2} as a reference. Have you worked with them, and would you consider them a good referral?
                    </legend>
                    <ul className="flex items-center gap-4">
                        <li className="flex items-center">
                            <input type="radio" id="referenceNameYes" className="hidden peer" name="referenceName" value="true" checked={formData2.referenceName === true} onChange={handleChange2}/>
                            <label
                                htmlFor="referenceNameYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-green-500 peer-checked:text-white"
                            >
                                Yes
                            </label>
                        </li>
                        <li className="flex items-center">
                            <input type="radio" id="referenceNameYes" className="hidden peer" name="referenceName" value="false" checked={formData2.referenceName === false} onChange={handleChange2}/>
                            <label
                                htmlFor="referenceNameYes"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 peer-checked:bg-red-500 peer-checked:text-white"
                            >
                                No
                            </label>
                        </li>
                    </ul>
                </fieldset>
                )}

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition" type="submit">
                    Submit
                </button>
                </form>
            </div>
            )}
        </div>
    );
}

export default ProfessionalInfo;