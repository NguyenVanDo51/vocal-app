import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';

import {
  Button,
  EmptyList,
  FocusAwareStatusBar,
  Pressable,
  Text,
  View,
} from '@/ui';
import { useWords } from '@/api/words/useWords';
import { FlashList } from '@shopify/flash-list';
import { IWord } from '@/api/words/type';
import { useWordStore } from '@/api/words/useWordStore';
import { ThemedButton } from 'react-native-really-awesome-button';

export default function Post() {
  const { id: groupId } = useLocalSearchParams<{ id: string }>();
  const setWord = useWordStore((state) => {
    console.log('state', state);
    return state?.setWord || (() => {});
  });
  console.log('setWord', setWord);
  const router = useRouter();
  const { data, isPending, isError } = useWords({
    groupId: Number(groupId),
    offset: 0,
  });

  // if (isPending) {
  //   return (
  //     <View className="flex-1 justify-center  p-3">
  //       <FocusAwareStatusBar />
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  const renderItem = React.useCallback(
    ({ item }: { item: IWord }) => (
      <Pressable
        onPress={async () => {
          setWord(item);
          router.navigate(`/group/${groupId}/words/${item.id}/edit`);
        }}
      >
        <Text>{item.word}</Text>
      </Pressable>
    ),
    [setWord],
  );

  return (
    <View className="flex-1 p-3 ">
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          title: 'Details',
          headerBackTitle: 'Feed',
        }}
      />

      {(!data || data?.words?.length < 1) && (
        <Link href={`/group/${groupId}/words/add`} asChild>
          <Pressable>
            <Text className="px-3 text-primary-300">Thêm</Text>
          </Pressable>
        </Link>
      )}

      <FlashList
        data={data?.words}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
      />

      <View className='flex items-center gap-1'>
      <Link href={`/group/${groupId}/words/add`}>
        <ThemedButton name="rick" type="secondary">
          Add word
        </ThemedButton>
      </Link>

      <Link href={`/group/${groupId}/learn`}>
        <ThemedButton name="rick" type="primary">
          Start Quiz
        </ThemedButton>
        </Link>
        </View>
    </View>
  );
}
