import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/services/httpClient';
import { useEffect, useState } from 'react';

type Variables = { text: string };
type Response = string[];

let i: any

export const useWordSuggest = ({ text }: Variables) => {
  const [seachInput, setSearchInput] = useState('')

  useEffect(() => {
    clearTimeout(i)
    i = setTimeout(() => {
      setSearchInput(text)
    }, 500)
  }, [text])

  return useQuery({
    queryKey: ['word-suggest', seachInput],
    queryFn: ({ queryKey }): Promise<Response> => {
      return httpClient
        .get(`/words/suggest?word=${queryKey[1]}`)
        .then((r) => r.data);
    },
    enabled: seachInput?.length > 2,
  });
};
