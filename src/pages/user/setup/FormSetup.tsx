import { Input } from "@/components/ui/input";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormCreation from "@/components/modals/FormCreation";
import { Link } from "react-router-dom";

export default function FormSetup() {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [creationModalActive, setCreationModalActive] = useState(false);

  const [setupData, setSetupData] = useState({
    title: "",
    personal_information: [] as string[],
    academic_information: [] as string[],
    guarantor_information: [] as string[],
    professional_information: [] as string[],
    mental_information: [] as string[],
  });

  const setInfo = (
    type:
      | "personal_information"
      | "academic_information"
      | "guarantor_information"
      | "professional_information"
      | "mental_information",
    name: string
  ) => {
    const currentInfo = setupData[type];

    // Check if the item is already selected
    if (currentInfo.includes(name)) {
      // Remove the item if it's already selected
      const newData = currentInfo.filter((item) => item !== name);
      setSetupData((prevData) => ({
        ...prevData,
        [type]: newData,
      }));
    } else {
      // Otherwise, add the item
      setSetupData((prevData) => ({
        ...prevData,
        [type]: [...currentInfo, name],
      }));
    }
  };

  const setPersonalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo("personal_information", e.target.id);
  };

  const setAcademicInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo("academic_information", e.target.id);
  };
 
  const setMentalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo("mental_information", e.target.id);
  };

  const setGuarantorInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo("guarantor_information", e.target.id);
  };

  const setProfessionalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo("professional_information", e.target.id);
  };

  const handleSetup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(setupData);
    
    setCreationModalActive(true);
  };

  return (
    <>
      {creationModalActive && <FormCreation isOpen={creationModalActive} />}
      <div className="mb-[30px] ">
        <h2>Create Verification Form</h2>
        <p className="text-sm">
          Enter form title and select the fields that you want your employee to
          fill in the options below. The defaults cannot be deselected.
        </p>
      </div>
      <div className="flex items-start gap-4">
        <form onSubmit={handleSetup} className="basis-2/3">
          <div className="w-full py-5 px-7 rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px] flex gap-6">
            <label htmlFor="title" className="block w-full">
              <p className="text-[16px] font-medium">Form Title</p>
              <Input
                type="text"
                id="title"
                onChange={(e) =>
                  setSetupData({
                    ...setupData,
                    title: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="verificationType">
              <p className="text-[16px]">Verification Type</p>
              <select id="verificationType" className="btn px-2">
                <option value="">Choose Verification Type</option>
                <option value="personnelVerification">Personnel Verification</option>
                <option value="loanVerification">Loan Verification Type</option>
                <option value="criminalVerification">Criminal Record Verification</option>
                <option value="other">Other Verification</option>
              </select>
            </label>
          </div>

          <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
            <div
              className={`py-5 px-7 ${
                activeTab === 1 && "border-b-[1px]"
              } border-stroke-clr flex justify-between items-center cursor-pointer`}
              onClick={() => setActiveTab(1)}
            >
              <p className="text-[16px] font-medium">Personal Information</p>
              {activeTab === 1 ? <TriangleDownIcon /> : <TriangleRightIcon />}
            </div>

            {activeTab === 1 && (
              <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                <label htmlFor="full_name" className="flex gap-2">
                  <input
                    type="checkbox"
                    id="full_name"
                    name="fullname"
                    // onChange={setPersonalInfo}
                  />
                  <p className="text-sm">Full Name</p>
                </label>
                <label htmlFor="dob" className="flex gap-2">
                  <input type="checkbox" id="dob" onChange={setPersonalInfo} />
                  <p className="text-sm">Date of Birth</p>
                </label>
                <label htmlFor="gender" className="flex gap-2">
                  <input
                    type="checkbox"
                    name="dob"
                    // onChange={setPersonalInfo}
                    id="gender"
                  />
                  <p className="text-sm">Gender</p>
                </label>
                <label htmlFor="nationaliy" className="flex gap-2">
                  <input
                    type="checkbox"
                    name="gender"
                    // onChange={setPersonalInfo}
                    id="nationaliy"
                  />
                  <p className="text-sm">Nationality</p>
                </label>
                <label htmlFor="address" className="flex gap-2">
                  <input
                    type="checkbox"
                    // onChange={setPersonalInfo}
                    id="address"
                  />
                  <p className="text-sm">Residential Address</p>
                </label>
                <label htmlFor="phone" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setPersonalInfo}
                    id="phone"
                  />
                  <p className="text-sm">Phone Number</p>
                </label>
                <label htmlFor="email" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setPersonalInfo}
                    id="email"
                  />
                  <p className="text-sm">Email Address</p>
                </label>
                <label htmlFor="id" className="flex gap-2">
                  <input type="checkbox" onChange={setPersonalInfo} id="id" />
                  <p className="text-sm">
                    National Identification Number (NIN)
                  </p>
                </label>
                <label htmlFor="marital_status" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setPersonalInfo}
                    id="marital_status"
                  />
                  <p className="text-sm">Marital Status</p>
                </label>
                <label htmlFor="next_of_kin_name" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setPersonalInfo}
                    id="next_of_kin_name"
                  />
                  <p className="text-sm">Next of Kin Name</p>
                </label>
                <label
                  htmlFor="next_of_kin_relationship"
                  className="flex gap-2"
                >
                  <input
                    type="checkbox"
                    onChange={setPersonalInfo}
                    id="next_of_kin_relationship"
                  />
                  <p className="text-sm">Next of Kin Relationship</p>
                </label>
                <label htmlFor="next_of_kin_phone" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setPersonalInfo}
                    id="next_of_kin_phone"
                  />
                  <p className="text-sm">Next of Kin Phone Number</p>
                </label>
              </div>
            )}
          </div>

          <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
            <div
              className={`py-5 px-7 ${
                activeTab === 2 && "border-b-[1px]"
              } border-stroke-clr flex justify-between items-center cursor-pointer`}
              onClick={() => setActiveTab(2)}
            >
              <p className="text-[16px] font-medium">Guarantor's Information</p>
              {activeTab === 2 ? <TriangleDownIcon /> : <TriangleRightIcon />}
            </div>

            {activeTab === 2 && (
              <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                <label htmlFor="guarantor_full_name" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="guarantor_full_name"
                  />
                  <p className="text-sm">Full Name</p>
                </label>
                <label htmlFor="guarantor_relationship" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="guarantor_relationship"
                  />
                  <p className="text-sm">Relationship to Personnel</p>
                </label>
                <label htmlFor="guarantor_occupation" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="guarantor_occupation"
                  />
                  <p className="text-sm">Occupation</p>
                </label>
                <label htmlFor="guarantor_phone" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="guarantor_phone"
                  />
                  <p className="text-sm">Phone Number</p>
                </label>
                <label htmlFor="guarantor_address" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="guarantor_address"
                  />
                  <p className="text-sm">Residential Address</p>
                </label>
                <label htmlFor="guarantor_email" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="guarantor_email"
                  />
                  <p className="text-sm">Email Address</p>
                </label>
                <label htmlFor="email" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="email"
                  />
                  <p className="text-sm">Email Address</p>
                </label>
                <label htmlFor="guarantor_known_since" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="guarantor_known_since"
                  />
                  <p className="text-sm">Years Known</p>
                </label>
                <label htmlFor="guarantor_nin" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setGuarantorInfo}
                    id="guarantor_nin"
                  />
                  <p className="text-sm">National Idenification Number (NIN)</p>
                </label>
              </div>
            )}
          </div>

          <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
            <div
              className={`py-5 px-7 ${
                activeTab === 3 && "border-b-[1px]"
              } border-stroke-clr flex justify-between items-center cursor-pointer`}
              onClick={() => setActiveTab(3)}
            >
              <p className="text-[16px] font-medium">Academic Information</p>
              {activeTab === 3 ? <TriangleDownIcon /> : <TriangleRightIcon />}
            </div>

            {activeTab === 3 && (
              <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                <label htmlFor="highest_qualification" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setAcademicInfo}
                    id="highest_qualification"
                  />
                  <p className="text-sm">Highest Qualification</p>
                </label>
                <label htmlFor="name_of_insitution" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setAcademicInfo}
                    id="name_of_insitution"
                  />
                  <p className="text-sm">Name of Institution</p>
                </label>
                <label htmlFor="year_of_graduation" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setAcademicInfo}
                    id="year_of_graduation"
                  />
                  <p className="text-sm">Year of Graduation</p>
                </label>
                <label htmlFor="certification" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setAcademicInfo}
                    id="certification"
                  />
                  <p className="text-sm">Degree / Certification Upload</p>
                </label>
                <label
                  htmlFor="professional_certification"
                  className="flex gap-2"
                >
                  <input
                    type="checkbox"
                    onChange={setAcademicInfo}
                    id="professional_certification"
                  />
                  <p className="text-sm">Professional Certifications</p>
                </label>
              </div>
            )}
          </div>

          <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
            <div
              className={`py-5 px-7 ${
                activeTab === 4 && "border-b-[1px]"
              } border-stroke-clr flex justify-between items-center cursor-pointer`}
              onClick={() => setActiveTab(4)}
            >
              <p className="text-[16px] font-medium">
                Professional Information
              </p>
              {activeTab === 4 ? <TriangleDownIcon /> : <TriangleRightIcon />}
            </div>

            {activeTab === 4 && (
              <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                <label htmlFor="current_job" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="current_job"
                  />
                  <p className="text-sm">Current Job</p>
                </label>
                <label htmlFor="organization" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="organization"
                  />
                  <p className="text-sm">Organization Name</p>
                </label>
                <label htmlFor="start_date" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="start_date"
                  />
                  <p className="text-sm">Employment Start Date</p>
                </label>
                <label htmlFor="empolyment_type" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="empolyment_type"
                  />
                  <p className="text-sm">
                    Employment type (fulltime, hybrid, remote)
                  </p>
                </label>
                <label htmlFor="organization_role" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="organization_role"
                  />
                  <p className="text-sm">Job Responsibility</p>
                </label>
                <label htmlFor="skills" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="skills"
                  />
                  <p className="text-sm">Professional Skills</p>
                </label>
                <label htmlFor="linkedin" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="linkedin"
                  />
                  <p className="text-sm">LinkedIn Profile</p>
                </label>
                <label htmlFor="referee_name" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="referee_name"
                  />
                  <p className="text-sm">Professional Reference Name</p>
                </label>
                <label htmlFor="referee_phone" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="referee_phone"
                  />
                  <p className="text-sm">Professional Reference Phone Number</p>
                </label>
                <label htmlFor="current_salary" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="current_salary"
                  />
                  <p className="text-sm">Current Salary</p>
                </label>
                <label htmlFor="expected_salary" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setProfessionalInfo}
                    id="expected_salary"
                  />
                  <p className="text-sm">Expected Salary Range</p>
                </label>
              </div>
            )}
          </div>

          <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
            <div
              className={`py-5 px-7 ${
                activeTab === 5 && "border-b-[1px]"
              } border-stroke-clr flex justify-between items-center cursor-pointer`}
              onClick={() => setActiveTab(5)}
            >
              <p className="text-[16px] font-medium">
                Mental Health Assessment
              </p>
              {activeTab === 5 ? <TriangleDownIcon /> : <TriangleRightIcon />}
            </div>

            {activeTab === 5 && (
              <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                <label htmlFor="current_mental_health" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setMentalInfo}
                    id="current_mental_health"
                  />
                  <p className="text-sm">Current Mental Health Condition</p>
                </label>
                <label htmlFor="mental_health_history" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setMentalInfo}
                    id="mental_health_history"
                  />
                  <p className="text-sm">History of Mental Health Conditions</p>
                </label>
                <label htmlFor="is_under_treatment" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setMentalInfo}
                    id="is_under_treatment"
                  />
                  <p className="text-sm">
                    Are you currently under any medication or treatment?
                  </p>
                </label>
                <label htmlFor="was_psychiatric" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setMentalInfo}
                    id="was_psychiatric"
                  />
                  <p className="text-sm">
                    Have you had any previous psychiatric consultations?
                  </p>
                </label>
                <label htmlFor="was_traumatic" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setMentalInfo}
                    id="was_traumatic"
                  />
                  <p className="text-sm">
                    Have you experienced any major trauma in the past year?
                  </p>
                </label>
                <label htmlFor="emotional_wellbeing" className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={setMentalInfo}
                    id="emotional_wellbeing"
                  />
                  <p className="text-sm">
                    Emotional Well-being (describe briefly)
                  </p>
                </label>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Link to="/forms/1234" target="_blank">
              <Button type="button" className="bg-gray-400 hover:bg-gray-500">
                Preview Form
              </Button>
            </Link>
            <Button type="submit" className="red-gradient">
              Complete Form Setup
            </Button>
          </div>
        </form>

        <div className="basis-1/3 sticky top-0 bg-white py-4 px-7 rounded-xl border-[1px] border-stroke-clr">
          <h3>Order Summary</h3>
          <p>
            Total cost of services chosen. Cost is calculated per form
            submission
          </p>
        </div>
      </div>
    </>
  );
}
