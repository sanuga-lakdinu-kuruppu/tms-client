import Navbar from "@/components/Navbar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardStat from "@/components/DashboardStat";
import TaskProgress from "@/components/TaskProgress";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-4 lg:px-8 py-8">
        <DashboardHeader />
        <DashboardStat />
        <TaskProgress />
      </div>
    </div>
  );
}
