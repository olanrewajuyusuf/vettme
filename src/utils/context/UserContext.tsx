import { createContext, ReactNode, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import Loader from "@/components/Loader";

interface UserContextType {
  company: {
    id: string;
    balance: number;
    companyId: string;
    companyName: string;
    email: string;
    createdAt: string;
    isActive: string;
    isVerified: string;
    phone_number: string;
    updatedAt: string;
  };
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: UserProviderProps) => {
  const companyId = useMemo(() => localStorage.getItem("companyId"), []);
  const token = useMemo(() => localStorage.getItem("token"), []);

  if (!companyId || !token) return <Navigate to="/auth/login" />;

  const { isLoading, data: company } = useFetchCompany(companyId);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("companyId");
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isLoading && !company) return <Navigate to="/auth/login" />;

  return (
    <UserContext.Provider value={{ company }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
