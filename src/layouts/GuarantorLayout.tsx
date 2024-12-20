import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const GuarantorLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
    
  )
}

export default GuarantorLayout;