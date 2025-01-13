import { Input } from "@/components/ui/input";

const AllAgents = () => {
  return (
    <div>
        <h1 className="font-normal">All Registered Agents</h1>
        <p className="mb-10">Manage all Field Agent information here.</p>
        <div className="w-full bg-white rounded-xl border-[1px] border-stroke-clr">
            <div className="w-full py-4 grid grid-cols-3 border-b-[1px] border-stroke-clr px-5">
                <div className="flex items-center gap-3">
                    <p>Filter by: </p>
                    <select name="" id="" className="btn px-3">
                        <option value="country">Country</option>
                        <option value="state">State</option>
                        <option value="lga">LGA</option>
                    </select>
                </div>
                <Input
                    type="text"
                    placeholder="Search by name"
                    className="max-w-sm"
                />
                <div className=""></div>
            </div>
            <div className="w-full h-[300px] flex justify-center items-center">
                <h3>No Registered Field Agent.</h3>
            </div>
        </div>
    </div>
  );
}

export default AllAgents;