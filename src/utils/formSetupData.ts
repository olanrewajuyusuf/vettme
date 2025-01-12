const personalInfoFields = [
    {id: 'piFullname', label: 'Full Name'},
    {id: 'piDateOfBirth', label: 'Date of Birth'},
    {id: 'piGender', label: 'Gender'},
    {id: 'piNationality', label: 'Nationality'},
    {id: 'piStreetName', label: 'Street Name'},
    {id: 'piState', label: 'State'},
    {id: 'piLGA', label: 'LGA'},
    {id: 'piCountry', label: 'Country'},
    {id: 'piPhoneNumber', label: 'Phone Number'},
    {id: 'piEmailAddress', label: 'Email Address'},
    {id: 'piBvn', label: 'BVN'},
    {id: 'piNationalIdentificationNumber', label: 'National Identification Number (NIN)'},
    {id: 'piMaritalStatus', label: 'Marital Status'},
    {id: 'piNextofKinName', label: 'Next of Kin Name'},
    {id: 'piNextofKinRelationship', label: 'Next of Kin Relationship'},
    {id: 'piNextofKinPhoneNumber', label: 'Next of Kin Phone Number'},
];

const guarantorInfoFields = [
    {id: 'giFullname', label: 'Full Name'},
    {id: 'giRelationshiptoPersonnel', label: 'Relationship to Personnel'},
    {id: 'giOccupation', label: 'Occupation'},
    {id: 'giPhoneNumber', label: 'Phone Number'},
    {id: 'giStreetName', label: 'Street Name'},
    {id: 'giLGA', label: 'LGA'},
    {id: 'giState', label: 'State'},
    {id: 'giCountry', label: 'Country'},
    {id: 'giEmailAddress', label: 'Email Address'},
    {id: 'giYearsKnown', label: 'Years Known'},
    {id: 'giNationalIdentificationNumber', label: 'National Identification Number (NIN)'},
];

const academicInfoFields = [
    {id: 'aiHighestQualification', label: 'Highest Qualification'},
    {id: 'aiNameofInstitution', label: 'Name of Institution'},
    {id: 'aiYearofGraduation', label: 'Year of Graduation'},
    {id: 'aiDegreeOrCertificationUpload', label: 'Degree Or Certification Upload'},
    {id: 'aiProfessionalCertifications', label: 'Professional Certifications'},
];

const professionalInfoFields = [
    {id: 'priCurrentJob', label: 'Current Job'},
    {id: 'priOrganizationName', label: 'Organization Name'},
    {id: 'priEmploymentStartDate', label: 'Employment Start Date'},
    {id: 'priEmploymentType', label: 'Employment Type'},
    {id: 'priJobResponsibility', label: 'Job Responsibility'},
    {id: 'priProfessionalSkills', label: 'Professional Skills'},
    {id: 'priLinkedInProfile', label: 'LinkedIn Profile'},
    {id: 'priProfessionalReferenceName', label: 'Professional Reference Name'},
    {id: 'priProfessionalReferencePhoneNumber', label: 'Professional Reference Phone Number'},
    {id: 'priCurrentSalary', label: 'Current Salary'},
    {id: 'priExpectedSalaryRange', label: 'Expected Salary Range'},
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