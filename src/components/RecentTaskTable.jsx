import { Calendar, Filter, Search } from "lucide-react";
import { LATEST_TASKS } from "@/constants/constants";
import Link from "next/link";

export default function RecentTaskTable() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-700">Recent Tasks</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="text-left py-3 px-6 font-medium">Task</th>
              <th className="text-left py-3 px-6 font-medium">Status</th>
              <th className="text-left py-3 px-6 font-medium">Priority</th>
              <th className="text-left py-3 px-6 font-medium">Due Date</th>
              <th className="text-left py-3 px-6 font-medium">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {LATEST_TASKS.map((task, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="py-3 px-6">
                  <div className="text-sm text-gray-900">{task.task}</div>
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : task.status === "Review"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`text-xs ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-3 h-3" />
                    {task.due}
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
                      {task.assignee[0]}
                    </div>
                    <span className="text-sm text-gray-600">
                      {task.assignee}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200 text-center">
        <Link
          href="/tasks"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View all tasks →
        </Link>
      </div>
    </div>
  );
}
