import { Calendar } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import React, { useState } from "react";
import { PriorityBadge, StatusBadge } from "@/constants/constants";
import { Clipboard } from "lucide-react";
import Link from "next/link";

export default function TasksTable({
  tasks,
  loading,
  error,
  onTaskSelect,
  onTaskUpdate,
}) {
  const [expandedRows, setExpandedRows] = useState({});

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date =
        typeof dateString === "string" ? parseISO(dateString) : dateString;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return dateString;
    }
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openTaskDetail = (task, e) => {
    e.stopPropagation();
    onTaskSelect(task);
  };

  const ShimmerRow = () => (
    <tr>
      {Array.from({ length: 4 }).map((_, i) => (
        <td key={i} className="px-3 py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </td>
      ))}
    </tr>
  );

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!loading && !tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white border border-gray-200 rounded-md text-center space-y-4">
        <Clipboard className="h-16 w-16 text-gray-300" />

        <h3 className="text-lg font-semibold text-gray-700">No tasks found</h3>
        <p className="text-sm text-gray-500">
          It looks like you don’t have any tasks yet. You can create a new task
          to get started.
        </p>

        <Link
          href="/tasks/new"
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          + Create New Task
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-md">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-2 text-left font-semibold text-gray-500">
              Task
            </th>
            <th className="px-3 py-2 text-left font-semibold text-gray-500">
              Status
            </th>
            <th className="px-3 py-2 text-left font-semibold text-gray-500">
              Priority
            </th>
            <th className="px-3 py-2 text-left font-semibold text-gray-500">
              Updated
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => <ShimmerRow key={i} />)}

          {!loading &&
            tasks.map((task) => (
              <React.Fragment key={task.taskId}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleRow(task.taskId)}
                >
                  <td className="px-3 py-2 flex items-center gap-2">
                    <span
                      className={`transition-transform transform inline-block ${
                        expandedRows[task.taskId] ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      ▶
                    </span>
                    <button
                      onClick={(e) => openTaskDetail(task, e)}
                      className="font-medium text-gray-700 cursor-pointer hover:text-blue-600 hover:underline text-left"
                    >
                      {task.name}
                    </button>
                  </td>

                  <td className="px-3 py-2">
                    <StatusBadge status={task.status} />
                  </td>

                  <td className="px-3 py-2">
                    <PriorityBadge priority={task.priority} />
                  </td>

                  <td className="px-3 py-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(task.updatedAt || task.createdAt)}
                    </div>
                  </td>
                </tr>

                {expandedRows[task.taskId] && (
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="px-6 py-3 text-sm text-gray-700">
                      <strong>Full Description:</strong>{" "}
                      {task.description || "No description provided"}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}
