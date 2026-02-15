import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back!</p>
      </div>
      <Link
        href="/tasks/new"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-md hover:bg-blue-700 transition text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Create Task
      </Link>
    </div>
  );
}
