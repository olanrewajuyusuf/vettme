import { Input } from "@/components/ui/input";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FormCreation from "@/components/modals/FormCreation";
import {personalInfoFields, guarantorInfoFields, academicInfoFields, professionalInfoFields, mentalHealthFields} from '@/utils/formSetupData'
import { CreateForm } from "@/api/form";
import Spinner from "@/components/Spinner";

const Form = () => {
    const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5>(1);
    const [creationModalActive, setCreationModalActive] = useState(false);
    const [createdForm, setCreatedForm] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const companyId = localStorage.getItem("companyId")
    const [formData, setFormData] = useState<{
        [key: string]: string | boolean | number ;
    }>({
        title: "",
        verificationType: "",
        max: 0,
        status: "PENDING",
        companyId: `${companyId}`
    });

    // Handle changes for inputs and checkboxes
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value, type, checked } = e.target;

    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: type === "checkbox" ? checked : value,
    //     }));
    // };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value, type } = e.target;
    
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    //     }));
    // };    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" && e.target instanceof HTMLInputElement
                ? e.target.checked
                : type === "number" && e.target instanceof HTMLInputElement
                ? value === "" // Allow the field to be temporarily empty
                    ? "" 
                    : parseFloat(value) // Parse only if it's not empty
                : value,
        }));
    };
    


    // Handle form submission
    const handleSetup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newFormData = { ...formData };
        console.log("Payload before sending: ", newFormData);
      
        const createdForm = await CreateForm(newFormData, setCreationModalActive, setIsLoading);
      
        if (createdForm) {
          console.log("Created form:", createdForm);
            setCreatedForm(createdForm)
        } else {
          console.error("Form creation failed or no data returned.");
        }
      };
      

    return (
        <>
            {creationModalActive && createdForm && <FormCreation isOpen={creationModalActive} createdForm={createdForm} />}
            <div className="mb-[30px]">
                <h2>Create Verification Form</h2>
                <p className="text-sm">
                    Enter form title and select the fields that you want your employee to
                    fill in the options below. The defaults cannot be deselected.
                </p>
            </div>
            <div className="flex items-start gap-4">
                <form onSubmit={handleSetup} className="basis-2/3">
                    {/* Form Title and Verification Type */}
                    <div className="w-full py-5 px-7 rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px] flex flex-wrap gap-6">
                        <label htmlFor="title" className="block w-[55%]">
                            <p className="text-[16px] font-medium">Form Title</p>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title as string}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="verificationType" className="w-[41.1%]">
                            <p className="text-[16px]">Verification Type</p>
                            <select
                                id="verificationType"
                                name="verificationType"
                                className="btn px-2 w-full"
                                value={formData.verificationType as string}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose Verification Type</option>
                                <option value="PERSONNEL">Personnel Verification</option>
                                <option value="LOAN">Loan Verification</option>
                                <option value="CRIMINALRECORD">Criminal Record Verification</option>
                                {/* <option value="other">Other Verification</option> */}
                            </select>
                        </label>
                        <div className=" basis-full">
                            <label htmlFor="max" className="block">
                                <p className="text-[16px] font-medium">Number of expected Personnel</p>
                                <Input
                                    type="number"
                                    id="max"
                                    name="max"
                                    value={formData.max as number}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
                        <div
                            className={`py-5 px-7 ${activeTab === 1 && "border-b-[1px]"
                                } border-stroke-clr flex justify-between items-center cursor-pointer`}
                            onClick={() => setActiveTab(1)}
                        >
                            <p className="text-[16px] font-medium">Personal Information</p>
                            {activeTab === 1 ? <TriangleDownIcon /> : <TriangleRightIcon />}
                        </div>
                        {activeTab === 1 && (
                            <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                                {personalInfoFields.map((field) => (
                                    <label htmlFor={field.id} className="flex gap-2" key={field.id}>
                                        <input
                                            type="checkbox"
                                            id={field.id}
                                            name={field.id}
                                            checked={!!formData[field.id]}
                                            onChange={handleChange}
                                        />
                                        <p className="text-sm">{field.label}</p>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Guarantor's Information Section */}
                    <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
                        <div
                            className={`py-5 px-7 ${activeTab === 2 && "border-b-[1px]"
                                } border-stroke-clr flex justify-between items-center cursor-pointer`}
                            onClick={() => setActiveTab(2)}
                        >
                            <p className="text-[16px] font-medium">Guarantor's Information</p>
                            {activeTab === 2 ? <TriangleDownIcon /> : <TriangleRightIcon />}
                        </div>
                        {activeTab === 2 && (
                            <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                                {guarantorInfoFields.map((field) => (
                                    <label htmlFor={field.id} className="flex gap-2" key={field.id}>
                                        <input
                                            type="checkbox"
                                            id={field.id}
                                            name={field.id}
                                            checked={!!formData[field.id]}
                                            onChange={handleChange}
                                        />
                                        <p className="text-sm">{field.label}</p>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Academic Information Section */}
                    <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
                        <div
                            className={`py-5 px-7 ${activeTab === 3 && "border-b-[1px]"
                                } border-stroke-clr flex justify-between items-center cursor-pointer`}
                            onClick={() => setActiveTab(3)}
                        >
                            <p className="text-[16px] font-medium">Academic Information</p>
                            {activeTab === 3 ? <TriangleDownIcon /> : <TriangleRightIcon />}
                        </div>
                        {activeTab === 3 && (
                            <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                                {academicInfoFields.map((field) => (
                                    <label htmlFor={field.id} className="flex gap-2" key={field.id}>
                                        <input
                                            type="checkbox"
                                            id={field.id}
                                            name={field.id}
                                            checked={!!formData[field.id]}
                                            onChange={handleChange}
                                        />
                                        <p className="text-sm">{field.label}</p>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Professional Information Section */}
                    <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
                        <div
                            className={`py-5 px-7 ${activeTab === 4 && "border-b-[1px]"
                                } border-stroke-clr flex justify-between items-center cursor-pointer`}
                            onClick={() => setActiveTab(4)}
                        >
                            <p className="text-[16px] font-medium">Professional Information</p>
                            {activeTab === 4 ? <TriangleDownIcon /> : <TriangleRightIcon />}
                        </div>
                        {activeTab === 4 && (
                            <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                                {professionalInfoFields.map((field) => (
                                    <label htmlFor={field.id} className="flex gap-2" key={field.id}>
                                        <input
                                            type="checkbox"
                                            id={field.id}
                                            name={field.id}
                                            checked={!!formData[field.id]}
                                            onChange={handleChange}
                                        />
                                        <p className="text-sm">{field.label}</p>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mental Health Assessment Section */}
                    <div className="w-full rounded-xl border-[1px] border-stroke-clr bg-white mb-[30px]">
                        <div
                            className={`py-5 px-7 ${activeTab === 5 && "border-b-[1px]"
                                } border-stroke-clr flex justify-between items-center cursor-pointer`}
                            onClick={() => setActiveTab(5)}
                        >
                            <p className="text-[16px] font-medium">Mental Health Assessment</p>
                            {activeTab === 5 ? <TriangleDownIcon /> : <TriangleRightIcon />}
                        </div>
                        {activeTab === 5 && (
                            <div className="flex py-5 px-7 flex-wrap gap-x-6 gap-y-2">
                                {mentalHealthFields.map((field) => (
                                    <label htmlFor={field.id} className="flex gap-2" key={field.id}>
                                        <input
                                            type="checkbox"
                                            id={field.id}
                                            name={field.id}
                                            checked={!!formData[field.id]}
                                            onChange={handleChange}
                                        />
                                        <p className="text-sm">{field.label}</p>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Link to="/forms/1234" target="_blank">
                            <Button type="button" className="bg-gray-400 hover:bg-gray-500">
                                Preview Form
                            </Button>
                        </Link>
                        <Button type="submit" className="red-gradient flex items-center justify-center">
                            {isLoading ? <Spinner /> : "Complete Form Setup"}
                        </Button>
                    </div>
                </form>

                <div className="basis-1/3 sticky top-0 bg-white py-4 px-7 rounded-xl border-[1px] border-stroke-clr">
                    <h3>Order Summary</h3>
                    <p>
                        Total cost of services chosen. Cost is calculated per form
                        submission
                    </p>
                </div>
            </div>
        </>
    );
};

export default Form;
