interface Field {
  id: string;
  label: string;
  type: string;
  options?: string[];
}

interface Field2 {
  id: string;
  label: string;
}

const personalInfoResponse: Field[] = [
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
  { id: "piCountry", label: "Country", type: "text" },
  { id: "piState", label: "State", type: "text" },
  { id: "piLGA", label: "LGA", type: "text" },
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
    ],
  },
  {
    id: "piNextofKinPhoneNumber",
    label: "Next of Kin Phone Number",
    type: "text",
  },
];

const guarantorInfoResponse: Field[] = [
  { id: "giFullName1", label: "Full Name", type: "text" },
  {
    id: "giRelationshiptoPersonnel1",
    label: "Relationship to Personnel",
    type: "select",
    options: [
      "Father",
      "Mother",
      "Brother",
      "Sister",
      "Friend",
      "Other Relative",
    ],
  },
  { id: "giOccupation1", label: "Occupation", type: "text" },
  { id: "giPhoneNumber1", label: "Phone Number", type: "text" },
  { id: "giAddress1", label: "Address", type: "text" },
  { id: "giCountry1", label: "Country", type: "text" },
  { id: "giState1", label: "State", type: "text" },
  { id: "giLGA1", label: "LGA", type: "text" },
  { id: "giEmailAddress1", label: "Email Address", type: "text" },
  { id: "giYearsKnown1", label: "Years Known", type: "number" },
  {
    id: "giNationalIdentificationNumber1",
    label: "National Identification Number (NIN)",
    type: "number",
  },
];

const guarantorInfoResponse2: Field[] = [
  { id: "giFullName2", label: "Full Name", type: "text" },
  {
    id: "giRelationshiptoPersonnel2",
    label: "Relationship to Personnel2",
    type: "select",
    options: [
      "Father",
      "Mother",
      "Brother",
      "Sister",
      "Friend",
      "Other Relative",
    ],
  },
  { id: "giOccupation2", label: "Occupation", type: "text" },
  { id: "giPhoneNumber2", label: "Phone Number", type: "text" },
  { id: "giAddress2", label: "Address", type: "text" },
  { id: "giCountry2", label: "Country", type: "text" },
  { id: "giState2", label: "State", type: "text" },
  { id: "giLGA2", label: "LGA", type: "text" },
  { id: "giEmailAddress2", label: "Email Address", type: "text" },
  { id: "giYearsKnown2", label: "Years Known", type: "number" },
  {
    id: "giNationalIdentificationNumber2",
    label: "National Identification Number (NIN)",
    type: "number",
  },
];

const guarantorInfoResponse3: Field[] = [
  { id: "giFullName3", label: "Full Name", type: "text" },
  {
    id: "giRelationshiptoPersonnel3",
    label: "Relationship to Personnel",
    type: "select",
    options: [
      "Father",
      "Mother",
      "Brother",
      "Sister",
      "Friend",
      "Other Relative",
    ],
  },
  { id: "giOccupation3", label: "Occupation", type: "text" },
  { id: "giPhoneNumber3", label: "Phone Number", type: "text" },
  { id: "giAddress3", label: "Address", type: "text" },
  { id: "giCountry3", label: "Country", type: "text" },
  { id: "giState3", label: "State", type: "text" },
  { id: "giLGA3", label: "LGA", type: "text" },
  { id: "giEmailAddress3", label: "Email Address", type: "text" },
  { id: "giYearsKnown3", label: "Years Known", type: "number" },
  {
    id: "giNationalIdentificationNumber3",
    label: "National Identification Number (NIN)",
    type: "number",
  },
];

const guarantorInfoResponse4: Field[] = [
  { id: "giFullName4", label: "Full Name", type: "text" },
  {
    id: "giRelationshiptoPersonnel4",
    label: "Relationship to Personnel",
    type: "select",
    options: [
      "Father",
      "Mother",
      "Brother",
      "Sister",
      "Friend",
      "Other Relative",
    ],
  },
  { id: "giOccupation4", label: "Occupation", type: "text" },
  { id: "giPhoneNumber4", label: "Phone Number", type: "text" },
  { id: "giAddress4", label: "Address", type: "text" },
  { id: "giCountry4", label: "Country", type: "text" },
  { id: "giState4", label: "State", type: "text" },
  { id: "giLGA4", label: "LGA", type: "text" },
  { id: "giEmailAddress4", label: "Email Address", type: "text" },
  { id: "giYearsKnown4", label: "Years Known", type: "number" },
  {
    id: "giNationalIdentificationNumber4",
    label: "National Identification Number (NIN)",
    type: "number",
  },
];

const academicInfoResponse: Field[] = [
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

const professionalInfoResponse: Field[] = [
  { id: "priOrganizationName1", label: "Organization Name", type: "text" },
  {
    id: "priEmploymentStartDate1",
    label: "Employment Start Date",
    type: "text",
  },
  {
    id: "priEmploymentType1",
    label: "Employment Type",
    type: "select",
    options: ["On-site", "Hybrid", "Remote"],
  },
  { id: "priProfessionalSkills1", label: "Professional Skills", type: "text" },
  { id: "priLinkedInProfile21", label: "LinkedIn Profile", type: "text" },
  {
    id: "priProfessionalReferenceName1",
    label: "Professional Reference Name",
    type: "text",
  },
  { id: "priOrganizationEmail1", label: "Organization Email", type: "text" },
  {
    id: "priProfessionalReferencePhoneNumber1",
    label: "Professional Reference Phone Number",
    type: "text",
  },
];

const professionalInfoResponse2: Field[] = [
  { id: "priOrganizationName2", label: "Organization Name", type: "text" },
  {
    id: "priEmploymentStartDate2",
    label: "Employment Start Date",
    type: "text",
  },
  {
    id: "priEmploymentType2",
    label: "Employment Type",
    type: "select",
    options: ["On-site", "Hybrid", "Remote"],
  },
  { id: "priProfessionalSkills2", label: "Professional Skills", type: "text" },
  { id: "priLinkedInProfile2", label: "LinkedIn Profile", type: "text" },
  {
    id: "priProfessionalReferenceName2",
    label: "Professional Reference Name",
    type: "text",
  },
  { id: "priOrganizationEmail2", label: "Organization Email", type: "text" },
  {
    id: "priProfessionalReferencePhoneNumber2",
    label: "Professional Reference Phone Number",
    type: "text",
  },
];

const mentalHealthResponse: Field2[] = [
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

export {
  personalInfoResponse, 
  guarantorInfoResponse, 
  guarantorInfoResponse2,
  guarantorInfoResponse3,
  guarantorInfoResponse4,
  academicInfoResponse,
  professionalInfoResponse,
  professionalInfoResponse2,
  mentalHealthResponse
};