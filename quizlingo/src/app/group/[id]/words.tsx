/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { ThemedButton } from 'react-native-really-awesome-button';

import { type IWord } from '@/api/words/type';
import { useWords } from '@/api/words/useWords';
import { useWordStore } from '@/api/words/useWordStore';
import { BUTTON_FULL_WIDTH } from '@/core/constant/dimenssions';
import { EmptyList, FocusAwareStatusBar, Pressable, Text, View } from '@/ui';

export default function Post() {
  const { id: groupId } = useLocalSearchParams<{ id: string }>();
  const setWord = useWordStore((state) => {
    console.log('state', state);
    return state?.setWord || (() => {});
  });
  console.log('setWord', setWord);
  const router = useRouter();
  const { data, isPending } = useWords({
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
    [groupId, router, setWord],
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

      <View className="flex items-center gap-1">
        <Link href={`/group/${groupId}/words/add`}>
          <ThemedButton
            name="rick"
            type="secondary"
            raiseLevel={1}
            width={BUTTON_FULL_WIDTH}
          >
            Add word
          </ThemedButton>
        </Link>

        <Link href={`/group/${groupId}/learn`}>
          <ThemedButton name="rick" type="primary" width={BUTTON_FULL_WIDTH}>
            Start Quiz
          </ThemedButton>
        </Link>
      </View>
    </View>
  );
}
