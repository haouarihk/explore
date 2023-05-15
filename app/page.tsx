import { redirect } from "next/navigation";

export default async function Main() {
  return redirect("/feed");
}