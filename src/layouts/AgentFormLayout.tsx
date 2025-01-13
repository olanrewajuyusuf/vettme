import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AgentFormLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
    
  )
}

export default AgentFormLayout;