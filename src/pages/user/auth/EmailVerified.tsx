import images from "@/assets/Images";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function EmailVerified() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>You're good to go!</h1>
      <div className="mt-10 w-[300px] flex items-center justify-center flex-col text-center">
        <img src={images.thumb} alt="Email" className="w-[150px]" />
        <p className="mt-4">
          Your account creation process is complete and your account has been
          activated successfully. Please login with your credentials
        </p>
        <Link to="/auth/login" className="mt-6">
          <Button className="red-gradient">Login</Button>
        </Link>
      </div>
    </div>
  );
}
