import Skeleton from "@/components/Skeleton";
import AuthLayout from "@/layouts/AuthLayout";
import BackOfficeLayout from "@/layouts/BackOfficeLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AddressLayout from "@/layouts/AddressLayout";
import Index from "@/pages/user/auth/Index";
import AppIndex from "@/pages/user/dashboard/Index";
import BackOfficeIndex from "@/pages/back-office";
import AddressIndex from "@/pages/address-verification";

import { lazy, Suspense } from "react";
import { VideoProvider } from "./context/VideoContext";
import AllChats from "@/pages/back-office/all-chats/AllChats";
import SupportAdmin from "@/pages/back-office/support/SupportAdmin";
import UserProvider from "./context/UserProvider";
import { NotificationProvider } from "./context/NotificationContext";

const ConfirmMail = lazy(() => import("@/pages/user/auth/ConfirmMail"));
const Activate = lazy(() => import("@/pages/user/auth/Activate"));
const VerifyEmail = lazy(() => import("@/pages/user/auth/VerifyEmail"));
const EmailVerified = lazy(() => import("@/pages/user/auth/EmailVerified"));
const ForgotPassword = lazy(() => import("@/pages/user/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/user/auth/ResetPassword"));
const Login = lazy(() => import("@/pages/user/auth/Login"));
const Register = lazy(() => import("@/pages/user/auth/Register"));
const Dashboard = lazy(() => import("@/pages/user/dashboard/Dashboard"));
const Verifications = lazy(
  () => import("@/pages/user/verification/Verifications")
);
const Verification = lazy(
  () => import("@/pages/user/verification/Verification")
);
const Wallet = lazy(() => import("@/pages/user/wallet/Wallet"));
const Notification = lazy(() => import("@/pages/user/notification/Notification"));
const NotificationDetail = lazy(() => import("@/pages/user/notification/NotificationDetails"));
const Support = lazy(() => import("@/pages/user/support/Support"));
const Account = lazy(() => import("@/pages/user/account/Account"));
const Personnel = lazy(() => import("@/pages/user/personnel/Personnel"));
const FormSetup = lazy(() => import("@/pages/user/setup/Form"));
const Forms = lazy(() => import("@/pages/user/forms/Forms"));

const BackOfficeDashboard = lazy(() => import("@/pages/back-office/dashboard/Dashboard"));
const Batches  = lazy(() => import("@/pages/back-office/dashboard/verification-batch/Batches"));
const VerificationsBatch  = lazy(() => import("@/pages/back-office/dashboard/verification-batch/VerificationsBatch"));
// import VerificationsBatch from "@/pages/back-office/dashboard/verification-batch/VerificationsBatch";
const PersonnelInfo = lazy(() => import("@/pages/back-office/dashboard/personnel/Personnel"));
const EditPersonnelInfo = lazy(() => import("@/pages/back-office/dashboard/edit-personnel/EditPersonnelInfo"));
const AllAgents = lazy(() => import("@/pages/back-office/all-agents/AllAgents"));
const AgentInfo = lazy(() => import("@/pages/back-office/all-agents/AgentInfo"));
const AllAddresses = lazy(() => import("@/pages/back-office/all-addresses/AllAddresses"));
const AddressDetail = lazy(() => import("@/pages/back-office/all-addresses/AddressDetail"));
const AdminLoginPage = lazy(() => import("@/pages/back-office/auth/AdminLoginPage"));

const AddressVerification = lazy(() => import("@/pages/address-verification/Address"));
const PersonnelsList = lazy(() => import("@/pages/address-verification/PersonnelsList"));
const AddressVettForm = lazy(() => import("@/pages/address-verification/AddressVettForm"));
const VideoRecorder = lazy(() => import("@/pages/address-verification/VideoRecorder"));
const GuarantorForm  = lazy(() => import("@/pages/forms/GuarantorForm"));
const AgentForm  = lazy(() => import("@/pages/forms/AgentForm"));
const ProfessionalInfo  = lazy(() => import("@/pages/forms/ProfessionalInfoForm"));
const LiveCameraCapture  = lazy(() => import("@/pages/forms/components/LivenessCheck"));

export const routes = [
  {
    path: "/auth",
    element: (
      <AuthLayout>
        <Index />
      </AuthLayout>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "confirm-mail",
        element: <ConfirmMail />,
      },
      {
        path: "verify-email/:id",
        element: <VerifyEmail />,
      },
      {
        path: "email-success",
        element: <EmailVerified />,
      },
      {
        path: "activate/:token",
        element: <Activate />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <UserProvider>
        <NotificationProvider>
        <DashboardLayout>
          <AppIndex />
        </DashboardLayout>
        </NotificationProvider>
      </UserProvider>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "verifications",
        element: <Verifications />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "notifications",
        element: <Notification />,
      },
      {
        path: "notifications/:id",
        element: <NotificationDetail />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "verifications/:id",
        element: <Verification />,
      },
      {
        path: "verifications/:verification_id/personnel-info/:personnel_id",
        element: <Personnel />,
      },
      {
        path: "verifications/new",
        element: <FormSetup />,
      },
    ],
  },

  {
    path: "/forms/:form_id",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Forms />
      </Suspense>
    ),
  },

  {
    path: "auth/back-office/login",
    element: <AdminLoginPage />,
  },

  {
    path: "/back-office",
    element: (
      <BackOfficeLayout>
        <BackOfficeIndex/>
      </BackOfficeLayout>
    ),
    children: [
      {
        path: "",
        element: <BackOfficeDashboard/>,
      },
      {
        path: "/back-office/verification-batch/:id",
        element: <Batches />,
      },
      {
        path: "/back-office/verification-batch/:id/personnels/:verification_id",
        element: <VerificationsBatch />,
      },
      {
        path: "/back-office/verification-batch/:id/personnels/:verification_id/personnel-info/:id",
        element: <PersonnelInfo />,
      },
      {
        path: "all-addresses",
        element: <AllAddresses />,
      },
      {
        path: "all-addresses/address-detail/:id",
        element: <AddressDetail />,
      },
      {
        path: "all-agents",
        element: <AllAgents />,
      },
      {
        path: "all-chats",
        element: <AllChats />
      },
      {
        path: "all-chats/:companyId",
        element: <SupportAdmin />
      },
      {
        path: "all-agents/agent-info/:id",
        element: <AgentInfo />,
      },
      {
        path: "/back-office/verification-batch/:id/personnels/:verification_id/personnel-info/:id/edit/:id",
        element: <EditPersonnelInfo  />,
      },
    ]
  },

  {
    path: "/address-verification",
    element: (
      <VideoProvider>
        <AddressLayout>
          <AddressIndex/>
        </AddressLayout>
      </VideoProvider>
    ),
    children: [
      {
        path: "",
        element: <AddressVerification/>,
      },
      {
        path: "personnelslist",
        element: <PersonnelsList />,
      },
      {
        path: "personnelslist/address-form/:personnel_id",
        element: <AddressVettForm />,
      },
      {
        path: "personnelslist/address-form/:personnel_id/video-recorder",
        element: <VideoRecorder />,
      },
    ]
  },

  {
    path: "/guarantor-form/:personnelName/:verificationType/:id/:guarantorId",
    element: <GuarantorForm/>,
  },
  {
    path: "/guarantor-form/:personnelName/:verificatonType/:id/:guarantorId/liveness-check",
    element: <LiveCameraCapture />,
  },
  {
    path: "/agent-form",
    element: <AgentForm/>,
  },
  {
    path: "/professional-info-form/:id/:personnelName/:organizationId",
    element: <ProfessionalInfo/>,
  },
];
