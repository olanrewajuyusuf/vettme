import axios from "axios";
import toast from "react-hot-toast";
import { useCallback } from "react";


export const useFetchAddresses = () => {
	const fetchAddresses = useCallback(async () => {
		try{
			const token = localStorage.getItem("token")

			if (!token) {
				throw new Error("Authentication token is missing");
			}

			const res = await axios.get("https://vettme-pro.onrender.com/address", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			toast.success("Addresses fetched succesfully");
			return res.data
		} catch(error: any) {
			console.error("Error fetching address info:", error);
			toast.error(error?.response?.data?.message || "Cannot get company info");
			throw new Error(error?.response?.data?.message || "Cannot get company info");
		}
	}, [])
	return {fetchAddresses};
}