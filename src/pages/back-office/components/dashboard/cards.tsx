import { useFetchCardsData } from "@/hooks/backOffice";
import { FileMinusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface Cards {
  verified: number,
  failed: number,
  pending: number,
  inprogress: number,
}
const DashboardCards = () => {
  const [card, setCard] = useState<Cards | null>(null);
  const {fetchCardsData} = useFetchCardsData();

  const cardsData = [
    {
      title: "Successful Verifications",
      qty: card?.verified,
      bg: 1,
    },
    {
      title: "Pending Verifications",
      qty: card?.pending,
      bg: 2,
    },
    {
      title: "Ongoing Verifications",
      qty: card?.inprogress,
      bg: 3,
    },
    {
      title: "Failed Verifications",
      qty: card?.failed,
      bg: 4,
    },
  ];

  useEffect(()=>{
    const getCardsData = async () => {
      try {
        const data = await fetchCardsData();
        setCard(data.data);
      } catch (error) {
        console.error("Failed to fetch cards data:", error);
      }
    };

    getCardsData();
  }, [fetchCardsData])
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
        {cardsData.map((card, idx) => (
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
  )
}

export default DashboardCards;