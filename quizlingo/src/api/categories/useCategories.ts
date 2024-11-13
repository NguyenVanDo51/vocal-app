import { httpClient } from "@/services/httpClient"
import { useQuery } from "@tanstack/react-query"
import { ICategory } from "./type"

export const useCategories = () => useQuery<ICategory[]>({
  queryKey: ['categories'],
  queryFn: () => httpClient.get(`/categories`).then((r) => r.data),
})