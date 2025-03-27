import { useFetchAddress, useFetchAddresses } from "@/hooks/company";
import { RiFolderVideoLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import loader from "@/assets/loader.svg";
import { useParams } from "react-router-dom";
import { IoIosPerson } from "react-icons/io";
import { FaAddressBook, FaCalendarCheck, FaLandmark } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

interface addressesProps {
    id: string;
    personnelName: string;
    personnelType: string;
    country: string;
    state: string;
    lga: string;
    address: string;
    status: string;
}

interface findingsProps {
    id: string,
    busStop: string,
    createdAt: string,
    landmark: string,
    video: string,
    status: string,
    confirmation: string,
}

const AddressDetails = () => {
    const [address, setAddress] = useState<addressesProps[] | null>(null);
    const [findings, setFindings] = useState<findingsProps | null>(null);
    const [agent, setAgent] = useState<any | null>(null);
    const [isVideo, setIsVideo] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { fetchAddresses } = useFetchAddresses();
    const { fetchAddress } = useFetchAddress();
    const { id, address_id } = useParams();

    useEffect(() => {
        const getAddress = async () => {
            if (!id) {
                // If id is undefined, don't attempt to fetch data
                setError("ID is missing");
                setLoading(false);
                return;
            }

            try {
                const data = await fetchAddresses(id);                
                const personnel = data.data.filter(
                (person: addressesProps) => person.id === address_id
                );                
                setAddress(personnel);
            } catch (error) {
                console.error("Failed to fetch company info:", error);
            }
        };

        const getFindings = async () => {
            try {
                const data = await fetchAddress(address_id as string);
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
    }, [fetchAddresses, id, fetchAddress, address_id]);

  return (
    <>
        <div className="border-[1px] border-stroke-clr bg-white rounded-lg grid grid-cols-3 gap-5">
            <div className="border-r-[1px] border-stroke-clr p-5">
                <h2>Claim</h2>
                {loading && (
                    <div className="w-full h-[200px] flex items-center justify-center">
                        <img src={loader} alt="Loading" className="w-10" />
                    </div>
                )}
                {(!loading && !address) && (
                <div className="h-[200px]">
                    <p className="text-center">Can't get claimed address</p>
                </div>)}
                {(!loading && address) && (
                <>
                <div className="flex flex-col justify-center items-center mb-5">
                    <div className="w-20 h-20 rounded-full text-white text-4xl bg-blue-500 grid place-items-center mb-3">{address && address[0].personnelName.slice(0, 2).toUpperCase()}</div>
                    <h3>{address && address[0].personnelName}</h3>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-2xl"><MdPeopleAlt /></div>
                        <div>
                            <p className="font-bold">Status</p>
                            <p>{address && address[0].personnelType}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><FaAddressBook /></div>
                        <div className="w-[80%]">
                            <p className="font-bold">Address</p>
                            <p>{address && address[0].address}</p>
                        </div>
                    </div>
                </div>
                </>)}
            </div>
            <div className="col-span-2 p-5">
                <h2>Findings</h2>
                {loading && (
                    <div className="w-full h-[200px] flex items-center justify-center">
                        <img src={loader} alt="Loading" className="w-10" />
                    </div>
                )}
                {(!loading && !findings) && (
                <div className="h-[200px]">
                    <p className="text-center">No Agent's verification data or assigned</p>
                </div>)}
                {(!loading && findings) && (
                <>
                <div className="flex items-center gap-3 my-5">
                    <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><IoIosPerson /></div>
                    <div>
                        <p className="font-bold">Agent</p>
                        <p>{findings && agent.agentName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><FaLandmark /></div>
                    <div>
                        <p className="font-bold">Landmark</p>
                        <p>{findings?.landmark}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><FaBusSimple /></div>
                    <div>
                        <p className="font-bold">Busstop</p>
                        <p>{findings?.busStop}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-blue-900 rounded-full grid place-items-center text-white text-xl"><FaCalendarCheck /></div>
                    <div>
                        <p className="font-bold">Does this person live here?</p>
                        <p>{findings?.confirmation}</p>
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
                </>)}
            </div>
        </div>
    </>
    );
};

export default AddressDetails;
