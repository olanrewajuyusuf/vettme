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
import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFetchNotifications } from "@/hooks/company";

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
  const [length, setLength] = useState<number | null>(0);
  const { company } = useUser();
  const {fetchNotifications} = useFetchNotifications();

  useEffect(() => {
      const getNotifications = async () => {
        try {
          const data = await fetchNotifications();
          const len = data.data.filter((item: any)=> !item.read)
          setLength(len.length);
        } catch (error) {
          console.error("Failed to fetch Notification:", error);
        }
      };
      getNotifications();
  }, [fetchNotifications]);  

  return (
    <>
      <div className="small-screen-notice">
        <ScreenNotice />
      </div>
      <div className="flex h-screen overflow-hidden">
        <div className="w-[250px] border-r-[1px] border-stroke-clr bg-white h-full">
          <div className="h-[70px] flex items-center justify-center mb-12 border-b-[1px] border-stroke-clr">
            <img src={images.logo} alt="Vettme" className="h-8" />
          </div>

          <div className="px-5">
            {navLinks.map((link, idx) => (
              <NavLink
                to={link.path}
                key={idx}
                className="nav-link flex items-center gap-3 mb-3 px-5 py-4 rounded-lg"
              >
                <span className="flex nav-icon">{link.icon}</span>
                <p className="text-sm">{link.title}</p>
              </NavLink>
            ))}
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
                {(length === null || length > 0) && <div 
                className="absolute top-0 -right-1 w-4 h-4 bg-destructive rounded-full text-white grid place-items-center text-xs font-bold"
                >
                {length}
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
