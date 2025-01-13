import images from "@/assets/Images";
import ScreenNotice from "@/components/ScreenNotice";
import {
  AvatarIcon,
  // CardStackIcon,
  ChatBubbleIcon,
  DashboardIcon,
  ReaderIcon,
  // SpeakerModerateIcon,
} from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}
const navLinks = [
  {
    path: "/back-office",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/back-office/all-addresses",
    title: "All Address",
    icon: <ReaderIcon />,
  },
  {
    path: "/back-office/all-agents",
    title: "All Agent",
    icon: <AvatarIcon />,
  },
  {
    path: "/guarantor-form",
    title: "Guarantor Form",
    icon: <ChatBubbleIcon />,
  },
];

export default function DashboardLayout({ children }: LayoutProps) {
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
          <div className="w-full bg-white h-[70px] flex items-center px-[30px] gap-4 border-b-[1px] border-stroke-clr">
            <span className="w-[40px] h-[40px] rounded-full aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </span>
            <p className="font-medium">Hi, John Doe</p>
          </div>
          <div className="w-full overflow-y-scroll p-[30px]">{children}</div>
        </div>
      </div>
    </>
  );
}
