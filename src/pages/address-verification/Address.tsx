import images from "@/assets/Images";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressVerification = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(false);
    e.preventDefault();
    navigate('/address-verification/personnelslist');
  }
  return (
    <div className="h-[100svh] grid place-content-center">
        <form onSubmit={handleSubmit} className="bg-white w-[90%] max-w-[500px] p-5 rounded-lg mx-auto ">
            <img src={images.logo} alt="Vettme" className="h-8" />
            <div className="p-5 mt-10 bg-gray-50 rounded-lg">
                <h1 className="font-light text-xl">Kindly input the access code!</h1>
                <input 
                    type="password"
                    id="accessCode" 
                    name="accessCode"
                    maxLength={4}
                    className="w-full py-2 px-3 rounded-lg my-5 shadow-sm shadow-gray-300"
                 />

                 <button type="submit"
                  className="w-full bg-destructive py-2 mt-2 rounded-lg text-white hover:bg-red-700"
                 >
                  {loading?"Log In": "Loading..."}
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddressVerification