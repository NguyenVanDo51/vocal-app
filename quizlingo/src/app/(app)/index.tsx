import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { EmptyList, FocusAwareStatusBar, Pressable, Text, View } from '@/ui';
import { useUserGroups } from '@/api/groups/useUserGroups';
import { Link } from 'expo-router';

export default function Feed() {
  const { data: userGroups, isPending } = useUserGroups();

  const renderItem = React.useCallback(
    ({ item }: { item: any }) => (
      <Link href={`/group/${item.id}/words`} asChild>
        <Pressable className="px-4 my-2">
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
