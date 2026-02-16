"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import { validateTask } from "@/util/util";

export default function NewTaskPage() {
  const router = useRouter();

  const emptyTask = {
    name: "",
    description: "",
    status: "CREATED",
    priority: 1,
  };

  const [mode, setMode] = useState("single");
  const [task, setTask] = useState(emptyTask);
  const [batchTasks, setBatchTasks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddToBatch = () => {
    const validationError = validateTask(task);
    if (validationError) {
      setError(validationError);
      return;
    }

    setBatchTasks((prev) => [
      ...prev,
      { ...task, statusBadge: null, errorMessage: null },
    ]);
    setTask(emptyTask);
    setError("");
  };

  const handleRemoveFromBatch = (index) => {
    setBatchTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      if (mode === "single") {
        const validationError = validateTask(task);
        if (validationError) {
          setError(validationError);
          setIsSaving(false);
          return;
        }

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
      } else {
        if (batchTasks.length === 0) {
          setError("Please add at least one task to batch.");
          setIsSaving(false);
          return;
        }

        try {
          const res = await api.task.createTasksBatch({
            tasks: batchTasks.map((t) => ({
              name: t.name,
              description: t.description,
              status: t.status,
              priority: Number(t.priority),
            })),
          });

          if (res.status === 200) {
            const results = res.data?.data?.results || [];
            const updatedBatch = batchTasks.map((t, index) => {
              const result = results[index];
              if (!result) return t;
              if (result.status === "success") {
                return { ...t, statusBadge: "success", errorMessage: null };
              } else {
                return {
                  ...t,
                  statusBadge: "failed",
                  errorMessage:
                    result.error || "Failed due to server-side validation",
                };
              }
            });
            setBatchTasks(updatedBatch);
          } else {
            setError("Batch task creation failed.");
          }
        } catch (err) {
          if (err?.response?.status === 400) {
            const validationErrors = err.response.data.errors;

            const friendlyErrors = validationErrors.map((e, idx) => {
              let fieldName = "";
              switch (e.field) {
                case "name":
                  fieldName = "Title";
                  break;
                case "description":
                  fieldName = "Description";
                  break;
                case "status":
                  fieldName = "Status";
                  break;
                case "priority":
                  fieldName = "Priority";
                  break;
                default:
                  fieldName = e.field;
              }

              return `${fieldName}: ${e.message}`;
            });

            setError(
              `Some tasks could not be created:\n- ${friendlyErrors.join(
                "\n- "
              )}`
            );
          } else {
            setError(
              err?.response?.data?.msg ||
                "Something went wrong while creating tasks."
            );
          }
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  const renderTaskForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={task.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          disabled={isSaving}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={task.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={4}
          disabled={isSaving}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={task.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
          disabled={isSaving}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="CREATED">To Do</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Done</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          value={task.priority}
          onChange={(e) =>
            handleInputChange("priority", Number(e.target.value))
          }
          disabled={isSaving}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {mode === "batch" && (
        <button
          type="button"
          onClick={handleAddToBatch}
          className="px-4 py-2 mt-2 bg-gray-900 hover:bg-gray-800 text-white rounded cursor-pointer disabled:opacity-50"
          disabled={isSaving}
        >
          + Add Task to Batch
        </button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => {
              setMode("single");
              setBatchTasks([]);
              setTask(emptyTask);
            }}
            className={`px-4 py-2 rounded ${
              mode === "single"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 cursor-pointer text-gray-700"
            }`}
          >
            Single Task
          </button>
          <button
            type="button"
            onClick={() => setMode("batch")}
            className={`px-4 py-2 rounded ${
              mode === "batch"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 cursor-pointer text-gray-700"
            }`}
          >
            Upload As Batch
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-2 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderTaskForm()}

          {mode === "batch" && batchTasks.length > 0 && (
            <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-2">Title</th>
                    <th className="text-left px-4 py-2">Priority</th>
                    <th className="text-left px-4 py-2">Status</th>
                    <th className="text-left px-4 py-2">Result</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {batchTasks.map((t, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{t.name}</td>
                      <td className="px-4 py-2">P{t.priority}</td>
                      <td className="px-4 py-2">{t.status}</td>
                      <td className="px-4 py-2">
                        {t.statusBadge === "success" && (
                          <span className="text-green-600 font-medium">
                            ✓ Success
                          </span>
                        )}
                        {t.statusBadge === "failed" && (
                          <span className="text-red-600 font-medium">
                            ✕ Failed: {t.errorMessage}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveFromBatch(index)}
                          className="text-red-500 cursor-pointer hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 cursor-pointer bg-gray-900 hover:bg-gray-800 text-white rounded disabled:opacity-50"
            >
              {isSaving
                ? mode === "single"
                  ? "Creating..."
                  : "Processing..."
                : mode === "single"
                ? "Create Task"
                : "Create Tasks"}
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
