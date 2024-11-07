import { httpClient } from '@/services/httpClient';
import { createMutation } from 'react-query-kit';
import { AxiosError } from 'axios';
import { IWord } from './type';

type Variables = { text: string };
type Response = IWord;

export const useWordInfo = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    httpClient
      .get(`/words/info?word=${variables.text}`)
      .then((response) => response.data),
});
