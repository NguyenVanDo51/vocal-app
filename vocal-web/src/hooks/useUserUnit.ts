import { httpClient } from "@/services/httpClient"
import { useQuery } from "@tanstack/react-query"
import { useProfile } from "./useProfile"

export const useUserUnit = () => {
  const { profile } = useProfile()
  const { data, refetch } = useQuery({
    queryKey: ['unit', profile?.id],
    queryFn: () => httpClient.get(`/users/${profile.id}/unit`).then(res => [...(res.data || []), { id: -1, name: 'No Unit' }]),
    enabled: !!profile?.id
  })

  return {
    userUnit: data,
    refetchUserUnit: refetch
  }
}