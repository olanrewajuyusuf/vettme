import { Input } from "@/components/ui/input";

const AllAddresses = () => {
  return (
    <div>
        <h1 className="font-normal">All personnel's addresses</h1>
        <p className="mb-10">Manage all Personnel's addresses to be verified or already verified.</p>
        <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
            <div className="w-full py-4 grid grid-cols-3 border-b-[1px] border-stroke-clr px-5">
                <div className="flex items-center gap-3">
                    <p>Filter by: </p>
                    <select name="" id="" className="btn px-3">
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    </select>
                </div>
                <Input
                    type="text"
                    placeholder="Search by address state, lga, country"
                    className="max-w-sm"
                />
                <div className=""></div>
            </div>
            <div className="w-full h-[300px] flex justify-center items-center">
                <h3>No available address data.</h3>
            </div>
        </div>
    </div>
  );
}

export default AllAddresses;