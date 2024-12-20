const cardsData = [
    {
      title: "Verifications Initiated",
      qty: "43,206",
      bg: 1,
    },
    {
      title: "Successful Initiated",
      qty: "21,200",
      bg: 2,
    },
    {
      title: "Failed Verifications",
      qty: "3,320",
      bg: 3,
    },
];

const verificationsData = [
    {
      id: "1",
      title: "Spytrac Recruitment",
      personnels: "28",
      status: "completed",
      date: "23/01/2024 09:12 AM",
      type: "PRO",
    },
    {
      id: "2",
      title: "Techify Solutions",
      personnels: "32",
      status: "pending",
      date: "02/02/2024 11:34 AM",
      type: "PREMIUM",
    },
    {
      id: "3",
      title: "HealthCare Plus Recruitment",
      personnels: "40",
      status: "in-progress",
      date: "15/02/2024 03:14 PM",
      type: "PRO",
    },
    {
      id: "4",
      title: "Logistix Delivery",
      personnels: "15",
      status: "failed",
      date: "22/02/2024 10:05 AM",
      type: "PREMIUM",
    },
    {
      id: "5",
      title: "Global Tech Recruitments",
      personnels: "50",
      status: "completed",
      date: "01/03/2024 08:22 AM",
      type: "PRO",
    },
    {
      id: "6",
      title: "EduCorp Hiring",
      personnels: "25",
      status: "pending",
      date: "12/03/2024 12:45 PM",
      type: "PREMIUM",
    },
    {
      id: "7",
      title: "AutoHire Solutions",
      personnels: "10",
      status: "in-progress",
      date: "18/03/2024 01:56 PM",
      type: "PRO",
    },
    {
      id: "8",
      title: "MediSafe Staffing",
      personnels: "22",
      status: "completed",
      date: "25/03/2024 09:30 AM",
      type: "PREMIUM",
    },
    {
      id: "9",
      title: "QuickJobs Africa",
      personnels: "60",
      status: "in-progress",
      date: "01/04/2024 02:20 PM",
      type: "PRO",
    },
    {
      id: "10",
      title: "DataSoft Hiring",
      personnels: "35",
      status: "pending",
      date: "05/04/2024 10:00 AM",
      type: "PREMIUM",
    },
];

const headers = [
  {
    title: "Status",
    text: "In Progress",
  },
  {
    title: "No of Personnel",
    text: "28",
  },
  {
    title: "Completion Date",
    text: "22/02/2024",
  },
  {
    title: "Completion",
    text: "60% Completed",
  },
];

const personnelsData = [
  {
    batch_id: "1",
    data: [
      {
        name: "John Doe Connor",
        position: "Executive Director",
        date: "28/05/2024 05:23PM",
        status: "verified",
      },
      {
        name: "Mary Johnson",
        position: "Operations Manager",
        date: "01/06/2024 10:45AM",
        status: "pending",
      },
      {
        name: "Michael Smith",
        position: "HR Specialist",
        date: "03/06/2024 09:12AM",
        status: "in-progress",
      },
      {
        name: "Sarah Williams",
        position: "Finance Analyst",
        date: "05/06/2024 02:30PM",
        status: "verified",
      },
      {
        name: "David Brown",
        position: "Marketing Coordinator",
        date: "07/06/2024 11:25AM",
        status: "failed",
      },
      {
        name: "Jessica Taylor",
        position: "Legal Advisor",
        date: "09/06/2024 03:14PM",
        status: "pending",
      },
      {
        name: "James Anderson",
        position: "IT Support",
        date: "11/06/2024 04:10PM",
        status: "verified",
      },
      {
        name: "Emily Martinez",
        position: "Executive Assistant",
        date: "15/06/2024 12:45PM",
        status: "in-progress",
      },
      {
        name: "Robert Thompson",
        position: "Business Development Manager",
        date: "18/06/2024 09:35AM",
        status: "failed",
      },
      {
        name: "Elizabeth Garcia",
        position: "Project Manager",
        date: "22/06/2024 05:05PM",
        status: "pending",
      },
    ],
  },
  {
    batch_id: "2",
    data: [
      {
        name: "Steven Rodriguez",
        position: "Product Designer",
        date: "24/06/2024 01:15PM",
        status: "verified",
      },
      {
        name: "Patricia Davis",
        position: "Quality Assurance Analyst",
        date: "26/06/2024 03:50PM",
        status: "in-progress",
      },
      {
        name: "Christopher Wilson",
        position: "Software Developer",
        date: "28/06/2024 11:20AM",
        status: "verified",
      },
      {
        name: "Linda Lee",
        position: "Customer Service Rep",
        date: "01/07/2024 08:15AM",
        status: "pending",
      },
      {
        name: "Anthony Walker",
        position: "Research Analyst",
        date: "03/07/2024 02:40PM",
        status: "failed",
      },
      {
        name: "Susan Harris",
        position: "Communications Officer",
        date: "05/07/2024 10:35AM",
        status: "in-progress",
      },
      {
        name: "Daniel Wright",
        position: "Procurement Officer",
        date: "07/07/2024 12:10PM",
        status: "verified",
      },
      {
        name: "Nancy White",
        position: "Supply Chain Manager",
        date: "10/07/2024 09:45AM",
        status: "pending",
      },
      {
        name: "Charles Allen",
        position: "Network Engineer",
        date: "12/07/2024 03:30PM",
        status: "failed",
      },
      {
        name: "Karen Young",
        position: "Sales Executive",
        date: "15/07/2024 11:50AM",
        status: "in-progress",
      },
    ],
  },
  {
    batch_id: "3",
    data: [
      {
        name: "George Adams",
        position: "Creative Director",
        date: "16/07/2024 09:30AM",
        status: "verified",
      },
      {
        name: "Barbara Thomas",
        position: "Public Relations Officer",
        date: "18/07/2024 01:20PM",
        status: "pending",
      },
      {
        name: "Richard Miller",
        position: "Database Administrator",
        date: "20/07/2024 11:45AM",
        status: "failed",
      },
      {
        name: "Martha Clark",
        position: "Chief Financial Officer",
        date: "22/07/2024 04:10PM",
        status: "in-progress",
      },
      {
        name: "Scott Edwards",
        position: "Data Scientist",
        date: "25/07/2024 10:05AM",
        status: "verified",
      },
      {
        name: "Angela Moore",
        position: "Chief Technology Officer",
        date: "27/07/2024 03:25PM",
        status: "pending",
      },
      {
        name: "Mark Jenkins",
        position: "Cybersecurity Analyst",
        date: "29/07/2024 02:30PM",
        status: "failed",
      },
      {
        name: "Rebecca Scott",
        position: "Executive Assistant",
        date: "31/07/2024 06:10PM",
        status: "in-progress",
      },
      {
        name: "Paul Wright",
        position: "Training Manager",
        date: "02/08/2024 12:25PM",
        status: "verified",
      },
      {
        name: "Amanda Walker",
        position: "Business Analyst",
        date: "05/08/2024 09:55AM",
        status: "pending",
      },
    ],
  },
  {
    batch_id: "4",
    data: [
      {
        name: "Kevin Carter",
        position: "DevOps Engineer",
        date: "08/08/2024 01:20PM",
        status: "failed",
      },
      {
        name: "Laura James",
        position: "Operations Coordinator",
        date: "11/08/2024 03:40PM",
        status: "in-progress",
      },
      {
        name: "Donna Perez",
        position: "UI/UX Designer",
        date: "14/08/2024 08:30AM",
        status: "verified",
      },
      {
        name: "Timothy Nelson",
        position: "Social Media Specialist",
        date: "17/08/2024 04:10PM",
        status: "pending",
      },
      {
        name: "Cynthia Mitchell",
        position: "Event Coordinator",
        date: "20/08/2024 11:15AM",
        status: "failed",
      },
      {
        name: "Brandon Hall",
        position: "Technical Writer",
        date: "23/08/2024 01:55PM",
        status: "in-progress",
      },
      {
        name: "Melissa Lee",
        position: "Financial Advisor",
        date: "26/08/2024 02:30PM",
        status: "verified",
      },
      {
        name: "Kyle White",
        position: "Content Creator",
        date: "29/08/2024 10:10AM",
        status: "pending",
      },
      {
        name: "Jason Turner",
        position: "Systems Engineer",
        date: "31/08/2024 09:40AM",
        status: "failed",
      },
      {
        name: "Lisa Green",
        position: "HR Manager",
        date: "02/09/2024 05:00PM",
        status: "in-progress",
      },
    ],
  },
  {
    batch_id: "5",
    data: [
      {
        name: "John Doe Connor",
        position: "Executive Director",
        date: "28/05/2024 05:23PM",
        status: "verified",
      },
      {
        name: "Mary Johnson",
        position: "Operations Manager",
        date: "01/06/2024 10:45AM",
        status: "pending",
      },
      {
        name: "Michael Smith",
        position: "HR Specialist",
        date: "03/06/2024 09:12AM",
        status: "in-progress",
      },
      {
        name: "Sarah Williams",
        position: "Finance Analyst",
        date: "05/06/2024 02:30PM",
        status: "verified",
      },
      {
        name: "David Brown",
        position: "Marketing Coordinator",
        date: "07/06/2024 11:25AM",
        status: "failed",
      },
      {
        name: "Jessica Taylor",
        position: "Legal Advisor",
        date: "09/06/2024 03:14PM",
        status: "pending",
      },
      {
        name: "James Anderson",
        position: "IT Support",
        date: "11/06/2024 04:10PM",
        status: "verified",
      },
      {
        name: "Emily Martinez",
        position: "Executive Assistant",
        date: "15/06/2024 12:45PM",
        status: "in-progress",
      },
      {
        name: "Robert Thompson",
        position: "Business Development Manager",
        date: "18/06/2024 09:35AM",
        status: "failed",
      },
      {
        name: "Elizabeth Garcia",
        position: "Project Manager",
        date: "22/06/2024 05:05PM",
        status: "pending",
      },
    ],
  },
  {
    batch_id: "6",
    data: [
      {
        name: "Steven Rodriguez",
        position: "Product Designer",
        date: "24/06/2024 01:15PM",
        status: "verified",
      },
      {
        name: "Patricia Davis",
        position: "Quality Assurance Analyst",
        date: "26/06/2024 03:50PM",
        status: "in-progress",
      },
      {
        name: "Christopher Wilson",
        position: "Software Developer",
        date: "28/06/2024 11:20AM",
        status: "verified",
      },
      {
        name: "Linda Lee",
        position: "Customer Service Rep",
        date: "01/07/2024 08:15AM",
        status: "pending",
      },
      {
        name: "Anthony Walker",
        position: "Research Analyst",
        date: "03/07/2024 02:40PM",
        status: "failed",
      },
      {
        name: "Susan Harris",
        position: "Communications Officer",
        date: "05/07/2024 10:35AM",
        status: "in-progress",
      },
      {
        name: "Daniel Wright",
        position: "Procurement Officer",
        date: "07/07/2024 12:10PM",
        status: "verified",
      },
      {
        name: "Nancy White",
        position: "Supply Chain Manager",
        date: "10/07/2024 09:45AM",
        status: "pending",
      },
      {
        name: "Charles Allen",
        position: "Network Engineer",
        date: "12/07/2024 03:30PM",
        status: "failed",
      },
      {
        name: "Karen Young",
        position: "Sales Executive",
        date: "15/07/2024 11:50AM",
        status: "in-progress",
      },
    ],
  },
  {
    batch_id: "7",
    data: [
      {
        name: "George Adams",
        position: "Creative Director",
        date: "16/07/2024 09:30AM",
        status: "verified",
      },
      {
        name: "Barbara Thomas",
        position: "Public Relations Officer",
        date: "18/07/2024 01:20PM",
        status: "pending",
      },
      {
        name: "Richard Miller",
        position: "Database Administrator",
        date: "20/07/2024 11:45AM",
        status: "failed",
      },
      {
        name: "Martha Clark",
        position: "Chief Financial Officer",
        date: "22/07/2024 04:10PM",
        status: "in-progress",
      },
      {
        name: "Scott Edwards",
        position: "Data Scientist",
        date: "25/07/2024 10:05AM",
        status: "verified",
      },
      {
        name: "Angela Moore",
        position: "Chief Technology Officer",
        date: "27/07/2024 03:25PM",
        status: "pending",
      },
      {
        name: "Mark Jenkins",
        position: "Cybersecurity Analyst",
        date: "29/07/2024 02:30PM",
        status: "failed",
      },
      {
        name: "Rebecca Scott",
        position: "Executive Assistant",
        date: "31/07/2024 06:10PM",
        status: "in-progress",
      },
      {
        name: "Paul Wright",
        position: "Training Manager",
        date: "02/08/2024 12:25PM",
        status: "verified",
      },
      {
        name: "Amanda Walker",
        position: "Business Analyst",
        date: "05/08/2024 09:55AM",
        status: "pending",
      },
    ],
  },
  {
    batch_id: "8",
    data: [
      {
        name: "Kevin Carter",
        position: "DevOps Engineer",
        date: "08/08/2024 01:20PM",
        status: "failed",
      },
      {
        name: "Laura James",
        position: "Operations Coordinator",
        date: "11/08/2024 03:40PM",
        status: "in-progress",
      },
      {
        name: "Donna Perez",
        position: "UI/UX Designer",
        date: "14/08/2024 08:30AM",
        status: "verified",
      },
      {
        name: "Timothy Nelson",
        position: "Social Media Specialist",
        date: "17/08/2024 04:10PM",
        status: "pending",
      },
      {
        name: "Cynthia Mitchell",
        position: "Event Coordinator",
        date: "20/08/2024 11:15AM",
        status: "failed",
      },
      {
        name: "Brandon Hall",
        position: "Technical Writer",
        date: "23/08/2024 01:55PM",
        status: "in-progress",
      },
      {
        name: "Melissa Lee",
        position: "Financial Advisor",
        date: "26/08/2024 02:30PM",
        status: "verified",
      },
      {
        name: "Kyle White",
        position: "Content Creator",
        date: "29/08/2024 10:10AM",
        status: "pending",
      },
      {
        name: "Jason Turner",
        position: "Systems Engineer",
        date: "31/08/2024 09:40AM",
        status: "failed",
      },
      {
        name: "Lisa Green",
        position: "HR Manager",
        date: "02/09/2024 05:00PM",
        status: "in-progress",
      },
    ],
  },
  {
    batch_id: "9",
    data: [
      {
        name: "John Doe Connor",
        position: "Executive Director",
        date: "28/05/2024 05:23PM",
        status: "verified",
      },
      {
        name: "Mary Johnson",
        position: "Operations Manager",
        date: "01/06/2024 10:45AM",
        status: "pending",
      },
      {
        name: "Michael Smith",
        position: "HR Specialist",
        date: "03/06/2024 09:12AM",
        status: "in-progress",
      },
      {
        name: "Sarah Williams",
        position: "Finance Analyst",
        date: "05/06/2024 02:30PM",
        status: "verified",
      },
      {
        name: "David Brown",
        position: "Marketing Coordinator",
        date: "07/06/2024 11:25AM",
        status: "failed",
      },
      {
        name: "Jessica Taylor",
        position: "Legal Advisor",
        date: "09/06/2024 03:14PM",
        status: "pending",
      },
      {
        name: "James Anderson",
        position: "IT Support",
        date: "11/06/2024 04:10PM",
        status: "verified",
      },
      {
        name: "Emily Martinez",
        position: "Executive Assistant",
        date: "15/06/2024 12:45PM",
        status: "in-progress",
      },
      {
        name: "Robert Thompson",
        position: "Business Development Manager",
        date: "18/06/2024 09:35AM",
        status: "failed",
      },
      {
        name: "Elizabeth Garcia",
        position: "Project Manager",
        date: "22/06/2024 05:05PM",
        status: "pending",
      },
    ],
  },
  {
    batch_id: "10",
    data: [
      {
        name: "Steven Rodriguez",
        position: "Product Designer",
        date: "24/06/2024 01:15PM",
        status: "verified",
      },
      {
        name: "Patricia Davis",
        position: "Quality Assurance Analyst",
        date: "26/06/2024 03:50PM",
        status: "in-progress",
      },
      {
        name: "Christopher Wilson",
        position: "Software Developer",
        date: "28/06/2024 11:20AM",
        status: "verified",
      },
      {
        name: "Linda Lee",
        position: "Customer Service Rep",
        date: "01/07/2024 08:15AM",
        status: "pending",
      },
      {
        name: "Anthony Walker",
        position: "Research Analyst",
        date: "03/07/2024 02:40PM",
        status: "failed",
      },
      {
        name: "Susan Harris",
        position: "Communications Officer",
        date: "05/07/2024 10:35AM",
        status: "in-progress",
      },
      {
        name: "Daniel Wright",
        position: "Procurement Officer",
        date: "07/07/2024 12:10PM",
        status: "verified",
      },
      {
        name: "Nancy White",
        position: "Supply Chain Manager",
        date: "10/07/2024 09:45AM",
        status: "pending",
      },
      {
        name: "Charles Allen",
        position: "Network Engineer",
        date: "12/07/2024 03:30PM",
        status: "failed",
      },
      {
        name: "Karen Young",
        position: "Sales Executive",
        date: "15/07/2024 11:50AM",
        status: "in-progress",
      },
    ],
  },
];

const personnelInfo = [
  {
    data: "Full Name",
    claim: "Christian Oliver Parker",
    finding: "Christian Oliver Parker",
    verdict: "correct",
  },
  {
    data: "Date Of Birth",
    claim: "23rd of January, 1986",
    finding: "23rd of January, 1986",
    verdict: "correct",
  },
  {
    data: "Nationality",
    claim: "Nigerian",
    finding: "Nigerian",
    verdict: "correct",
  },
  {
    data: "State of Origin",
    claim: "ogun",
    finding: "ogun",
    verdict: "correct",
  },
  {
    data: "Residential Address",
    claim: "1234, Somewhere street, Some Avenue",
    finding: "1234, A different somewhere street, Another Avenue",
    verdict: "incorrect",
  },
];

const personnelsInfo = [
  {
      id: '1',
      name: 'Johnson Michael',
      Address: "Block 9a, Shokunbi street off Berger, Lagos"
  },
  {
      id: '2',
      name: 'Oladokun Olaoluwa',
      Address: "No. 19, Jakande street Agege, Benue"
  },
  {
      id: '3',
      name: 'Adenekan Samuel',
      Address: "No. 201, Albert Nkuku str. off Berger, Lagos"
  },
  {
      id: '4',
      name: 'Banks Evans',
      Address: "Block 144b, Allen Road, Jawonson str., Ikeje, Anambra"
  },
  {
      id: '5',
      name: 'Peter Nwanneri',
      Address: "Block 9a, Shokunbi street off Berger, Lagos"
  }
]

const tabs = [
  "Personal Information",
  "Guarantor's Information",
  "Academic Information",
  "Professional Information",
  "Mental Assessment Information",
];

export { cardsData, verificationsData, headers, personnelsData, personnelInfo, personnelsInfo, tabs };