"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TasksTable from "@/components/TasksTable";
import api from "@/lib/api";
import { PAGE_SIZE } from "@/constants/constants";
import Sidebar from "@/components/Sidebar";

export default function TaskClient() {
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [tasksError, setTasksError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [nextToken, setNextToken] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (startKey = null, append = false) => {
    try {
      append ? setLoadingMore(true) : setTasksLoading(true);

      const url = startKey
        ? `v1/tasks?startKey=${encodeURIComponent(startKey)}&limit=${PAGE_SIZE}`
        : `v1/tasks?limit=${PAGE_SIZE}`;

      const res = await api.task.getTasks(url);

      if (res.status === 200) {
        const response = res.data;
        const data = response.data;

        setTasks((prev) =>
          append ? [...prev, ...(data.tasks || [])] : data.tasks || []
        );

        setNextToken(data.nextToken || null);
        setHasMore(data.hasMore || false);
      } else {
        setTasksError("Failed to load tasks.");
      }
    } catch (err) {
      setTasksError(
        err?.response?.data?.msg || "Something went wrong while fetching tasks."
      );
    } finally {
      setTasksLoading(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setNextToken(null);
    fetchTasks(null, false);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
  };

  const openTaskDetail = (task) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedTask(null), 300);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      )
    );

    setSelectedTask(updatedTask);
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));

    if (selectedTask?.taskId === taskId) {
      closeSidebar();
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.name?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesPriority = priorityFilter
        ? task.priority.toString() === priorityFilter
        : true;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Main content with flex layout */}
      <div className="flex">
        {/* Content area - adjusts width when sidebar is open */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-[calc(100%-384px)]" : "w-full"
          }`}
        >
          <div className="px-4 sm:px-6 py-4">
            {/* Filters + Actions */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="border border-gray-300 rounded px-3 py-2 text-sm w-64"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="CREATED">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Done</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">All Priorities</option>
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

                <button
                  onClick={resetFilters}
                  className="px-3 py-2 text-sm cursor-pointer border border-gray-300 rounded hover:bg-gray-100"
                >
                  Reset Filters
                </button>

                <button
                  onClick={handleRefresh}
                  className="px-3 py-2 text-sm cursor-pointer border border-gray-300 rounded hover:bg-gray-100"
                >
                  Refresh
                </button>
              </div>

              <Link
                href="/tasks/new"
                className="inline-flex justify-center bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded"
              >
                + New Task
              </Link>
            </div>

            <TasksTable
              tasks={filteredTasks}
              loading={tasksLoading}
              error={tasksError}
              onTaskSelect={openTaskDetail}
              onTaskUpdate={handleTaskUpdate}
            />

            {hasMore && !tasksLoading && (
              <div className="flex justify-center py-4">
                <button
                  onClick={() => fetchTasks(nextToken, true)}
                  disabled={loadingMore}
                  className="px-4 py-2 text-sm cursor-pointer font-medium border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          selectedTask={selectedTask}
          onClose={closeSidebar}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
      </div>
    </div>
  );
}
