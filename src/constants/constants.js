import { LayoutDashboard, Clock, Users, Shield, Zap, Star } from "lucide-react";

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
