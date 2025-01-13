import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterAgent } from "@/api/address";
import images from "@/assets/Images";

const AgentForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form));
        console.log(data);
        
        RegisterAgent(data, setIsLoading, navigate);
    }
    return (
        <div className="p-5 md:w-[50%] lg:w-[40%] mx-auto">
            <img src={images.logo} alt="Vettme" className="h-8 mb-5" />
            <h1 className="my-2 font-light text-3xl text-left">Agent Registration Form</h1>
            <p>Register yourself as as one of our Vettme App Field Agent.</p>
            <form onSubmit={handleSubmit} className="mt-[50px] w-full">
                <label htmlFor="name" className="block">
                    <p className="text-sm">Full Name</p>
                    <Input
                        type="text"
                        placeholder="e.g. John Doe"
                        disabled={isLoading}
                        id="name"
                        name="name"
                        required
                        className="mb-2"
                    />
                </label>
                <label htmlFor="address" className="block">
                    <p className="text-sm">Home Address</p>
                    <Input
                        type="text"
                        placeholder="e.g. No2. Somewhere str."
                        disabled={isLoading}
                        id="address"
                        name="address"
                        required
                        className="mb-2"
                    />
                </label>
                <label htmlFor="email" className="block">
                    <p className="text-sm">Email Address</p>
                    <Input
                        type="email"
                        placeholder="e.g. yourcompany@email.com"
                        disabled={isLoading}
                        id="email"
                        name="email"
                        required
                        className="mb-2"
                    />
                </label>
                <label htmlFor="state" className="block">
                    <p className="text-sm">State</p>
                    <Input
                        type="text"
                        placeholder="e.g. Lagos State"
                        disabled={isLoading}
                        id="state"
                        name="state"
                        required
                        className="mb-2"
                    />
                </label>
                <label htmlFor="lga" className="block">
                    <p className="text-sm">Local Goverment Area (LGA)</p>
                    <Input
                        type="text"
                        placeholder="e.g. Omole west local goverment"
                        disabled={isLoading}
                        id="lga"
                        name="lga"
                        required
                        className="mb-2"
                    />
                </label>
                <label htmlFor="phone" className="block">
                    <p className="text-sm">Phone number</p>
                    <Input
                        type="number"
                        placeholder="e.g. +234-9102102011"
                        disabled={isLoading}
                        id="phone"
                        name="phone"
                        required
                    />
                </label>
                <Button
                    className="w-full red-gradient mt-6"
                    disabled={isLoading}
                    type="submit"
                >
                    {isLoading ? <Loader /> : "Register"}
                </Button>
            </form>
        </div>
    );
}

export default AgentForm;