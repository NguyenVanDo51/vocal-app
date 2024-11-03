import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { httpClient } from '@/services/httpClient';
import { IGroup } from './types'

type Variables = { name: string; description: string };
type Response = IGroup;

export const useCreateGroup = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    httpClient.post("/groups", variables).then((response) => response.data),
});
