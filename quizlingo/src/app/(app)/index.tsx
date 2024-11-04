import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import React from 'react';

import { useUserGroups } from '@/api/groups/useUserGroups';
import { EmptyList, FocusAwareStatusBar, Pressable, Text, View } from '@/ui';

export default function Feed() {
  const { data: userGroups, isPending } = useUserGroups();

  const renderItem = React.useCallback(
    ({ item }: { item: any }) => (
      <Link href={`/group/${item.id}/words`} asChild>
        <Pressable className="my-2 px-4">
          <Text>{item.name}</Text>
        </Pressable>
      </Link>
    ),
    [],
  );

  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <Link href="/group/create" asChild>
        <Pressable>
          <Text className="px-3 text-primary-300">Create</Text>
        </Pressable>
      </Link>

      <FlashList
        data={userGroups}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
      />
    </View>
  );
}
