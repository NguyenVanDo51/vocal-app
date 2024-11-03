import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { httpClient } from '@/services/httpClient';
import { IWord } from './type';

type Variables = IWord
type Response = number;

export const useAddWord = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    variables.id
      ? httpClient.put(`/words/${variables.id}`, variables).then((response) => response.data)
      : httpClient.post("/words", variables).then((response) => response.data),
});
