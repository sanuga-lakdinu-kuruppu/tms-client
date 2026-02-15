import NewTaskClient from "./newTaskClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewTaskPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  return <NewTaskClient />;
}
