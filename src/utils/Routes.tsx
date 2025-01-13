import Skeleton from "@/components/Skeleton";
import AuthLayout from "@/layouts/AuthLayout";
import BackOfficeLayout from "@/layouts/BackOfficeLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AddressLayout from "@/layouts/AddressLayout";
import GuarantorLayout from "@/layouts/GuarantorLayout";
import AgentFormLayout from "@/layouts/AgentFormLayout";
import Index from "@/pages/user/auth/Index";
import AppIndex from "@/pages/user/dashboard/Index";
import BackOfficeIndex from "@/pages/back-office";
import AddressIndex from "@/pages/address-verification";
import GuarantorIndex from "@/pages/guarantor-verification";
import AgentFormIndex from "@/pages/agent-form";

import { lazy, Suspense } from "react";
import { VideoProvider } from "./context/VideoContext";
const ConfirmMail = lazy(() => import("@/pages/user/auth/ConfirmMail"));
const Activate = lazy(() => import("@/pages/user/auth/Activate"));
const VerifyEmail = lazy(() => import("@/pages/user/auth/VerifyEmail"));
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
const Notification = lazy(
  () => import("@/pages/user/notification/Notification")
);
const Support = lazy(() => import("@/pages/user/support/Support"));
const Account = lazy(() => import("@/pages/user/account/Account"));
const Personnel = lazy(() => import("@/pages/user/personnel/Personnel"));
// const NewVerification = lazy(() => import("@/pages/user/new/NewVerification"));
// const Upload = lazy(() => import("@/pages/user/upload/Upload"));
const FormSetup = lazy(() => import("@/pages/user/setup/Form"));
const Forms = lazy(() => import("@/pages/user/forms/Forms"));

const BackOfficeDashboard = lazy(() => import("@/pages/back-office/dashboard/Dashboard"));
const VerificationInfo  = lazy(() => import("@/pages/back-office/dashboard/verification-batch/VerificationsBatch"));
const PersonnelInfo = lazy(() => import("@/pages/back-office/dashboard/personnel/Personnel"));
const EditPersonnelInfo = lazy(() => import("@/pages/back-office/dashboard/edit-personnel/EditPersonnelInfo"));
const AllAgents = lazy(() => import("@/pages/back-office/all-agents/AllAgents"));
const AllAddresses = lazy(() => import("@/pages/back-office/all-addresses/AllAddresses"));

const AddressVerification = lazy(() => import("@/pages/address-verification/Address"));
const PersonnelsList = lazy(() => import("@/pages/address-verification/PersonnelsList"));
const AddressVettForm = lazy(() => import("@/pages/address-verification/AddressVettForm"));
const VideoRecorder = lazy(() => import("@/pages/address-verification/VideoRecorder"));
const GuarantorForm  = lazy(() => import("@/pages/guarantor-verification/GuarantorForm"));
const AgentForm  = lazy(() => import("@/pages/agent-form/AgentForm"));

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
        path: "activate/:token",
        element: <Activate />,
      },
      {
        path: "verify-mail",
        element: <VerifyEmail />,
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
      <DashboardLayout>
        <AppIndex />
      </DashboardLayout>
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
        path: "support",
        element: <Support />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "verifications/:verification_id",
        element: <Verification />,
      },
      {
        path: "verifications/:verification_id/personnel/:personnel_id",
        element: <Personnel />,
      },
      {
        path: "verifications/new",
        element: <FormSetup />,
      },
      // {
      //   path: "verifications/new/upload",
      //   element: <Upload />,
      // },
      // {
      //   path: "verifications/new/form",
      //   element: <FormSetup />,
      // },
      // {
      //   path: "verifications/new/:type/setup",
      //   element: <FormSetup />,
      // },
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
        path: "/back-office/verification/:verification_id",
        element: <VerificationInfo />,
      },
      {
        path: "/back-office/verification/:verification_id/personnel/:personnel_id",
        element: <PersonnelInfo />,
      },
      {
        path: "all-addresses",
        element: <AllAddresses />,
      },
      {
        path: "all-agents",
        element: <AllAgents />,
      },
    ]
  },

  {
    path: "/back-office/verification/:verification_id/personnel/:personnel_id/edit",
    element: (
      <Suspense fallback={<Skeleton />}>
        <EditPersonnelInfo />
      </Suspense>
    ),
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
    path: "/guarantor-form",
    element: (
      <GuarantorLayout>
        <GuarantorIndex/>
      </GuarantorLayout>
    ),
    children: [
      {
        path: "",
        element: <GuarantorForm/>,
      },
      // {
      //   path: "personnelslist/address-form/:personnel_id",
      //   element: <AddressVettForm />,
      // },
    ]
  },

  {
    path: "/agent-form",
    element: (
      <AgentFormLayout>
        <AgentFormIndex/>
      </AgentFormLayout>
    ),
    children: [
      {
        path: "",
        element: <AgentForm/>,
      },
      // {
      //   path: "personnelslist/address-form/:personnel_id",
      //   element: <AddressVettForm />,
      // },
    ]
  },
];
