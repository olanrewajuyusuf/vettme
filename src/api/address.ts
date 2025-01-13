import axios from "axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { baseUrl } from "./baseUrl";
import { SetStateAction } from "react";

export const VerifiedAddress = async (
  data: any,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Verifying...", { id: "verifyToast" });

  await axios
    .post(`${baseUrl}/address-verification`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Data submited", {
        id: toastId,
      });

      navigate("/address-verification");
    })
    .catch((err) => {
      console.error("Error response:", err.response);
      toast.error(err?.response?.data?.message || "Unable to submit", {
        id: toastId,
      });
    })
    .finally(() => setIsLoading(false));
};

export const RegisterAgent = async (
  data: any,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  const toastId = toast.loading("Registering agent...", { id: "agentToast" });

  await axios
    .post(`${baseUrl}/address-verification`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Registered Successfully", {
        id: toastId,
      });

      navigate("/address-verification");
    })
    .catch((err) => {
      console.error("Error response:", err.response);
      toast.error(err?.response?.data?.message || "Unable to register", {
        id: toastId,
      });
    })
    .finally(() => setIsLoading(false));
};