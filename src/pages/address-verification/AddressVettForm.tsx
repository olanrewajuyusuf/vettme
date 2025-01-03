import images from "@/assets/Images";
import { personnelsInfo } from "@/lib/placeholderData";
import { useNavigate, useParams } from "react-router-dom";
import { PiRecordFill } from "react-icons/pi";
import { getGeolocation } from "@/lib/geolocation";
import { useState } from "react";
import { Location } from "@/lib/geolocation";
import { useVideoContext } from "@/utils/context/VideoContext";
import { VerifiedAddress } from "@/api/address";
import Spinner from "@/components/Spinner";

const AddressVettForm = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const { video, setVideo } = useVideoContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { personnel_id } = useParams();
  const info = personnelsInfo.find(x => x.id === personnel_id);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]); // Save uploaded video to context
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getGeolocation(
      async (location, accuracy) => {
        console.log('Latitude:', location.lat, 'Longitude:', location.lon, 'Accuracy:', accuracy);
        setUserLocation(location);
      },
      (errorMessage) => {
        alert(`Error: ${errorMessage}`);
      }
    );
    const initialLocation: Location[] = JSON.parse(localStorage.getItem('savedLocations') || '[]');

    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    const newData = {...data, initialLocation, finalLocation: userLocation, video}

    console.log(newData);
    VerifiedAddress(newData, setIsLoading, navigate);
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
                    name="landmark"
                    placeholder="Personnel's address landmark"
                    required
                    className="w-full text-gray-900 mt-1 mb-5 py-2 px-2 outline-none"
                    disabled={isLoading}
                 />
                <label htmlFor="busstop" className="text-white text-[14px]">Bus Stop</label>
                <input 
                    type="text"
                    name="busStop"
                    placeholder="Nearest/popular bus stop"
                    required
                    className="w-full text-gray-900 mt-1 mb-5 py-2 px-2 outline-none"
                    disabled={isLoading}
                 />
                <div className="my-5 text-gray-200 font-extralight">
                  <h3>Record live video of the address but in a situation where there's no network, you should make a video with your phone and upload it.</h3>
                  <button
                    type="button"
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
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="w-full text-white border-[1px] px-3 rounded-xl my-2 outline-pink-500 placeholder:text-black"
                    />
                  </div>
                </div>

                 <button type="submit"
                  className="w-full bg-destructive py-4 mt-2 rounded-xl text-white font-bold hover:bg-red-700"
                 >
                  {isLoading ? <Spinner /> : "Submit"}
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddressVettForm
