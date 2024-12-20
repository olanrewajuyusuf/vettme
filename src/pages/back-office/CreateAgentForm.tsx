import { useNavigate } from "react-router-dom"
import CreateAgentAccordion from "./components/createAgentAccordion"
import { useState } from "react";
import CreateAgentModal from "@/components/modals/CreateAgentModal";

const CreateAgentForm = () => {
    const [createAgentModal, setCreateAgentModal] = useState(false);
    const navigate = useNavigate();
  return (
    <>
    {createAgentModal && (
        <CreateAgentModal
        isOpen={createAgentModal}
        setIsOpen={setCreateAgentModal}
        />
    )}
    <form onSubmit={(e)=> e.preventDefault()} className="w-1/2 mx-auto">
        <h3 className="text-3xl font-light mb-5">Create Field Agent here!</h3>
        <div >
            <div className="my_div h-10 relative mb-5">
                <label htmlFor="name" className="absolute top-1/2 left-3 -translate-y-1/2 bg-white px-[2px]">Name</label>
                <input type="text" id="name" className="w-full px-3 outline-none h-full border-2 border-black rounded-xl" />
            </div>
            <div className="my_div h-10 relative mb-5">
                <label htmlFor="email" className="absolute top-1/2 left-3 -translate-y-1/2 bg-white px-[2px]">Email</label>
                <input type="text" id="email" className="w-full px-3 outline-none h-full border-2 border-black rounded-xl" />
            </div>
            <div className="my_div h-10 relative mb-5">
                <label htmlFor="location" className="absolute top-1/2 left-3 -translate-y-1/2 bg-white px-[2px]">Address</label>
                <input type="text" id="location" className="w-full px-3 outline-none h-full border-2 border-black rounded-xl" />
            </div>
            <div className="my_div h-10 relative mb-5">
                <label htmlFor="state" className="absolute top-1/2 left-3 -translate-y-1/2 bg-white px-[2px]">State</label>
                <input type="text" id="state" className="w-full px-3 outline-none h-full border-2 border-black rounded-xl" />
            </div>
            <div className="my_div h-10 relative mb-5">
                <label htmlFor="lga" className="absolute top-1/2 left-3 -translate-y-1/2 bg-white px-[2px]">LGA</label>
                <input type="text" id="lga" className="w-full px-3 outline-none h-full border-2 border-black rounded-xl" />
            </div>
            <CreateAgentAccordion />
        </div>
        <div className="flex justify-between items-center ">
            <button 
            onClick={()=> navigate('/back-office')}
            className="bg-white w-[150px] text-black border-[2px] border-black rounded-lg py-2 hover:bg-gray-200"
            >
                Cancel
            </button>
            <button 
            onClick={() => setCreateAgentModal(true)}
            type="submit" className="bg-black w-[150px] text-white border-[2px] border-black rounded-lg py-2 hover:bg-gray-950"
            >
                Submit
            </button>
        </div>
    </form>
    </>
  )
}

export default CreateAgentForm