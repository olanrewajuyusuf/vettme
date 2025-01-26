import Skeleton from "@/components/Skeleton";
import { Suspense, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AppIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");

    if (!token || !companyId) {
      navigate("/auth/login");
      return;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const tokenExpiry = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(tokenExpiry, currentTime);
      console.log(tokenExpiry - currentTime);

      if (companyId && (currentTime > tokenExpiry) ) {
        console.log("Token Expired");
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/auth/login");
    }
  }, [navigate]);
  
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[500px] h-full flex items-center justify-center">
          <Skeleton />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  )
}
