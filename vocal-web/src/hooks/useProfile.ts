import { httpClient } from "@/services/httpClient"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => httpClient.get('/profile').then(res => res.data)
  })

  return {
    profile: data
  }
}