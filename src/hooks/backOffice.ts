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
    ) => {
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

export const useDeleteCompany = () => {
  const deleteCompany = useCallback(
    async (id: string) => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          throw new Error("Authentication token is missing");
        }

        const res = await axios.delete(`${baseUrl}/company/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Company deleted successfully");
        return res.data;
      } catch (error: any) {
        console.error("Error deleting company:", error);
        const errorMessage = error?.response?.data?.message || "Failed to delete the company.";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  return { deleteCompany };
};

export const useFetchVerificationBatches = (id: string | undefined) => {
  const FetchVerificationBatches = useCallback(async () => {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/verification/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Verification Batches fetched successfully");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching company info:", error);
    toast.error(error?.response?.data?.message || "Cannot fetch verification batches");
    throw new Error(error?.response?.data?.message || "Cannot fetch verification batches");
  }
}, []);
return { FetchVerificationBatches };
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