import Skeleton from "@/components/Skeleton";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function BackOfficeIndex() {
  const token = localStorage.getItem("adminToken");

  return token ? (
    <Suspense
      fallback={
        <div className="w-full min-h-[500px] h-full flex items-center justify-center">
          <Skeleton />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/auth/back-office/login" />
  );
}

