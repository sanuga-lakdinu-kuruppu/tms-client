import { X, Edit2 } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import React, { useState } from "react";
import api from "@/lib/api";
import { PriorityBadge, StatusBadge } from "@/constants/constants";

export default function Sidebar({
  isOpen,
  selectedTask,
  onClose,
  onTaskUpdate,
  onTaskDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

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

  // Initialize edited task when selected task changes
  React.useEffect(() => {
    if (selectedTask) {
      setEditedTask({ ...selectedTask });
    }
  }, [selectedTask]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedTask({ ...selectedTask });
    setIsEditing(false);
    setError("");
  };

  const handleSave = async () => {
    if (!editedTask) return;

    setIsSaving(true);
    setError("");

    try {
      console.log(typeof editedTask.priority);
      const response = await api.task.updateTask(editedTask.taskId, {
        name: editedTask.name,
        description: editedTask.description,
        status: editedTask.status,
        priority: Number(editedTask.priority),
      });

      if (response.status === 200) {
        onTaskUpdate?.(editedTask);
        setIsEditing(false);
      } else {
        setError("Failed to update task.");
      }
    } catch (err) {
      setError("Something went wrong while updating.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editedTask) return;

    // if (!confirm(`Are you sure you want to delete task "${editedTask.name}"?`))
    //   return;

    setIsSaving(true);
    setError("");

    try {
      const response = await api.task.deleteTask(editedTask.taskId);

      if (response.status === 200) {
        onTaskDelete?.(editedTask.taskId);
        setIsEditing(false);
        onClose?.(); // close sidebar after deletion
      } else {
        setError("Failed to delete task.");
      }
    } catch (err) {
      setError("Something went wrong while deleting.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen || !selectedTask || !editedTask) return null;
  return (
    <div className="w-1/3 bg-white border-l border-gray-200 shadow-xl overflow-y-auto h-[calc(100vh-64px)]">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 sticky top-0">
          <h2 className="text-lg font-semibold text-gray-800">Task Details</h2>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="p-2 hover:bg-gray-200 cursor-pointer rounded transition"
                title="Edit task"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-3 py-1 cursor-pointer text-sm font-medium bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-3 py-1 cursor-pointer text-sm font-medium bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="px-3 py-1 cursor-pointer text-sm font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                >
                  Delete
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 cursor-pointer rounded transition"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 py-2 bg-red-50 border-b border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* Task ID (non-editable) */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task ID
              </label>
              <p className="mt-1 text-sm font-mono text-gray-800 bg-gray-50 p-2 rounded border border-gray-200">
                {editedTask.taskId}
              </p>
            </div>

            {/* Title - Editable */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedTask.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSaving}
                />
              ) : (
                <p className="mt-1 text-base font-medium text-gray-900">
                  {editedTask.name}
                </p>
              )}
            </div>

            {/* Status - Editable */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </label>
              {isEditing ? (
                <select
                  value={editedTask.status || ""}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSaving}
                >
                  <option value="CREATED">To Do</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Done</option>
                </select>
              ) : (
                <div className="mt-2">
                  <StatusBadge status={editedTask.status} />
                </div>
              )}
            </div>

            {/* Priority - Editable */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </label>
              {isEditing ? (
                <select
                  value={editedTask.priority || 1}
                  onChange={(e) =>
                    handleInputChange("priority", parseInt(e.target.value, 10))
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSaving}
                >
                  <option value="10">Critical (P10)</option>
                  <option value="9">Critical (P9)</option>
                  <option value="8">High (P8)</option>
                  <option value="7">High (P7)</option>
                  <option value="6">Medium (P6)</option>
                  <option value="5">Medium (P5)</option>
                  <option value="4">Low (P4)</option>
                  <option value="3">Low (P3)</option>
                  <option value="2">Trivial (P2)</option>
                  <option value="1">Trivial (P1)</option>
                </select>
              ) : (
                <div className="mt-2">
                  <PriorityBadge priority={editedTask.priority} />
                </div>
              )}
            </div>

            {/* Description - Editable */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={editedTask.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSaving}
                />
              ) : (
                <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {editedTask.description || "No description provided"}
                  </p>
                </div>
              )}
            </div>

            {/* Metadata (non-editable) */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Additional Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="text-gray-900">
                    {formatDate(editedTask.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="text-gray-900">
                    {formatDate(editedTask.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Save/Cancel buttons for mobile */}
            {isEditing && (
              <div className="flex gap-2 pt-4 border-t border-gray-200 sm:hidden">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-md text-sm font-medium hover:bg-red-200 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
