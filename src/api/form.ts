import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "./baseUrl";
import { SetStateAction } from "react";

// Sign in
export const CreateForm = async (
  data: any,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
) => {
    setIsLoading(true);
  const toastId = toast.loading("Verifying...", { id: "verifyToast" });

  await axios
    .post(`${baseUrl}/verification/create-form`, data)
    .then((res) => {
      toast.success(res?.data?.message || "Form Created", {
        id: toastId,
      });

    setIsOpen(true);
    })
    .catch((error: any) => {
        console.error("Error response:", error.response);
      toast.error(error?.response?.data?.message || "Unable to create form", {
        id: toastId,
      });
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    })
    .finally(() => setIsLoading(false));
};