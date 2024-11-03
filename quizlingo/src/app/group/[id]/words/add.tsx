import { Stack } from 'expo-router';
import * as React from 'react';

import { AddOrEditWord } from '@/components/words/AddOrEditWord';

export default function AddPost() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Thêm từ mới',
          headerBackTitle: 'Thêm từ mới',
        }}
      />
      <AddOrEditWord />
    </>
  );
}
