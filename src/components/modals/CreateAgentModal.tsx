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
import { useNavigate } from "react-router-dom";
  
  interface DialogModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export default function CreateAgentModal({ isOpen, setIsOpen }: DialogModal) {
    const navigate = useNavigate();
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Field Agent Created!</AlertDialogTitle>
            <AlertDialogDescription>
              <p>You've created a Field Agent, you can go to the dashboard or create another agent.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>navigate('/back-office')}>Dashboard</AlertDialogCancel>
            <AlertDialogAction>Create</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  