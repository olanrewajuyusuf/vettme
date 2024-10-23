import images from "@/assets/Images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function Support() {
  const messages = [
    {
      type: 1,
      text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
      time: "Monday, Oct 12, 2024 | 12:00 AM",
    },
    {
      type: 2,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
      time: "Monday, Oct 12, 2024 | 12:00 AM",
    },
    {
      type: 2,
      text: "Contrary to popular belief",
      time: "Monday, Oct 12, 2024 | 12:00 AM",
    },
    {
      type: 1,
      text: "The standard chunk",
      time: "Monday, Oct 12, 2024 | 12:00 AM",
    },
    {
      type: 1,
      text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
      time: "Monday, Oct 12, 2024 | 12:00 AM",
    },
    {
      type: 2,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
      time: "Monday, Oct 12, 2024 | 12:00 AM",
    },
    {
      type: 2,
      text: "Contrary to popular belief",
      time: "Monday, Oct 12, 2024 | 12:00 AM",
    },
    {
      type: 1,
      text: "The standard chunk",
      time: "Monday, Oct 12, 2024 | 12:00 AM",
    },
  ];
  return (
    <>
      <div className="mb-[30px]">
        <h2>Support</h2>
        <p className="text-sm">Get help, contact us or report a problem</p>
      </div>

      <div className="w-full flex gap-6">
        <div className="basis-2/3 bg-white rounded-xl border-[1px] border-stroke-clr overflow-hidden">
          <div className="w-full p-4 flex items-center gap-3 border-b-[1px] border-stroke-clr">
            <div className="w-10 h-10 rounded-full aspect-square p-2 border-[1px] border-green-600 relative">
              <img
                src={images.favicon}
                alt="Vettme Support"
                className="w-full h-full object-contain"
              />
              <div className="w-3 h-3 rounded-full bg-green-600 absolute left-0 top-0"></div>
            </div>
            <div className="flex flex-col">
              <p className="font-medium">Vettme Customer Support</p>
              <small className="text-[10px]">
                Typically responds within four hours
              </small>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 p-3 h-[400px] overflow-y-scroll">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`p-2 max-w-[45%] rounded-lg relative ${
                  message.type === 1
                    ? "bg-yellow-100 self-start sent-mssg"
                    : "bg-purple-100 self-end received-mssg"
                }`}
              >
                <p className="text-xs">{message.text}</p>
                <hr className="my-1" />
                <p className="text-[8px] text-right font-medium">
                  {message.time}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full flex gap-3 bg-gray-200 p-3">
            <Input
              type="text"
              className="w-full font-normal"
              placeholder="Type your message here..."
            />
            <Button className="w-10 h-10 aspect-square rounded-full flex items-center justify-center p-1 bg-yellow-500 hover:bg-yellow-600">
              <PaperPlaneIcon className="-rotate-[30deg] text-base-clr" />
            </Button>
          </div>
        </div>
        <div className="basis-1/3 flex flex-col gap-6">
          <div className="w-full bg-white p-4 border-[1px] border-stroke-clr rounded-xl">
            <h3 className="font-semibold">Call for Help</h3>
            <p className="my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud
            </p>
            <div className="flex items-center gap-3 text-green-600">
              <img src={images.phone} alt="Phone" className="w-5" />
              <Link to="tel:+2348131235467" className="font-semibold">
                +234 813 123 5467
              </Link>
            </div>
          </div>
          <div className="w-full bg-white p-4 border-[1px] border-stroke-clr rounded-xl">
            <h3 className="font-semibold">Send a Mail</h3>
            <p className="my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud
            </p>
            <div className="flex items-center gap-3 text-green-600">
              <img src={images.email} alt="Phone" className="w-5" />
              <Link to="mailto:support@vettme.ng" className="font-semibold">
                support@vettme.ng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
