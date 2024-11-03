import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { AddOrEditWord } from '@/components/words/AddOrEditWord';

export default function AddPost() {

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sửa từ mới',
          headerBackTitle: 'Sửa từ mới',
        }}
      />
      <AddOrEditWord  />
    </>
  );
}
