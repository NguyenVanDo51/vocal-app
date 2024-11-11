/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { ThemedButton } from 'react-native-really-awesome-button';

import { type IWord } from '@/api/words/type';
import { useWords } from '@/api/words/useWords';
import { useWordStore } from '@/api/words/useWordStore';
import { BUTTON_FULL_WIDTH } from '@/core/constant/dimenssions';
import {
  ActivityIndicator,
  EmptyList,
  FocusAwareStatusBar,
  Pressable,
  Text,
  View,
} from '@/ui';

export default function Post() {
  const { id: groupId } = useLocalSearchParams<{ id: string }>();
  const setWord = useWordStore((state) => {
    return state?.setWord || (() => {});
  });
  const router = useRouter();
  const { data, isPending } = useWords({
    groupId: Number(groupId),
    offset: 0,
  });

  const renderItem = React.useCallback(
    ({ item }: { item: IWord }) => (
      <Pressable
        onPress={async () => {
          setWord(item);
          router.navigate(`/group/${groupId}/words/${item.id}/edit`);
        }}
      >
        <Text>
          {item.word} - {item.meaning}
        </Text>
      </Pressable>
    ),
    [groupId, router, setWord],
  );

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 p-3 ">
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{
          title: 'Details',
          headerBackTitle: 'Feed',
        }}
      />

      <FlashList
        data={data?.words}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
      />

      <View className="flex items-center gap-1">
        <ThemedButton
          name="rick"
          type="secondary"
          raiseLevel={1}
          width={BUTTON_FULL_WIDTH}
          onPress={() => {
            router.push(`/group/${groupId}/words/add`);
          }}
        >
          Add word
        </ThemedButton>

        <ThemedButton
          name="rick"
          type="primary"
          width={BUTTON_FULL_WIDTH}
          onPress={() => {
            router.push(`/group/${groupId}/learn`);
          }}
        >
          Start Quiz
        </ThemedButton>
      </View>
    </View>
  );
}
