const personalInfoFields = [
    {id: 'piFullname', label: 'Full Name'},
    {id: 'piDateOfBirth', label: 'Date of Birth'},
    {id: 'piGender', label: 'Gender'},
    {id: 'piNationality', label: 'Nationality'},
    {id: 'piAddress', label: 'Address'},
    {id: 'piPhoneNumber', label: 'Phone Number'},
    {id: 'piEmailAddress', label: 'Email Address'},
    {id: 'piMaritalStatus', label: 'Marital Status'},
    {id: 'piNextofKinName', label: 'Next of Kin Name'},
    {id: 'piNextofKinRelationship', label: 'Next of Kin Relationship'},
    {id: 'piNextofKinPhoneNumber', label: 'Next of Kin Phone Number'},
    {id: 'piPhysicalAddressRequest', label: 'Request for physical Address verification'},
];

const guarantorInfoFields = [
    {id: 'giFullName', label: 'Full Name'},
    {id: 'giRelationshiptoPersonnel', label: 'Relationship to Personnel'},
    {id: 'giOccupation', label: 'Occupation'},
    {id: 'giPhoneNumber', label: 'Phone Number'},
    {id: 'giAddress', label: 'Address'},
    {id: 'giEmailAddress', label: 'Email Address'},
    {id: 'giYearsKnown', label: 'Years Known'},
    // {id: 'giNationalIdentificationNumber', label: 'National Identification Number (NIN)'},
    {id: 'giPhysicalAddressRequest', label: 'Request for physical Address verification'},
];

const academicInfoFields = [
    {id: 'aiHighestQualification', label: 'Highest Qualification'},
    {id: 'aiNameofInstitution', label: 'Name of Institution'},
    {id: 'aiYearofGraduation', label: 'Year of Graduation'},
    {id: 'aiDegreeOrCertificationUpload', label: 'Degree Or Certification Upload'},
    {id: 'aiProfessionalCertifications', label: 'Professional Certifications'},
];

const professionalInfoFields = [
    {id: 'priOrganizationName', label: 'Organization Name'},
    {id: 'priEmploymentStartDate', label: 'Employment Start Date'},
    {id: 'priEmploymentType', label: 'Employment Type'},
    {id: 'priProfessionalSkills', label: 'Professional Skills'},
    {id: 'priProfessionalReferenceName', label: 'Professional Reference Name'},
    {id: 'priOrganizationEmail', label: 'Organization Email'},
    {id: 'priProfessionalReferencePhoneNumber', label: 'Professional Reference Phone Number'},
];

const mentalHealthFields = [
    {id: 'mhaCurrentMentalHealthCondition', label: 'Current Mental Health Condition'},
    {id: 'mhaHistoryofMentalHealthConditions', label: 'History of Mental Health Conditions'},
    {id: 'mhaAreYouCurrentlyUnderAnyMedicationOrTreatment', label: 'Are you currently under any Medication or Treatment'},
    {id: 'mhaHaveYouHadAnyPreviousPsychiatricConsultations', label: 'Have you had any previous Psychiatric Consultations'},
    {id: 'mhaHaveYouExperiencedAnyMajorTraumaInThePastYear', label: 'Have you experienced any major trauma in the past Year'},
    {id: 'mhaEmotionalWellbeing', label: 'Emotional Wellbeing'},
];

export {personalInfoFields, guarantorInfoFields, academicInfoFields, professionalInfoFields, mentalHealthFields};