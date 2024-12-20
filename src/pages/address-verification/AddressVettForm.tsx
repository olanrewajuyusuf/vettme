import images from "@/assets/Images";
import { personnelsInfo } from "@/lib/placeholderData";
import { useNavigate, useParams } from "react-router-dom";
import { PiRecordFill } from "react-icons/pi";

const AddressVettForm = () => {
  const navigate = useNavigate();
  
    const { personnel_id } = useParams();

    const info = personnelsInfo.find(x => x.id === personnel_id);
    
  
  const handleSubmit = () => {
    // event.preventDefault();
    console.log('hello')
    navigate('/address-verification')
  }
  return (
    <div className="min-h-[100svh] py-20 grid place-content-center">
        <form onSubmit={handleSubmit} className="address w-[90%] max-w-[500px] rounded-2xl mx-auto border-[1px] border-destructive overflow-hidden">
            <div className="h-[70px] flex justify-between items-center bg-destructive gap-10 pr-5">
                <div className="layoff">
                  <img src={images.logo} alt="Vettme" className="h-8 pl-5 object-contain" />
                </div>
                <h2 className="text-white font-light text-lg md:text-xl uppercase mt-1">Address Verification Form</h2>
            </div>
            <h3 className="text-xl font-light mb-5 pl-5 pt-5 pb-2 shadow-sm shadow-gray-200 text-white border-b-[1px] border-gray-200">Kindly provide required informations!</h3>
            <div className="p-5 text-slate-100">
                <p>Personnel's Name:</p>
                <div className="pb-2 pl-2 mb-5 mt-2 font-light border-b-[1px] border-l-[1px] text-slate-300">{info?.name}</div>
                <p>Address:</p>
                <div className="pb-2 pl-2 mt-2 font-light border-b-[1px] border-l-[1px] py-2 text-slate-300">{info?.Address}</div>
            </div>
            <div className="px-5">
                <label htmlFor="landmark" className="text-white text-[14px]">Landmark</label>
                <input 
                    type="text"
                    id="landmark" 
                    placeholder="Personnel's address landmark"
                    className="w-full text-gray-900 mt-1 mb-5 py-2 px-2 outline-none"
                 />
                <label htmlFor="busstop" className="text-white text-[14px]">Bus Stop</label>
                <input 
                    type="text"
                    id="busstop" 
                    placeholder="The nearest/popular bus stop"
                    className="w-full text-gray-900 mt-1 mb-5 py-2 px-2 outline-none"
                 />
                <div className="my-5 text-gray-200 font-extralight">
                  <h3>Record live video of the address but in a situation where there's no network, you should make a video with your phone and upload it.</h3>
                  <button
                    onClick={()=> navigate('video-recorder')}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 mt-3 pl-3 rounded-full text-gray-900 text-sm font-bold"
                  >
                    <span>Record Live</span>
                    <PiRecordFill  className="text-destructive text-4xl"/>
                  </button>
                  <div className="border-t-[1px] mt-5">
                    <label htmlFor="video" className="text-white">Upload video</label>
                    <input 
                      type="file"
                      id="video"
                      className="w-full text-white border-[1px] px-3 rounded-xl my-2 outline-pink-500 placeholder:text-black"
                    />
                  </div>
                </div>

                 <button type="submit"
                  className="w-full bg-destructive py-4 mt-2 rounded-xl text-white font-bold hover:bg-red-700"
                 >
                  Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddressVettForm