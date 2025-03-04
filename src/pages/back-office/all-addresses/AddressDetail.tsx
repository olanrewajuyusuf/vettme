import { useFetchAddress, useFetchAddresses } from "@/hooks/backOffice";
import moment from "moment";
import { TbBusStop, TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";
import { RiFolderVideoLine } from "react-icons/ri";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { useEffect, useState } from "react";
import loader from "@/assets/loader.svg";
import { useParams } from "react-router-dom";
import { IoIosTimer } from "react-icons/io";
import { FaLandmark } from "react-icons/fa";
import { calculateDistance, getAddressFromCoordinates, getCoordinatesFromAddress } from "@/lib/geolocation";

interface addressesProps {
    id: string,
    personnelName: string,
    personnelType: string,
    country: string,
    state: string,
    lga: string,
    address: string,
    status: string,
}

interface findingsProps {
    id: string,
    busStop: string,
    createdAt: string,
    landmark: string,
    initialLocation: any,
    finalLocation: any,
    video: string,
    status: string,
}

const AddressDetail = () => {
    const [ address, setAddress ] = useState<addressesProps[] | null>(null);
    const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
    const [coordAddress, setCoordAddress] = useState<any | null>(null);
    const [ findings, setFindings ] = useState<findingsProps | null>(null);
    const [ agent, setAgent ] = useState<any | null>(null);
    const [ isVideo, setIsVideo ] = useState(false);
    const [loading, setLoading] = useState(true);
    const { fetchAddresses } = useFetchAddresses();
    const { fetchAddress } = useFetchAddress();
    const { id } = useParams();
        
    useEffect(() => {
        const getAddress = async () => {
            try {
                const data = await fetchAddresses();  
                console.log(data);
                
                const personnel = data.data.filter((person: addressesProps) => person.id === id)          
                setAddress(personnel);
            } catch (error) {
                console.error("Failed to fetch company info:", error);
            }
        };

        const getFindings = async () => {
            try {
                const data = await fetchAddress(id as string);                  
                setFindings(data.data.addressVerificationData);         
                setAgent(data.data.agent);         
            } catch (error) {
                console.error("Failed to fetch agent's findings:", error);
            } finally {
                setLoading(false);
            }
        };
        
        getAddress();
        getFindings();
    }, [fetchAddresses, id, fetchAddress]);

    useEffect(() => {
        const fetchCoordinates = async () => {
          const coords = await getCoordinatesFromAddress(address && address[0].address);
          if (coords) {
            setCoordinates(coords);
          }
        };
    
        fetchCoordinates();
    }, [address]);

    useEffect(() => {
        const fetchCoordsAddress = async () => {
          const coords = await getAddressFromCoordinates(findings?.initialLocation.lat, findings?.initialLocation.lon);
          if (coords) {
            setCoordAddress(coords);
          }
        };
    
        fetchCoordsAddress();
    }, [findings?.initialLocation.lat, findings?.initialLocation.lon]);      

    return (
        <>
        <div className="grid grid-cols-3 justify-between items-start gap-5 border-b border-stroke-clr">
            <div>
                <h1 className="mb-5 border-b border-stroke-clr">Claim</h1>
                <div className="bg-blue-600 rounded-lg text-white p-3 mb-3 shadow-md">
                    <p>Name</p>
                    <h3>{address && address[0].personnelName}</h3>
                </div>
                <div className="bg-white rounded-lg p-3 mb-3 shadow-md">
                    <p>Status</p>
                    <h3>{address && address[0].personnelType}</h3>
                </div>
                <div className="bg-pink-400 rounded-lg text-white p-3 mb-5 shadow-md">
                    <p>Address</p>
                    <h3>{address && address[0].address}</h3>
                </div>
            </div>

            <div className="col-span-2 border-l border-stroke-clr pl-5">
                <h1 className="mb-5 border-b border-stroke-clr">Findings</h1>
                {loading && (
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <img src={loader} alt="Loading" className="w-10" />
                    </div>
                )}
                {(!loading && !findings) && (
                <div className="h-[300px]">
                    <p className="text-center">No Agent's verification data or assigned</p>
                </div>)}
                {(!loading && findings) && (
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <div className="bg-blue-600 rounded-lg text-white p-3 mb-3 shadow-md">
                            <h3>Agent Name</h3>
                            <p>{agent.agentName}</p>
                        </div>
                        <div className="bg-pink-400 rounded-lg text-white p-3 mb-3 shadow-md">
                            <div className="border-b border-white mb-2 pb-2">
                                <h3><FaLandmark />Landmark</h3>
                                <p>{findings?.landmark}</p>
                            </div>
                            <div>
                                <h3><TbBusStop />Bus Stop</h3>
                                <p>{findings?.busStop}</p>
                            </div>
                        </div>
                        {!isVideo && <div className="bg-blue-600 rounded-lg text-white p-3 mb-3 shadow-md">
                            <h3 className="mb-5">Recorded video</h3>
                            <button
                            onClick={() => setIsVideo(true)}
                            >
                                <span className="w-20 bg-white text-black p-2 rounded-full flex justify-center items-center gap-1">play <RiFolderVideoLine className="text-xl" /></span>
                            </button>
                        </div>}
                        {isVideo && <div className="relative">
                            {findings && (
                            <video width="320" height="240" controls>
                                <source src={findings && findings.video} type="video/mp4"/>
                            </video>)}
                            <button 
                            onClick={() => setIsVideo(false)}
                            className="absolute top-3 right-5 bg-destructive text-white px-2 rounded-full border-[1px] border-white"
                            >
                                close
                            </button>
                        </div>}
                    </div>

                    <div>
                        <div className="bg-white rounded-lg p-3 mb-3 shadow-md">
                            <h3 className="mb-3">Starting Location</h3>
                            <div>
                                <div className="border-b border-stroke-clr mb-2 pb-2 flex justify-between items-center">
                                    <span className="flex items-center gap-1 text-sm"><TbWorldLongitude className="text-destructive" />Longitude</span>
                                    <span className="float-right text-blue-500 text-xs">{findings?.initialLocation.lon}</span>
                                </div>
                                <div className="border-b border-stroke-clr mb-2 pb-2 flex justify-between items-center">
                                    <span className="flex items-center gap-1 text-sm"><TbWorldLatitude className="text-destructive"/>Latitude</span>
                                    <span className="float-right text-blue-500 text-xs">{findings?.initialLocation.lat}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1 text-sm"><IoIosTimer className="text-destructive"/>Timestamp</span>
                                    <span className="float-right text-blue-500 text-xs">{moment(findings?.initialLocation.timestamp).format("MMM-DD-YY, h:mm a")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 mb-3 shadow-md">
                            <h3 className="mb-3">Final Location</h3>
                            <div>
                                <div className="border-b border-stroke-clr mb-2 pb-2 flex justify-between items-center">
                                    <span className="flex items-center gap-1 text-sm"><TbWorldLongitude className="text-destructive" />Longitude</span>
                                    <span className="float-right text-blue-500 text-xs">{findings?.finalLocation.lon}</span>
                                </div>
                                <div className="border-b border-stroke-clr mb-2 pb-2 flex justify-between items-center">
                                    <span className="flex items-center gap-1 text-sm"><TbWorldLatitude className="text-destructive"/>Latitude</span>
                                    <span className="float-right text-blue-500 text-xs">{findings?.finalLocation.lat}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1 text-sm"><IoIosTimer className="text-destructive"/>Timestamp</span>
                                    <span className="float-right text-blue-500 text-xs">{moment(findings?.finalLocation.timestamp).format("MMM-DD-YY, h:mm a")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-5">
            <div className="bg-white rounded-lg shadow-md p-5">
                <h2>Geolocation comparison</h2>
                <p>
                    The claimed address latitude and longitude being 
                    compare in <i className="text-destructive">km</i> with the agent's starting location latitude and longitude
                    with threshold radius being set to <i className="text-destructive">5km</i>
                </p>
            </div>
            <div className="border border-stroke-clr rounded-lg p-5 col-span-2">
                {loading && (
                    <div className="w-full h-[100px] flex items-center justify-center">
                        <img src={loader} alt="Loading" className="w-10" />
                    </div>
                )}
                {(!loading && !findings) && (
                <div className="h-[100px]">
                    <h3 className="text-center">No Finding...</h3>
                </div>)}
                {(!loading && findings) && (
                <div className="grid grid-cols-3 gap-5">
                    <div>
                        <h3>Personnel's Claim</h3>
                        <ul className="text-sm decoration-current">
                            <li className="flex items-center mb-3">{address && address[0].address}</li>
                            <li className="flex items-center"><VscDebugBreakpointData className="text-destructive"/>Lon: {coordinates?.lon}</li>
                            <li className="flex items-center"><VscDebugBreakpointData className="text-destructive"/>Lat: {coordinates?.lat}</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Agent's Finding</h3>
                        <ul className="text-sm decoration-current">
                            <li className="flex items-center mb-3">{coordAddress}</li>
                            <li className="flex items-center"><VscDebugBreakpointData className="text-destructive"/>Lon: {findings?.initialLocation.lon}</li>
                            <li className="flex items-center"><VscDebugBreakpointData className="text-destructive"/>Lat: {findings?.initialLocation.lat}</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold">Threshold</p>
                        <p>5km</p>
                        <br />
                        <p className="font-bold">Distance btw</p>
                        <p>{calculateDistance(coordinates?.lat, coordinates?.lon, findings?.initialLocation.lat, findings?.initialLocation.lon).toFixed(2)}</p>
                        <p className="font-bold">Verdict</p>
                        <p>
                            {
                                calculateDistance(coordinates?.lat, coordinates?.lon, findings?.initialLocation.lat, findings?.initialLocation.lon) <= 5 ?
                                "Within the threshold." : "Not within the threshold."
                            }
                        </p>
                    </div>
                </div>
                )}
            </div>
        </div>
        </>
    )
}

export default AddressDetail;