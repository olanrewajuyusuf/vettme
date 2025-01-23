import axios from "axios";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { baseUrl } from "@/api/baseUrl";

// getting all companies
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

// Activate a companies
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

// Delete a companies
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

// getting verification batches
export const useFetchVerificationBatches = (id: string | undefined) => {
  const fetchVerificationBatches = useCallback(async () => {
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
}, [id]);
return { fetchVerificationBatches };
};

// Getting all addresses
export const useFetchAddresses = () => {
  const fetchAddresses = useCallback(async () => {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Addresses fetched successfully");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    toast.error(error?.response?.data?.message || "Cannot fetch addresses");
    throw new Error(error?.response?.data?.message || "Cannot fetch addresses");
  }
}, []);
return { fetchAddresses };
};

// Getting all field agents
export const useFetchAgents = () => {
  const fetchAgents = useCallback(async () => {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/field-agent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Field agents fetched successfully");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching field agents:", error);
    toast.error(error?.response?.data?.message || "Cannot fetch field agents");
    throw new Error(error?.response?.data?.message || "Cannot fetch field agents");
  }
}, []);
return { fetchAgents };
};

// Delete a field agent
export const useDeleteAgent = () => {
  const deleteAgent = useCallback(
    async (id: string) => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          throw new Error("Authentication token is missing");
        }

        const res = await axios.delete(`${baseUrl}/field-agent/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Agent deleted successfully");
        return res.data;
      } catch (error: any) {
        console.error("Error deleting agent:", error);
        const errorMessage = error?.response?.data?.message || "Failed to delete the agent.";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );
  return { deleteAgent };
}


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
