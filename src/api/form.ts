import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "./baseUrl";
// import { SetStateAction } from "react";
// import { headers } from "@/lib/placeholderData";

// Sign in
// export const CreateForm = async (
//   data: any,
//   setIsOpen: React.Dispatch<SetStateAction<boolean>>,
//   setIsLoading: React.Dispatch<SetStateAction<boolean>>,
// ) => {
//     setIsLoading(true);
//   const toastId = toast.loading("Verifying...", { id: "verifyToast" });

//   await axios
//     // .post(`${baseUrl}/verification/create-form`, data)
//     .post('https://vettme-pro.onrender.com/api/pro/verification/create-form',
//     data,
//     {
//     headers: {
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzOTUyNTYwLWM0N2QtNDc5NC1hMTc1LTA0OTYxZDhiNmQ5MiIsImlhdCI6MTczNzMyNzQxNywiZXhwIjoxNzM3NDEzODE3fQ.pSCLA574CKUBJXT3JfmRbvsRxoTpdHtU3XuXQCiCUsI'
//       }
//     }
//     )

//     .then((res) => {
//       toast.success(res?.data?.message || "Form Created", {
//         id: toastId,
//       });

//     setIsOpen(true);
//     return res.data;
//     })
//     .catch((error: any) => {
//         console.error("Error response:", error.response);
//       toast.error(error?.response?.data?.message || "Unable to create form", {
//         id: toastId,
//       });
//       console.error("Error submitting form:", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//       }
//     })
//     .finally(() => setIsLoading(false));
// };

export const CreateForm = async (
  data: any,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any | null> => {
  setIsLoading(true);
  const toastId = toast.loading("Verifying...", { id: "verifyToast" });

  const token = localStorage.getItem("token")

  try {
    const res = await axios.post(
      `${baseUrl}/verification/create-form`,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    console.log("Server Response:", res);
    console.log("Response Data:", res.data); // Log only data

    if (res.data) {
      toast.success(res?.data?.message || "Form Created", { id: toastId });
      setIsOpen(true);
      return res.data; // Ensure this line is always executed
    } else {
      toast.error("No data returned", { id: toastId });
      return null; // Handle the case where no data is returned
    }
  } catch (error: any) {
    console.error("Error Response:", error.response);

    toast.error(error?.response?.data?.message || "Unable to create form", {
      id: toastId,
    });

    console.error("Error submitting form:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }

    return null;
  } finally {
    setIsLoading(false);
  }
};


export const createFormResponse = async (
  data: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any | null> => {
  setIsLoading(true);
  const toastId = toast.loading("Verifying...", { id: "verifyToast"})

  const token = localStorage.getItem("token")

  try {
    const res = await axios.post(
      `${baseUrl}/verification-response`,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    console.log("Server response", res);
    console.log("Response Data:", res.data);

    if (res.data) {
      toast.success(res?.data.message || "Response Created", { id: toastId});
      return res.data;
    } else {
      toast.error("No data returned", { id: toastId})
      return null;
    }
  }catch (error: any) {
    console.error("Error Response:", error.response);

    toast.error(error?.response?.data?.message || "Unable to create Form", {
      id : toastId,
    })

    console.error("Error submitting form:", error)
    if (error.response) {
      console.error("Response data:", error.response.data)
      console.error("Response status:", error.response.status)
    }

    return null;
  } finally {
    setIsLoading(false)
  }
}