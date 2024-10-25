import HomeClient from "./components/HomeClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt')
  if (!jwt) {
    return redirect('/')
  }

  return <HomeClient />
}
