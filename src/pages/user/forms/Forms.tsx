import images from "@/assets/Images";
import UserFormSumitted from "@/components/modals/UserFormSumitted";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createFormResponse } from "@/api/form";
import Spinner from "@/components/Spinner";
import { baseUrl } from "@/api/baseUrl";

interface FormData {
  formId: string;
  responses: {
    [key: string]: string | number;
  };
}

interface Field {
  id: string;
  label: string;
  type: string;
  options?: string[];
}

interface Field2 {
  id: string;
  label: string;
  type: string;
  options?: string[];
}

interface Field3 {
  id: string;
  label: string;
  type: string;
  options?: string[];
}

interface Field4 {
  id: string;
  label: string;
  type: string;
  options?: string[];
}

interface Field5 {
  id: string;
  label: string;
}

export default function Forms() {
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    title: "",
  });
  const url = window.location.href.split("/")[4];
  const [visibleFields, setVisibleFields] = useState<string[]>([]);
  // const [createdResponse, setCreatedResponse] = useState<any | null>(null);
  const [formData, setFormData] = useState<FormData>({
    formId: `${url}`,
    responses: {},
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value,} = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     responses: {
  //       ...prevData.responses,
  //       [name]: value,
  //     }
  //   }))
  // }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      responses: {
        ...prevData.responses,
        [name]:
          type === "checkbox" && e.target instanceof HTMLInputElement
            ? e.target.checked
              ? "yes"
              : "no" // ✅ Store as "yes" or "no"
            : type === "number" && e.target instanceof HTMLInputElement
            ? value === ""
              ? ""
              : parseFloat(value) // ✅ Convert number values
            : value, // ✅ Handles text and select inputs correctly
      },
    }));
  };

  // Handle response submission
  const handleSetup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = { ...formData };
    console.log("Payload before sending: ", newFormData);

    const createdResponse = await createFormResponse(newFormData, setIsLoading);

    if (createdResponse) {
      console.log("Created Form Response:", createdResponse);
      // setCreatedResponse(createdResponse)
      setModalOpen(true);
    } else {
      console.error("Response creaton failed or no data returned.");
    }
  };

  useEffect(() => {
    // Fetch the form visibility data from the backend
    axios
      .get(`${baseUrl}/verification/form/${url}`)
      // Adjust the URL to your API endpoint
      .then((response) => {
        // Extract keys from the backend response where the value is true
        const data = response.data.data;
        setFormInfo(data);
        const visibleFieldKeys = Object.keys(data.fields).filter(
          (key) => response.data.data.fields[key] === true
        );
        setVisibleFields(visibleFieldKeys); // Set the visible fields in state
      })
      .catch((error) => {
        console.error("Error fetching visibility data:", error);
      });
  }, [url, token]);

  const personalInfoFields: Field[] = [
    { id: "piFullname", label: "Full Name", type: "text" },
    { id: "piDateOfBirth", label: "Date of Birth", type: "date" },
    {
      id: "piGender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female"],
    },
    { id: "piNationality", label: "Nationality", type: "text" },
    { id: "piAddress", label: "Address", type: "text" },
    { id: "piState", label: "State", type: "text" },
    { id: "piLGA", label: "LGA", type: "text" },
    { id: "piCountry", label: "Country", type: "text" },
    { id: "piPhoneNumber", label: "Phone Number", type: "text" },
    { id: "piEmailAddress", label: "Email Address", type: "text" },
    { id: "piBvn", label: "BVN", type: "number" },
    {
      id: "piNationalIdentificationNumber",
      label: "National Identification Number (NIN)",
      type: "number",
    },
    {
      id: "piMaritalStatus",
      label: "Marital Status",
      type: "select",
      options: ["Single", "Married"],
    },
    { id: "piNextofKinName", label: "Next of Kin Name", type: "text" },
    {
      id: "piNextofKinRelationship",
      label: "Next of Kin Relationship",
      type: "select",
      options: [
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Friend",
        "Other Relative",
        "Friend",
      ],
    },
    {
      id: "piNextofKinPhoneNumber",
      label: "Next of Kin Phone Number",
      type: "text",
    },
  ];

  const guarantorInfoFields: Field2[] = [
    { id: "giFullName", label: "Full Name", type: "text" },
    {
      id: "giRelationshiptoPersonnel",
      label: "Relationship to Personnel",
      type: "select",
      options: [
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Friend",
        "Other Relative",
        "Friend",
      ],
    },
    { id: "giOccupation", label: "Occupation", type: "text" },
    { id: "giPhoneNumber", label: "Phone Number", type: "text" },
    { id: "giAddress", label: "Address", type: "text" },
    { id: "giLGA", label: "LGA", type: "text" },
    { id: "giState", label: "State", type: "text" },
    { id: "giCountry", label: "Country", type: "text" },
    { id: "giEmailAddress", label: "Email Address", type: "text" },
    { id: "giYearsKnown", label: "Years Known", type: "number" },
    {
      id: "giNationalIdentificationNumber",
      label: "National Identification Number (NIN)",
      type: "number",
    },
  ];

  const academicInfoFields: Field3[] = [
    {
      id: "aiHighestQualification",
      label: "Highest Qualification",
      type: "select",
      options: [
        "First Leaving School Certificate",
        "Senior School Leaving Certificate - SSCE",
        "Nigerian Certificate In Education - NCE",
        "Ordinary National Diploma - OND",
        "Higher National Diploma - HND",
        "Bachelors -BSc",
        "Masters - MSc",
        "Doctor -PhD",
      ],
    },
    { id: "aiNameofInstitution", label: "Name of Institution", type: "text" },
    { id: "aiYearofGraduation", label: "Year of Graduation", type: "date" },
    {
      id: "aiDegreeOrCertificationUpload",
      label: "Degree Or Certification Upload",
      type: "text",
    },
    {
      id: "aiProfessionalCertifications",
      label: "Professional Certifications",
      type: "text",
    },
  ];

  const professionalInfoFields: Field4[] = [
    { id: "priCurrentJob", label: "Current Job", type: "text" },
    { id: "priOrganizationName", label: "Organization Name", type: "text" },
    {
      id: "priEmploymentStartDate",
      label: "Employment Start Date",
      type: "text",
    },
    {
      id: "priEmploymentType",
      label: "Employment Type",
      type: "select",
      options: ["On-site", "Hybrid", "Remote"],
    },
    { id: "priJobResponsibility", label: "Job Responsibility", type: "date" },
    { id: "priProfessionalSkills", label: "Professional Skills", type: "text" },
    { id: "priLinkedInProfile", label: "LinkedIn Profile", type: "text" },
    {
      id: "priProfessionalReferenceName",
      label: "Professional Reference Name",
      type: "text",
    },
    {
      id: "priProfessionalReferencePhoneNumber",
      label: "Professional Reference Phone Number",
      type: "text",
    },
    { id: "priCurrentSalary", label: "Current Salary", type: "number" },
    {
      id: "priExpectedSalaryRange",
      label: "Expected Salary Range",
      type: "number",
    },
  ];

  const mentalHealthFields: Field5[] = [
    {
      id: "mhaCurrentMentalHealthCondition",
      label: "Current Mental Health Condition",
    },
    {
      id: "mhaHistoryofMentalHealthConditions",
      label: "History of Mental Health Conditions",
    },
    {
      id: "mhaAreYouCurrentlyUnderAnyMedicationOrTreatment",
      label: "Are you currently under any Medication or Treatment",
    },
    {
      id: "mhaHaveYouHadAnyPreviousPsychiatricConsultations",
      label: "Have you had any previous Psychiatric Consultations",
    },
    {
      id: "mhaHaveYouExperiencedAnyMajorTraumaInThePastYear",
      label: "Have you experienced any major trauma in the past Year",
    },
    { id: "mhaEmotionalWellbeing", label: "Emotional Wellbeing" },
  ];

  // Filter personalInfoFields based on visibleFields
  const filteredFields = personalInfoFields.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredFields2 = guarantorInfoFields.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredFields3 = academicInfoFields.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredFields4 = professionalInfoFields.filter((field) =>
    visibleFields.includes(field.id)
  );

  const filteredFields5 = mentalHealthFields.filter((field) =>
    visibleFields.includes(field.id)
  );

  return (
    <>
      <form
        className="max-w-screen-sm mx-auto px-[4vw] my-6"
        onSubmit={handleSetup}
      >
        <div className="w-full mb-6">
          <img src={images.logo} alt="Vettme" className="h-8" />
        </div>
        <div className="w-full bg-white rounded-2xl border-[1px] border-stroke-clr">
          <div className="p-4 border-b-[1px] border-stroke-clr">
            <h2>{formInfo.title}</h2>
            <p className="py-2">
              Please complete this form to provide accurate and up-to-date
              information for verification purposes. Ensure all details are
              filled in correctly before submission.
            </p>
            <p><strong>All fields must be filled.</strong></p> <br />
            <p><strong>Please be informed that civil servants cannot be used as guarantors for this verification process. Civil servants are restricted from acting as guarantors due to regulatory and employment policies.</strong></p>
          </div>

          <div className="w-full">
            <Tabs defaultValue="personal" className="w-full">
              <div className="overflow-x-scroll">
                <TabsList className="min-w-full rounded-none border-b-[1px] border-stroke-clr overflow-hidden">
                  {filteredFields.length !== 0 && (
                    <TabsTrigger value="personal" className="w-full">
                      Personal Information
                    </TabsTrigger>
                  )}

                  {filteredFields.length !== 0 && (
                    <TabsTrigger value="guarantor" className="w-full">
                      Guarantor's Information
                    </TabsTrigger>
                  )}

                  {filteredFields3.length !== 0 && (
                    <TabsTrigger value="academic" className="w-full">
                      Academic Information
                    </TabsTrigger>
                  )}

                  {filteredFields4.length !== 0 && (
                    <TabsTrigger value="professional" className="w-full">
                      Professional Information
                    </TabsTrigger>
                  )}

                  {filteredFields5.length !== 0 && (
                    <TabsTrigger value="mental" className="w-full">
                      Mental Assessment
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>

              <div className="p-3 pb-0">
                <TabsContent value="personal">
                  {filteredFields.map((field) => (
                    <label
                      htmlFor={field.id}
                      key={field.id}
                      className="block mb-4"
                    >
                      <p>{field.label}</p>

                      {field.type === "text" && (
                        <Input
                          type="text"
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          required
                        />
                      )}

                      {field.type === "number" && (
                        <Input
                          type="number"
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          required
                        />
                      )}

                      {field.type === "date" && (
                        <Input
                          type="date"
                          id={field.id}
                          name={field.id}
                          value={
                            formData.responses[field.id]
                              ? String(formData.responses[field.id])
                              : ""
                          }
                          onChange={handleChange}
                          required
                        />
                      )}

                      {field.type === "select" && field.options && (
                        <select
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          required
                          className="btn w-full bg-transparent"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </label>
                  ))}
                </TabsContent>

                <TabsContent value="guarantor">
                  {filteredFields2.map((field) => (
                    <label
                      htmlFor={field.id}
                      key={field.id}
                      className="block mb-4"
                    >
                      <p>{field.label}</p>

                      {field.type === "text" && (
                        <Input
                          type="text"
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          required
                        />
                      )}

                      {field.type === "number" && (
                        <Input
                          type="number"
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          required
                        />
                      )}

                      {field.type === "date" && (
                        <Input
                          type="date"
                          id={field.id}
                          name={field.id}
                          value={
                            formData.responses[field.id]
                              ? String(formData.responses[field.id])
                              : ""
                          }
                          onChange={handleChange}
                          required
                        />
                      )}

                      {field.type === "select" && field.options && (
                        <select
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          required
                          className="btn w-full bg-transparent"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </label>
                  ))}
                </TabsContent>

                <TabsContent value="academic">
                  {filteredFields3.map((field) => (
                    <label
                      htmlFor={field.id}
                      key={field.id}
                      className="block mb-4"
                    >
                      <p>{field.label}</p>

                      {field.type === "text" && (
                        <Input
                          type="text"
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          required
                        />
                      )}

                      {field.type === "number" && (
                        <Input
                          type="number"
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          required
                        />
                      )}

                      {field.type === "date" && (
                        <Input
                          type="date"
                          id={field.id}
                          name={field.id}
                          value={
                            formData.responses[field.id]
                              ? String(formData.responses[field.id])
                              : ""
                          }
                          onChange={handleChange}
                          required
                        />
                      )}

                      {field.type === "select" && field.options && (
                        <select
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          required
                          className="btn w-full bg-transparent"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </label>
                  ))}
                </TabsContent>

                <TabsContent value="professional">
                  {filteredFields4.map((field) => (
                    <label
                      htmlFor={field.id}
                      key={field.id}
                      className="block mb-4"
                    >
                      <p>{field.label}</p>

                      {field.type === "text" && (
                        <Input
                          type="text"
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          required
                        />
                      )}

                      {field.type === "number" && (
                        <Input
                          type="number"
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          required
                        />
                      )}

                      {field.type === "select" && field.options && (
                        <select
                          id={field.id}
                          name={field.id}
                          value={formData.responses[field.id] || ""}
                          onChange={handleChange}
                          required
                          className="btn w-full bg-transparent"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </label>
                    // <label htmlFor="current_job" className="block mb-4">
                    //   <p>Current/Immediate Job Title</p>
                    //   <Input
                    //     type="text"
                    //     id="current_job"
                    //     placeholder="e.g. Project Manager"
                    //   />
                    // </label>

                    // <label htmlFor="organization_name" className="block mb-4">
                    //   <p>Company/Organization Name</p>
                    //   <Input
                    //     type="text"
                    //     id="organization_name"
                    //     placeholder="e.g. Unilever"
                    //   />
                    // </label>

                    // <label htmlFor="organization_address" className="block mb-4">
                    //   <p>Company/Organization Address</p>
                    //   <Input
                    //     type="text"
                    //     id="organization_address"
                    //     placeholder="e.g. somewhere street, Lagos Nigeria"
                    //   />
                    // </label>

                    // <label htmlFor="employment_type" className="block mb-4">
                    //   <p>Employment Type</p>
                    //   <select
                    //     name="employment_type"
                    //     id="employment_type"
                    //     className="btn w-full bg-transparent"
                    //     required
                    //   >
                    //     <option value="" selected={true} disabled>
                    //       Select an option
                    //     </option>
                    //     <option value="full_time">Full Time</option>
                    //     <option value="hybrid">Hybrid</option>
                    //     <option value="remote">Remote</option>
                    //   </select>
                    // </label>

                    // <label htmlFor="empoyment_start date" className="block mb-4">
                    //   <p>Employment Start Date</p>
                    //   <input
                    //     type="month"
                    //     id="empoyment_start date"
                    //     className="w-full btn"
                    //   />
                    // </label>

                    // <label htmlFor="job_responsibility" className="block mb-4">
                    //   <p>Job Responsibility</p>
                    //   <Input
                    //     type="text"
                    //     id="job_responsibility"
                    //     placeholder="e.g. management of sales outlet and accounting"
                    //   />
                    // </label>

                    // <label htmlFor="professional_skills" className="block mb-4">
                    //   <p>Professional Skills</p>
                    //   <Input
                    //     type="text"
                    //     id="professional_skills"
                    //     placeholder="e.g. management, leadership, accounting"
                    //   />
                    // </label>

                    // <label htmlFor="current_salary" className="block mb-4">
                    //   <p>Current Salary (NGN)</p>
                    //   <Input
                    //     type="text"
                    //     inputMode="numeric"
                    //     id="current_salary"
                    //     placeholder="e.g. 350000"
                    //   />
                    // </label>

                    // <label htmlFor="expected_salary" className="block mb-4">
                    //   <p>Expected Salary Range (NGN)</p>
                    //   <Input
                    //     type="text"
                    //     id="expected_salary"
                    //     placeholder="e.g. 350000 - 500000"
                    //   />
                    // </label>

                    // <label htmlFor="referee_name" className="block mb-4">
                    //   <p>Profressional Reference Name</p>
                    //   <Input
                    //     type="text"
                    //     id="referee_name"
                    //     placeholder="e.g. John Doe"
                    //   />
                    // </label>

                    // <label htmlFor="referee_phone" className="block mb-4">
                    //   <p>Profressional Reference Phone number</p>
                    //   <Input
                    //     type="text"
                    //     inputMode="tel"
                    //     id="referee_phone"
                    //     placeholder="e.g. 09011223344"
                    //   />
                    // </label>

                    // <label htmlFor="linkedin_url" className="block mb-4">
                    //   <p>LinkedIn Profile URL</p>
                    //   <Input
                    //     type="text"
                    //     inputMode="url"
                    //     id="linkedin_url"
                    //     placeholder="e.g. 09011223344"
                    //   />
                    // </label>
                  ))}
                </TabsContent>

                <TabsContent value="mental">
                  <label htmlFor="health_conditon" className="block mb-4">
                    <p>Current Mental Health Condition (if known)</p>
                    <Input
                      type="text"
                      id="health_conditon"
                      placeholder="e.g. Asthmatic"
                    />
                  </label>

                  <label htmlFor="health_history" className="block mb-4">
                    <p>History of Mental Health Conditions</p>
                    <Input
                      type="text"
                      id="health_history"
                      placeholder="e.g. I used to be asthmatic"
                    />
                  </label>

                  <label htmlFor="is_under_treatment" className="block mb-4">
                    <p>Are you currently under any medication or treatment?</p>
                    <select
                      name="is_under_treatment"
                      id="is_under_treatment"
                      className="w-full btn"
                    >
                      <option value="" selected={true} disabled>
                        Select an Option
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>

                  <label htmlFor="was_psychiatric" className="block mb-4">
                    <p>Have you had any previous psychiatric consultations?</p>
                    <select
                      name="was_psychiatric"
                      id="was_psychiatric"
                      className="w-full btn"
                    >
                      <option value="" selected={true} disabled>
                        Select an Option
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>

                  <label htmlFor="self_assessment_scale" className="block mb-4">
                    <p>Self-assessment of Stress Level (1 - Low, 10 - High)</p>
                    <Input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      id="self_assessment_scale"
                      placeholder="e.g. 7"
                    />
                  </label>

                  <label htmlFor="was_traumatic" className="block mb-4">
                    <p>
                      Have you experienced any major trauma in the past year?
                    </p>
                    <select
                      name="was_traumatic"
                      id="was_traumatic"
                      className="w-full btn"
                    >
                      <option value="" selected={true} disabled>
                        Select an Option
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>

                  <label htmlFor="emotional_wellbeing" className="block mb-4">
                    <p>Describe your Emotional Well-being Briefly</p>
                    <Textarea
                      className="resize-none"
                      id="emotional_wellbeing"
                    />
                  </label>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          <label htmlFor="email_copy" className="flex items-center gap-2 p-3">
            <input type="checkbox" name="email_copy" id="email_copy" />
            <p>Send a copy of my data to my email</p>
          </label>
        </div>
        <Button type="submit" className="red-gradient mt-3">
          {isLoading ? <Spinner /> : "Submit Data for Verification"}
        </Button>
      </form>
      {<UserFormSumitted isOpen={modalOpen} />}
    </>
  );
}
