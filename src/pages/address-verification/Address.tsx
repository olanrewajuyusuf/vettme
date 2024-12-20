import images from "@/assets/Images";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressVerification = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const handleSubmit = () => {
    setLoading(false);
    // event.preventDefault();
    // setTimeout(()=> {
    //   setLoading(true);
    // }, 1000)
    navigate('/address-verification/personnelslist');

  }
  return (
    <div className="h-[100svh] grid place-content-center">
        <form onSubmit={handleSubmit} className="address w-[90%] max-w-[500px] rounded-2xl mx-auto border-[1px] border-destructive overflow-hidden">
            <div className="h-[70px] flex items-center bg-destructive md:gap-10 pr-5">
                <div className="layoff">
                  <img src={images.logo} alt="Vettme" className="h-8 pl-5" />
                </div>
                <h2 className="text-white font-light text-xl uppercase mt-1">Agent Sign in Form</h2>
            </div>
            <div className="px-5 pt-10">
                <label htmlFor="name" className="text-white">Field agent should login with his/her precise name!</label>
                <input 
                    type="text"
                    id="name" 
                    placeholder="Field agent full name"
                    className="w-full border-2 border-destructive py-4 px-5 rounded-xl my-5 outline-pink-500 placeholder:text-black"
                 />

                 <button type="submit"
                  className="w-full bg-destructive py-4 mt-2 rounded-xl text-white font-bold hover:bg-red-700"
                 >
                  {loading?"Log In": "Loading..."}
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddressVerification