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
import { useNotification } from "@/utils/context/useNotification";

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
                <span className="w-[40px] h-[40px] rounded-full grid place-items-center text-white border-[1px] bg-blue-400">
                  {company?.companyName.slice(0, 2).toUpperCase()}
                </span>
                <hr className="h-7 w-[1px] bg-stroke-clr" />
                <p className="font-medium">User: <span className="text-blue-400">{company?.companyName}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <div className="border-[1px] border-blue-400 rounded-md h-7 flex items-center overflow-hidden">
                <span className="text-blue-400 px-3">Balance</span>
                <span className="bg-blue-400 text-white px-3 h-full flex items-center font-bold">{company?.balance.toFixed(2)}</span>
              </div>
              <div className="relative">
                <IoMdNotificationsOutline className="text-3xl"/>
                {(unreadCount !== 0) && <div 
                className="absolute top-0 -right-1 w-4 h-4 bg-destructive rounded-full text-white grid place-items-center text-xs font-bold"
                >
                {unreadCount}
                </div>}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
                <p>Company ID</p>
                <hr className="h-7 w-[1px] bg-stroke-clr" />
                <p className="font-medium text-blue-400">{company?.companyId}</p>
            </div>
          </div>)}
          <div className="w-full overflow-y-scroll p-[30px]">{children}</div>
        </div>
      </div>
    </>
  );
}
