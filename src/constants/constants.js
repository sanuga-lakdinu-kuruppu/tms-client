import {
  LayoutDashboard,
  Clock,
  Users,
  Shield,
  Zap,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export const PriorityBadge = ({ priority }) => {
  const getPriorityStyle = (value) => {
    if (value >= 9) return "bg-red-100 text-red-700";
    if (value >= 7) return "bg-orange-100 text-orange-700";
    if (value >= 5) return "bg-yellow-100 text-yellow-700";
    if (value >= 3) return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  const getPriorityLabel = (value) => {
    if (value >= 9) return "Critical";
    if (value >= 7) return "High";
    if (value >= 5) return "Medium";
    if (value >= 3) return "Low";
    return "Trivial";
  };

  return (
    <span
      className={`inline-flex px-2 py-[2px] rounded text-xs font-semibold ${getPriorityStyle(
        priority
      )}`}
    >
      {getPriorityLabel(priority)} (P{priority})
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const statusStyles = {
    CREATED: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  const statusLabels = {
    CREATED: "To Do",
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Done",
  };

  return (
    <span
      className={`inline-flex px-2 py-[2px] rounded text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
};

export const PAGE_SIZE = 20;

export const BAR_CHART_STAT = [
  { label: "To Do", value: 40, color: "bg-gray-200" },
  { label: "In Progress", value: 65, color: "bg-blue-500" },
  { label: "Review", value: 25, color: "bg-yellow-500" },
  { label: "Completed", value: 80, color: "bg-green-500" },
];

export const STAT = [
  {
    label: "Total Tasks",
    value: "24",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    label: "In Progress",
    value: "12",
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Completed",
    value: "8",
    icon: CheckCircle,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    label: "Overdue",
    value: "4",
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
];

export const AVATARS = [
  {
    src: "/avatars/1.jpg",
    alt: "Sarah Chen",
  },
  {
    src: "/avatars/2.jpg",
    alt: "Michael Rodriguez",
  },
  {
    src: "/avatars/3.jpg",
    alt: "Emily Thompson",
  },
  {
    src: "/avatars/4.jpg",
    alt: "David Kim",
  },
];

export const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Intuitive Dashboard",
    description:
      "Get a clear overview of all your tasks, priorities, and deadlines in one place.",
    color: "blue",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Track time spent on tasks and improve your team's productivity.",
    color: "green",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Assign tasks, leave comments, and work together seamlessly.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and security protocols to protect your data.",
    color: "red",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance with real-time updates and instant sync.",
    color: "yellow",
  },
  {
    icon: Star,
    title: "Custom Workflows",
    description: "Create workflows that match your team's unique processes.",
    color: "indigo",
  },
];
