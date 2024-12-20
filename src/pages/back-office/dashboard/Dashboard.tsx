import DashboardCards from "../components/dashboard/cards";
import BackOfficeVerifications from "../components/dashboard/verification";

const BackOfficeDashboard = () => {

  return (
    <div className="px-10 pb-10">
      <DashboardCards />
      <BackOfficeVerifications />
    </div>
  )
}

export default BackOfficeDashboard
