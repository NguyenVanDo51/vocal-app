import LearnCollection from "./components/LearnCollection"
import { httpClient } from "@/services/httpClient"

export default async function Page(props) {
  const data = await httpClient.get(`/collections/${props.params.id}`).then((r) => r.data)
  if (!data) {
    return <div>Not found</div>
  }

  return <LearnCollection collection={data} />
}