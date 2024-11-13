import { Text } from '@/ui';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';


export default function Page() {

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Category',
          headerBackTitle: 'Category',
        }}
      />

      <Text>Category</Text>
    </>
  );
}
