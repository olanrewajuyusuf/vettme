import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Account() {

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };
  return (
    <>
    <form onSubmit={handleUpdate}>
      <div className="mb-[30px]">
        <h2>Account</h2>
        <p className="text-sm">Manage and update your account information </p>
      </div>
      <label className="block w-full mb-4">
        <p>Company Name</p>
        <Input type="text" placeholder="e.g. John Doe Holdings" />
      </label>
      <label className="block w-full mb-4">
        <p>Company ID</p>
        <Input type="text" disabled placeholder="RC 12341234" />
      </label>
      <label className="block w-full mb-4">
        <p>Company Address</p>
        <Input
          type="text"
          placeholder="e.g. somewehere street, Lagos Nigeria"
        />
      </label>
      {/* <label className="block w-full mb-4">
        <p>Application Username</p>
        <Input type="text" placeholder="John Doe" />
      </label> */}
      <label className="block w-full mb-4">
        <p>Choose new Avatar</p>
        <Input type="file" accept="image/*" className="cursor-pointer" />
      </label>
      <Button type="submit" className="red-gradient mb-2">
          Save Changes
      </Button>
      </form>
     
     <form>
      <hr className="mb-6" />
      <h2 className="font-semibold mb-6">Update Password</h2>
      <label className="block w-full mb-4">
        <p>Old Password</p>
        <Input type="password" placeholder="*********" minLength={8} />
      </label>
      <label className="block w-full mb-4">
        <p>New Password</p>
        <Input type="password" placeholder="*********" minLength={8} />
      </label>
      <label className="block w-full mb-4">
        <p>Confirm new Password</p>
        <Input type="password" placeholder="*********" minLength={8} />
      </label>
      <div className="flex gap-3 items-center">
        <Button type="submit" className="red-gradient">
          Save Changes
        </Button>
        <Button
          type="reset"
          className="bg-gray-200 text-base-clr hover:bg-gray-300"
        >
          Reset
        </Button>
      </div>
    </form>
    </>
  );
}
