import DeleteVerification from "@/components/modals/DeleteVerification";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CopyIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFetchBatchesResponse, useFetchBatchesResponseCards } from "@/hooks/company";
import moment from "moment";
import { VerificationSkeleton } from "@/components/SkeletonUi";

interface ResponseProps {
  id: string,
  status: string,
  submittedAt: string,
  responses: {
    piFullName: string,
    piEmailAddress: string,
  },
}

interface CardsProps {
  title: string,
  max: number,
  status: string,
  endDate: string,
}

export default function Verification() {
  const { id } = useParams();
  const { toast } = useToast();
  const [ batchesResponse, setBatchesResponse ] = useState<ResponseProps[] | null>(null);
  const [ cards, setCards ] = useState<CardsProps | null>(null);
  const { fetchBatchesResponse } = useFetchBatchesResponse();
  const { fetchBatchesResponseCards } = useFetchBatchesResponseCards();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") || "all";
  // const navigate = useNavigate();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const data = await fetchBatchesResponse(id as string);
        setBatchesResponse(data.data);
      } catch (error) {
        console.error("Failed to get batches response:", error);
        setError("Failed to fetch Verification batches");
      } finally {
        setLoading(false);
      }
    };

    getResponse();

    const getResponseCards = async () => {
      try {
        const data = await fetchBatchesResponseCards(id as string);
        setCards(data.data);
      } catch (error) {
        console.error("Failed to get batches response:", error);
      }
    };

    getResponseCards();
}, [fetchBatchesResponse, id, fetchBatchesResponseCards]);

console.log(cards);
console.log(batchesResponse);


const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedFilter = event.target.value;
  setSearchParams({ filter: selectedFilter });
};

const filteredBatches = batchesResponse
    ? filter === "pending"
      ? batchesResponse.filter((batch) => batch.status === "PENDING")
      : filter === "failed"
      ? batchesResponse.filter((batch) => batch.status === "FAILED")
      : filter === "completed"
      ? batchesResponse.filter((batch) => batch.status === "COMPLETED")
      : filter === "in_progress"
      ? batchesResponse.filter((batch) => batch.status === "INPROGRESS")
      : batchesResponse
    : null;

  const noBatchesMessage =
    filteredBatches && filteredBatches.length === 0
      ? filter === "completed"
        ? "You have no completed verification personnel."
        : filter === "pending"
        ? "You have no pending verification personnel."
        : filter === "in_progress"
        ? "You have no ungoing verification personnel."
        : filter === "failed"
        ? "You have no failed verification personnel."
        : "No Verification Batch available."
      : null;

  const headers = [
    {
      title: "Status",
      text: cards?.status === 'PENDING' ?
        'Pending':
        cards?.status === "COMPLETED" ?
        'Successful':
        cards?.status === "FAILED" ?
        'Failed': 'In Progress',
    },
    {
      title: "No of Personnel",
      text: cards?.max,
    },
    {
      title: "Completion Date",
      text: moment(cards?.endDate).format("MMM DD, YYYY"),
    },
    {
      title: "Completion",
      text: "60% Completed",
    },
  ];
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      {deleteModalOpen && (
        <DeleteVerification
          isOpen={deleteModalOpen}
          setIsOpen={setDeleteModalOpen}
        />
      )}

      <div className="mb-[30px] flex justify-between items-center">
        <div>
          <h2>{cards?.title}</h2>
          <p className="text-sm">Date Created: {moment(cards?.endDate).calendar()}</p>
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
            <TrashIcon /> Delete
          </Button>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl flex items-center justify-between overflow-hidden border-[1px] border-stroke-clr mb-6">
        {headers.map((header, idx) => (
          <div
            className="list px-4 border-l-[1px] border-stroke-clr py-4 flex-1"
            key={idx}
          >
            <p className="text-sm">{header.title}</p>
            <p className="font-semibold">{header.text}</p>
          </div>
        ))}
      </div>

      <div className="w-full rounded-xl bg-white border-[1px] border-stroke-clr overflow-hidden">
        <div className="w-full py-4 flex justify-between items-center border-b-[1px] border-stroke-clr px-5">
          <div className="flex items-center gap-3">
            <p>Filter by: </p>
            <select
              name="filter"
              id="filter"
              className="btn px-3"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <Input
            type="text"
            placeholder="Search by verification title"
            className="max-w-sm"
          />
        </div>

        {loading && (
          <div className="flex flex-col gap-3">
            <VerificationSkeleton />
            <VerificationSkeleton />
            <VerificationSkeleton />
          </div>
        )}
        {error && (
          <div className="w-full h-[300px] flex justify-center items-center">
            <h3>{error}</h3>
          </div>
        )}
        {noBatchesMessage && (
          <div className="w-full h-[300px] flex justify-center items-center">
            <h3>{noBatchesMessage}</h3>
          </div>
        )}
        {filteredBatches && filteredBatches.length > 0 && (
        <Table>
          <TableHeader className="bg-stroke-clr">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Personnel Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches?.map((item: any) => (
              <TableRow
                key={item.id}
                // onClick={() =>
                //   navigate(`personnel/${idx + 1}`, { state: item })
                // }
              >
                <TableCell>
                  <span className="w-7 h-7 flex items-center justify-center bg-gray-400 font-medium rounded-lg text-xs">
                    {item.responses.piFullname.slice(0, 2).toUpperCase()}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{item.responses.piFullname}</TableCell>
                <TableCell>{item.responses.piEmailAddress}</TableCell>
                <TableCell>{item.responses.piNationality}</TableCell>
                <TableCell>{moment(item.submittedAt).format("MMM DD, YYYY")}</TableCell>
                <TableCell>
                  <Badge
                    className={`pointer-events-none ${
                      item.status === "VERIFIED"
                        ? "bg-green-400"
                        : item.status === "PENDING"
                        ? "border-yellow-500 border-[1px] text-yellow-500 bg-transparent"
                        : item.status === "FAILED"
                        ? "bg-red-500"
                        : "bg-orange-400"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <TrashIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </div>
    </>
  );
}
