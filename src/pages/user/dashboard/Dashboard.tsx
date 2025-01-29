import DashboardChart from "@/components/DashboardChart";
import { useFetchCardData } from "@/hooks/company";
import { FileMinusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  verified: number,
  inprogress: number,
  pending: number,
  failed: number,
}

export default function Dashboard() {
  const [cardData, setCardData] = useState<CardProps | null>(null);
  const { fetchCardData } = useFetchCardData();

  useEffect(() => {
    const getCardData = async () => {
      try {
        const data = await fetchCardData();
          setCardData(data.data);
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      }
    };

    getCardData();
  }, [fetchCardData]);  

  const cards = [
    {
      title: "Successful Verifications",
      qty: cardData?.verified,
      bg: 1,
    },
    {
      title: "Pending Verifications",
      qty: cardData?.pending,
      bg: 2,
    },
    {
      title: "Ongoing Verifications",
      qty: cardData?.inprogress,
      bg: 3,
    },
    {
      title: "Failed Verifications",
      qty: cardData?.failed,
      bg: 4,
    },
  ];

  const notifications = [
    {
      type: 1,
      title: "Neque porro quisquam est qui dolorem ipsum",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "2 hours ago",
    },
    {
      type: 1,
      title: "Neque porro quisquam est qui dolorem ipsum",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "2 hours ago",
    },
    {
      type: 2,
      title: "Neque porro quisquam est qui dolorem ipsum",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "2 hours ago",
    },
    {
      type: 3,
      title: "Neque porro quisquam est qui dolorem ipsum",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "2 hours ago",
    },
    {
      type: 2,
      title: "Neque porro quisquam est qui dolorem ipsum",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "2 hours ago",
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-4 gap-6 mb-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="w-full p-4 rounded-xl border-[1px] border-stroke-clr bg-white"
          >
            <div className="flex items-center gap-3">
              <span
                className={`min-w-10 min-h-10 rounded-full flex items-center justify-center text-white ${
                  card.bg === 1
                    ? "bg-[#006400]"
                    : card.bg === 2
                    ? "bg-[#e2a32e]"
                    : card.bg === 3
                    ? "bg-[#BE6AF2]"
                    : "bg-[#992929]"
                }`}
              >
                <FileMinusIcon />
              </span>
              <p className="font-medium">{card.title}</p>
            </div>
            <h1 className="mt-4">{card.qty}</h1>
          </div>
        ))}
      </div>

      <div className="w-full h-[300px] p-4 bg-white border-[1px] border-stroke-clr rounded-xl mb-6">
        <DashboardChart />
      </div>

      <div className="w-full p-4 bg-white border-[1px] border-stroke-clr rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Recent Activities</h3>
          <Link to="/notifications" className="text-sm hover:underline">
            See All
          </Link>
        </div>

        {notifications.map((item, idx) => (
          <div
            key={idx}
            className="w-full mt-4  bg-white rounded-xl border-stroke-clr border-[1px] p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 aspect-square rounded-full flex items-center justify-center text-sm ${
                  item.type === 1
                    ? "bg-purple-400"
                    : item.type === 2
                    ? "bg-orange-300"
                    : "bg-green-600"
                }`}
              >
                NT
              </div>
              <div className="w-full flex justify-between items-center gap-4">
                <div className="w-full">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs">{item.content}</p>
                </div>
              </div>
              <small className="text-xs min-w-max ">{item.date}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
