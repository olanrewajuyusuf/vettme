import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  
  interface DialogModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export default function CreateAddressModal({ isOpen, setIsOpen }: DialogModal) {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Personnel's Address here!</AlertDialogTitle>
            <AlertDialogDescription>
              <div >
                <div className="my_div h-10 border-2 border-black relative rounded-xl overflow-hidden mb-5">
                    <label htmlFor="name" className="absolute top-1/2 left-3 -translate-y-1/2 bg-white">name</label>
                    <input type="text" id="name" className="w-full px-3 outline-none h-full" />
                </div>
                <div className="h-10 border-2 border-black relative rounded-xl overflow-hidden">
                    <label htmlFor="address" className="absolute top-1/2 left-3 -translate-y-1/2 bg-white">address</label>
                    <input type="text" id="address" className="w-full px-3 outline-none h-full" />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  