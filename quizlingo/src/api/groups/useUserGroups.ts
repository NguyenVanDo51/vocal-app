import { httpClient } from "@/services/httpClient"
import { useQuery } from "@tanstack/react-query"

export const useUserGroups = () => useQuery({
  queryKey: ['my-groups'],
  queryFn: () => httpClient.get(`/groups`).then((r) => r.data),
})