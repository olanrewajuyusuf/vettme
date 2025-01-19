import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/api/baseUrl";
import { useCallback } from "react";

export const useFetchCompany = () => {
    const fetchCompany = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(`${baseUrl}/company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Company info fetched successfully");
      return res.data;
    } catch (error: any) {
      console.error("Error fetching company info:", error);
      toast.error(error?.response?.data?.message || "Cannot get company info");
      throw new Error(error?.response?.data?.message || "Cannot get company info");
    }
  }, []);
  return { fetchCompany };
};

export const useActivateCompany = () => {
    const activateCompany = useCallback(
      async (
        data: any,
        // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        // setIsLoading(true);
        try {
          const token = localStorage.getItem("adminToken");
  
          if (!token) {
            throw new Error("Authentication token is missing");
          }

          const res = await axios.put(
            `${baseUrl}/auth/activate-account`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("Company is now active");
          return res.data;
        } catch (error: any) {
          console.error("Error activating company:", error);
          toast.error(
            error?.response?.data?.message || "Cannot activate company"
          );
          throw new Error(
            error?.response?.data?.message || "Cannot activate company"
          );
        }
      },[] 
    );
    return { activateCompany };
};


// import { axiosInstance } from "@/api/axiosConfig";
// import { useQuery } from "@tanstack/react-query";
// // import { SetStateAction } from "react";
// // import toast from "react-hot-toast";

// export const useFetchCompanies = () => {
//   const fetchApps = async () => {
//     try {
//       const res = await axiosInstance.get("/company");

//       return await res.data;
//     } catch (error) {
//       throw new Error("Failed to fetch applications");
//     }
//   };

//   return useQuery({
//     queryKey: ["Applications"],
//     queryFn: fetchApps,
//     staleTime: 1000 * 60 * 2,
//     select: (data) => data.result,
//   });
// };