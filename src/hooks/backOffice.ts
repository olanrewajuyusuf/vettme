import axios from "axios";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { baseUrl } from "@/api/baseUrl";

// getting all companies
export const useFetchCompany = () => {
    const fetchCompany = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(`${baseUrl}/company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          const token = sessionStorage.getItem("adminToken");
  
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
        const token = sessionStorage.getItem("adminToken");

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
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/verification/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    toast.error(error?.response?.data?.message || "Cannot fetch addresses");
    throw new Error(error?.response?.data?.message || "Cannot fetch addresses");
  }
}, []);
return { fetchAddresses };
};

// Getting all addresses
export const useFetchAddress = () => {
  const fetchAddress = useCallback(async (id: string) => {
  try {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/address-verification/address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    toast.error(error?.response?.data?.message || "Cannot fetch address");
    throw new Error(error?.response?.data?.message || "Cannot fetch address");
  }
  }, []);
  return { fetchAddress };
};

// Getting all field agents
export const useFetchAgents = () => {
  const fetchAgents = useCallback(async () => {
  try {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/field-agent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
        const token = sessionStorage.getItem("adminToken");

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

// Assign addresses to agents
export const useAssignAddress = () => {
  const assignAddress = useCallback(
    async (
      data: any,
  ) => {
      try {
        const token = sessionStorage.getItem("adminToken");

        if (!token) {
          throw new Error("Authentication token is missing");
        }

        const res = await axios.put(
          `${baseUrl}/field-agent/assign-agent`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Address(es) assigned successfully");
        return res.data;
      } catch (error: any) {
        console.error("Error activating company:", error);
        toast.error(
          error?.response?.data?.message || "Cannot assign address"
        );
        throw new Error(
          error?.response?.data?.message || "Cannot assign address"
        );
      }
    },[] 
  );
  return { assignAddress };
};

// Getting all assigned addresses
export const useFetchAssignedAddress = () => {
  const fetchAssignedAddress = useCallback(async (id: string) => {
  try {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/address/assigned/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching assigned addresses:", error);
    toast.error(error?.response?.data?.message || "Cannot fetch assigned addresses");
    throw new Error(error?.response?.data?.message || "Cannot fetch assigned addresses");
  }
}, []);
return { fetchAssignedAddress };
};

// Getting all assigned addresses
export const useFetchCardsData = () => {
  const fetchCardsData = useCallback(async () => {
  try {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const res = await axios.get(`${baseUrl}/verification/count-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching cards data:", error);
    toast.error(error?.response?.data?.message || "Cannot fetch cards data");
    throw new Error(error?.response?.data?.message || "Cannot fetch cards data");
  }
}, []);
return { fetchCardsData };
};

// Getting Verification Batches responses
export const useFetchBatchesResponse = () => {
  const fetchBatchesResponse = useCallback(async (id: string) => {
    try {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-response/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Verification response:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Verification response");
    }
  }, []);

  return { fetchBatchesResponse };
};

// Getting Verification Batches responses cards
export const useFetchBatchesResponseCards = () => {
  const fetchBatchesResponseCards = useCallback(async (id: string) => {
    try {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification/form/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Verification response cards:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Verification response cards");
    }
  }, []);

  return { fetchBatchesResponseCards };
};

// Getting verification findings
export const useFetchFinding = () => {
  const fetchFinding = useCallback(async (id: string) => {
    try {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-finding/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Finding:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Finding");
    }
  }, []);
  return {fetchFinding};
};

export const useFetchVerdict = () => {
  const fetchVerdict = useCallback(async (id: string) => {
    try {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const res = await axios.get(
        `${baseUrl}/verification-result/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error("Error fetching Verdict:", error);
      throw new Error(error?.response?.data?.message || "Cannot get Verdict");
    }
  }, []);
  return {fetchVerdict};
};