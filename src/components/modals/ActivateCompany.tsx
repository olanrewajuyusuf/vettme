import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import Spinner from "../Spinner";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useActivateCompany } from "@/hooks/backOffice";

export default function CreateAppModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const { activateCompany } = useActivateCompany();

  const handleActivate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {companyId};
    console.log(companyId, 'data: ', data);
    
    // await axiosInstance
    //   .post("/user/application", { appName })
    //   .then((res) => {
    //     toast.success(res?.data?.message || "Application created succesfully", {
    //       id: toastId,
    //     });
    //     queryClient.invalidateQueries({
    //       queryKey: ["Applications"],
    //     });
    //     setIsLoading(false);
    //     setIsOpen(false);
    //   })
    //   .catch((err) => {
    //     toast.error(err?.response?.data?.message || "Something went wrong", {
    //       id: toastId,
    //     });
    //   });

    try {
        const response = await activateCompany(data);
        setIsLoading(false);
        setIsOpen(false);
        console.log("Activation response:", response);
    } catch (error: any) {
        console.error("Failed to activate company:", error.message);
        setIsLoading(false);
        setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="-mt-16">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>Activate Company</AlertDialogTitle>
          <span
            className={`absolute top-0 right-0 ${
              isLoading && "pointer-events-none"
            }`}
            onClick={() => (isLoading ? null : setIsOpen(false))}
          >
            <Cross2Icon className="cursor-pointer hover:text-red-500" />
          </span>
          <AlertDialogDescription>
            Kindly input the company ID to activate the company!
          </AlertDialogDescription>
          <form onSubmit={handleActivate}>
            <label htmlFor="appName" className="block mb-3">
              <p className="text-sm">Company Id</p>
              <Input
                type="text"
                placeholder="e.g RS100100"
                id="appName"
                name="appName"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                disabled={isLoading}
              />
            </label>
            <Button
              type="submit"
              className="pry-btn w-max"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-4">
                  Activating
                  <Spinner />
                </div>
              ) : (
                "Activate"
              )}
            </Button>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
