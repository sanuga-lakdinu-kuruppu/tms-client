"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import { validateTask } from "@/util/util";

export default function NewTaskPage() {
  const router = useRouter();
  const [task, setTask] = useState({
    name: "",
    description: "",
    status: "CREATED",
    priority: 1,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validationError = validateTask(task);
      if (validationError) {
        setError(validationError);
        return;
      }

      setIsSaving(true);
      setError("");

      const res = await api.task.createTask({
        name: task.name,
        description: task.description,
        status: task.status,
        priority: Number(task.priority),
      });

      if (res.status === 200) {
        router.push("/tasks");
      } else {
        setError("Failed to create task.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.msg || "Something went wrong while creating task."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 p-2 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={task.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={task.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={task.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            >
              <option value="CREATED">To Do</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Done</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              value={task.priority}
              onChange={(e) =>
                handleInputChange("priority", Number(e.target.value))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            >
              <option value={10}>Critical (P10)</option>
              <option value={9}>Critical (P9)</option>
              <option value={8}>High (P8)</option>
              <option value={7}>High (P7)</option>
              <option value={6}>Medium (P6)</option>
              <option value={5}>Medium (P5)</option>
              <option value={4}>Low (P4)</option>
              <option value={3}>Low (P3)</option>
              <option value={2}>Trivial (P2)</option>
              <option value={1}>Trivial (P1)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? "Creating..." : "Create Task"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/tasks")}
              disabled={isSaving}
              className="px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
