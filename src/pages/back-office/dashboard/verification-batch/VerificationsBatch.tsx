import DeleteVerification from "@/components/modals/DeleteVerification";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CopyIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import VerificationsHeader from "../../components/verification-batch/verificationsHeader";
import PersonnelsLog from "../../components/verification-batch/personnels";
import { verificationsData } from "@/lib/placeholderData";
import { useParams } from "react-router-dom";

const VerificationsBatch = () => {
  const { toast } = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { verification_id } = useParams();


  const info = verificationsData.find(x => x.id === verification_id);

    return (
      <div className="px-10 pb-10">
        {deleteModalOpen && (
          <DeleteVerification
            isOpen={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
          />
        )}

        <div className="mb-[30px] flex justify-between items-center">
          <div>
            <h2>{info?.title}</h2>
            <p className="text-sm">Date Created: 23/01/2024 at 07:23 PM</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-2 bg-gray-200 text-base-clr hover:bg-gray-300"
              onClick={() => {
                toast({
                  title: "Copied",
                  description: "Verification link copied to clipboard",
                });
              }}
            >
              <CopyIcon /> Copy Form Link
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-red-clr text-red-clr hover:text-red-clr hover:bg-red-50"
              onClick={() => setDeleteModalOpen(true)}
            >
              <TrashIcon /> Delete Link
            </Button>
          </div>
        </div>

        <VerificationsHeader />
        <PersonnelsLog />
      </div>
    )
  }
  
  export default VerificationsBatch;