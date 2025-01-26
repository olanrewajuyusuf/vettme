import { axiosInstance } from "@/api/axiosConfig";
import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { SetStateAction } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "@/api/baseUrl";
import axios from "axios";
import { useCallback } from "react";


export const useFetchCompany = () => {
  const fetchCompany = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("companyId");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/company/${id}`, {
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

// Getting Card data
export const useFetchCardData = () => {
  const fetchCardData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      if (!companyId) {
        throw new Error("Company ID is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-response/status/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching card data:", error);
      throw new Error(error?.response?.data?.message || "Cannot get card data");
    }
  }, []);

  return { fetchCardData };
};

// Getting Transaction history
export const useFetchPayment = () => {
  const fetchPayment = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/payment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching transaction history:", error);
      throw new Error(error?.response?.data?.message || "Cannot get transaction history");
    }
  }, []);

  return { fetchPayment };
};
// export const useFetchCompany = (id: string) => {
//   const fetchCompany = async () => {
//     try {
//       const res = await axiosInstance.get(`/company/${id}`);
//       return await res.data;
//     } catch (error) {
//       throw new Error("Cannot get company info");
//     }
//   };

//   return useQuery({
//     queryKey: ["Company"],
//     queryFn: fetchCompany,
//     select: (data) => data.company,
//     staleTime: 1000 * 60 * 10,
//   });
// };

export const updateCompany = async (
  data: {},
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  queryClient: QueryClient
) => {
  setIsLoading(true);
  const toastId = toast.loading("Updating company info", { id: "updateToast" });

  await axiosInstance
    .patch("/company", data)
    .then((res) => {
      toast.success(res?.data?.message || "Company info updated successfully", {
        id: toastId,
      });
      queryClient.invalidateQueries({
        queryKey: ["Company"],
      });
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message || "Cannot update company information",
        { id: toastId }
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const updateCompanyPassword = async (
  data: {},
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setPass: React.Dispatch<
    React.SetStateAction<{
      pass1: string;
      pass2: string;
      pass3: string;
    }>
  >
) => {
  const toastId = toast.loading("Updating company password", {
    id: "updateToast",
  });
  setIsLoading(true);

  await axiosInstance
    .post("/company", data)
    .then((res) => {
      toast.success(
        res?.data?.message || "Company password updated successfully",
        {
          id: toastId,
        }
      );

      setPass({
        pass1: "",
        pass2: "",
        pass3: "",
      });
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message || "Cannot update company password",
        { id: toastId }
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const useFetchTransactions = () => {
  const fetchTransactions = async () => {
    try {
      const res = await axiosInstance.get("/payment");
      return await res.data;
    } catch (error) {
      throw new Error("Cannot fetch transaction history");
    }
  };

  return useQuery({
    queryKey: ["Transactions"],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60 * 2,
    select: (data) => data.transactions,
  });
};

export const initiateTopup = async (
  amount: string,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => {
  const toastId = toast.loading("Initiating topup", { id: "topupToast" });
  setIsLoading(true);

  await axiosInstance
    .post("/payment/create", { amount })
    .then((res) => {
      toast.success(res?.data?.message || "Payment initiated successfully", {
        id: toastId,
      });

      window.location = res?.data?.data?.authorization_url;
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message || "Unable to initiate payment",
        { id: toastId }
      );
    })
    .finally(() => setIsLoading(false));
};
