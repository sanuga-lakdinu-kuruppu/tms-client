import { formatDistanceToNow, parseISO } from "date-fns";

export const validateTask = (task) => {
  const name = task?.name?.trim();
  const description = task?.description?.trim() || "";
  const status = task?.status;
  const priority = Number(task?.priority);

  if (!name && !description) {
    return "Please enter task title and description.";
  }

  if (!name) {
    return "Task title is required.";
  }

  if (name.length < 3) {
    return "Task title must be at least 3 characters long.";
  }

  if (name.length > 100) {
    return "Task title cannot exceed 100 characters.";
  }

  if (description.length > 1000) {
    return "Description cannot exceed 1000 characters.";
  }

  const validStatuses = ["CREATED", "PENDING", "IN_PROGRESS", "COMPLETED"];
  if (!validStatuses.includes(status)) {
    return "Invalid task status selected.";
  }

  if (isNaN(priority)) {
    return "Priority is required.";
  }

  if (priority < 1 || priority > 10) {
    return "Priority must be between 1 and 10.";
  }

  return null;
};

export const formatDate = (dateString) => {
  if (!dateString) return "—";
  try {
    const date =
      typeof dateString === "string" ? parseISO(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return dateString;
  }
};

export const validateLogin = (email, password) => {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail && !password) {
    return "Please enter your email and password.";
  }
  if (!normalizedEmail) {
    return "Email is required.";
  }
  if (!password) {
    return "Password is required.";
  }
  if (normalizedEmail.length > 254) {
    return "Email is too long.";
  }
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(normalizedEmail)) {
    return "Please enter a valid email address.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (password.length > 128) {
    return "Password is too long.";
  }
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!strongPasswordRegex.test(password)) {
    return "Password must include uppercase, lowercase, number, and special character.";
  }

  return null;
};
