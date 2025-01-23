import TopupModal from "@/components/modals/TopupModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const transactions = [
  {
    type: "Account Deposit",
    amount: "N38,365",
    date: "23/05/2023 09:00 PM",
    status: 2,
  },
  {
    type: "Account Deposit",
    amount: "N38,365",
    date: "23/05/2023 09:00 PM",
    status: 1,
  },
  {
    type: "Account Deposit",
    amount: "N38,365",
    date: "23/05/2023 09:00 PM",
    status: 3,
  },
  {
    type: "Account Deposit",
    amount: "N38,365",
    date: "23/05/2023 09:00 PM",
    status: 3,
  },
  {
    type: "Account Deposit",
    amount: "N38,365",
    date: "23/05/2023 09:00 PM",
    status: 1,
  },
  {
    type: "Account Deposit",
    amount: "N38,365",
    date: "23/05/2023 09:00 PM",
    status: 1,
  },
  {
    type: "Account Deposit",
    amount: "N38,365",
    date: "23/05/2023 09:00 PM",
    status: 2,
  },
];

const metrics = [
  {
    month: "January",
    amount: "N38,365",
  },
  {
    month: "February",
    amount: "N38,365",
  },

  {
    month: "March",
    amount: "N38,365",
  },
  {
    month: "April",
    amount: "N38,365",
  },

  {
    month: "May",
    amount: "N38,365",
  },
  {
    month: "June",
    amount: "N38,365",
  },

  {
    month: "July",
    amount: "N38,365",
  },
];

export default function Wallet() {


  const [topupModalOpen, setTopupModalOpen] = useState(false);
  return (
    <>
      {<TopupModal isOpen={topupModalOpen} setIsOpen={setTopupModalOpen} />}
      <div className="w-full mb-6 rounded-xl wallet py-4 px-6 flex justify-between items-center text-white">
        <div>
          <p className="text-sm">Available Balance</p>
          <h1>38,920</h1>
        </div>
        <Button
          className="bg-white text-base-clr hover:bg-gray-100"
          onClick={() => setTopupModalOpen(true)}
        >
          Add to Balance
        </Button>
      </div>
      <div className="flex gap-6">
        <div className="basis-2/3 bg-white border-[1px] border-stroke-clr rounded-xl">
          <div className="p-4 flex items-center justify-between">
            <p className="font-semibold">Transaction History</p>
            <div className="flex gap-1 items-center">
              <MixerHorizontalIcon />
              <p className="text-sm">Filters</p>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-stroke-clr">
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={`pointer-events-none ${
                        item.status === 1
                          ? "bg-green-600"
                          : item.status === 2
                          ? "border-yellow-500 border-[1px] text-yellow-500 bg-white"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status === 1
                        ? "Successful"
                        : item.status === 2
                        ? "Pending"
                        : "Failed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="basis-1/3 bg-white border-[1px] border-stroke-clr rounded-xl">
          <div className="p-4 flex items-center justify-between">
            <p className="font-semibold">Usage Metrics</p>
            <div className="flex gap-1 items-center">
              <MixerHorizontalIcon />
              <p className="text-sm">Filters</p>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-stroke-clr">
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
