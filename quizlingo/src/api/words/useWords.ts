import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/services/httpClient';
import { IWord } from './type';

type Variables = { groupId: number, offset?: number }
type Response = {
  words: IWord[],
  hasMore: boolean
}

export const useWords = ({ groupId, offset = 0 }: Variables) => {

  return useQuery({
    queryKey: ['group', groupId, 'words', offset],
    queryFn: ({ queryKey }): Promise<Response> => {
      return httpClient.get(`/words?group_id=${queryKey[1]}&offset=${queryKey[3]}`).then((r) => r.data)
    }
  })
}