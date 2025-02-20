import images from "@/assets/Images";
import ScreenNotice from "@/components/ScreenNotice";
import { IoMdNotificationsOutline } from "react-icons/io"
import { NavSkeleton } from "@/components/SkeletonUi";
import { useUser } from "@/utils/context/useUser";
import {
  AvatarIcon,
  CardStackIcon,
  ChatBubbleIcon,
  DashboardIcon,
  ReaderIcon,
  SpeakerModerateIcon,
} from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useNotification } from "@/utils/context/useNotification";
import { FaPlusCircle } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import { IoMedal } from "react-icons/io5";

interface LayoutProps {
  children: ReactNode;
}
const navLinks = [
  {
    path: "/",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/verifications",
    title: "Verifications",
    icon: <ReaderIcon />,
  },
  {
    path: "/wallet",
    title: "Wallet",
    icon: <CardStackIcon />,
  },
  {
    path: "/notifications",
    title: "Notifications",
    icon: <SpeakerModerateIcon />,
  },
  {
    path: "/support",
    title: "Support",
    icon: <ChatBubbleIcon />,
  },
  {
    path: "/account",
    title: "Account",
    icon: <AvatarIcon />,
  },
];
export default function DashboardLayout({ children }: LayoutProps) {
  const { company } = useUser();
  const { unreadCount } = useNotification();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('companyId');
    localStorage.removeItem('token');
    navigate('/auth/login')
  }

  return (
    <>
      <div className="small-screen-notice">
        <ScreenNotice />
      </div>
      <div className="flex h-screen overflow-hidden">
        <div className="w-[250px] border-r-[1px] border-stroke-clr bg-white h-full">
          <div className="h-[70px] flex items-center justify-center border-b-[1px] border-stroke-clr">
            <img src={images.logo} alt="Vettme" className="h-8" />
          </div>

          <div className="px-5 h-[calc(100%-70px)] flex flex-col justify-between">
            <div className="mt-10">
            {navLinks.map((link, idx) => (
              <NavLink
                to={link.path}
                key={idx}
                className="nav-link flex items-center gap-3 mb-2 px-5 py-3 rounded-lg"
              >
                <span className="flex nav-icon">{link.icon}</span>
                <p className="text-sm">{link.title}</p>
              </NavLink>
            ))}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 mb-3 px-5 py-4 rounded-lg text-destructive logout_btn"
            >
              <span><RiLogoutCircleLine /></span>
              <p className="text-sm">Log out</p>
            </button>
          </div>
        </div>

        <div className="flex-1 h-screen overflow-y-scroll">
          {!company && <NavSkeleton/>}
          {company && (
            <div className="w-full bg-white h-[70px] flex items-center justify-between px-[30px] border-b-[1px] border-stroke-clr">
            <div className="flex items-center justify-end gap-2">
                <h1 className="font-light">Hi, {company?.companyName}</h1>
            </div>
            <div className="flex items-center justify-end gap-2 bg-stroke-clr px-5 py-1 rounded-full">
                <HiIdentification />
                <hr className="h-3 w-[1px] bg-white" />
                <p className="font-medium text-blue-500">{company?.companyId}</p>
                <IoMedal className="text-orange-500"/>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-green-600 rounded-full px-2 py-4 h-7 flex items-center overflow-hidden">
                <span className="text-white text-xl"><MdAccountBalanceWallet /></span>
                <span className="text-white mx-2">{company?.balance.toLocaleString()}</span>
                <FaPlusCircle className="text-white text-xl ml-2"/>
              </div>
              <div className="relative">
                <IoMdNotificationsOutline className="text-3xl"/>
                {(unreadCount !== 0) && <div 
                className="absolute top-0 -right-1 w-4 h-4 bg-destructive rounded-full text-white grid place-items-center text-xs font-bold"
                >
                {unreadCount}
                </div>}
              </div>
              <span className="w-[40px] h-[40px] ml-2 rounded-full grid place-items-center text-white border-[1px] bg-blue-400">
                  {company?.companyName.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>)}
          <div className="w-full overflow-y-scroll p-[30px]">{children}</div>
        </div>
      </div>
    </>
  );
}
