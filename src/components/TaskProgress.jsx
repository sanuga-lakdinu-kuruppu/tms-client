import { BAR_CHART_STAT } from "@/constants/constants";
import { MoreHorizontal } from "lucide-react";

export default function TaskProgress() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-gray-700">Task Progress</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Dummy Bar Chart */}
        <div className="space-y-4">
          {BAR_CHART_STAT.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-gray-900 font-medium">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Dummy Legend */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-500">In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Review</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Completed</span>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-gray-700">Weekly Activity</h2>
          <select className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>

        {/* Dummy Line Chart Representation */}
        <div className="h-40 flex items-end justify-between gap-2 mb-4">
          {[35, 60, 45, 80, 55, 70, 40].map((height, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition"
                style={{ height: `${height}px` }}
              ></div>
              <span className="text-xs text-gray-400">
                {["M", "T", "W", "T", "F", "S", "S"][idx]}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          <span className="font-medium text-gray-900">42 tasks</span> completed
          this week
        </div>
      </div>
    </div>
  );
}
