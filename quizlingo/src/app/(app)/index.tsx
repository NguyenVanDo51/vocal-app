import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import React from 'react';

import { useUserGroups } from '@/api/groups/useUserGroups';
import { EmptyList, FocusAwareStatusBar, Pressable, Text, View } from '@/ui';
import { IGroup } from '@/api/groups/types';
import { useCategories } from '@/api/categories/useCategories';

export default function Feed() {
  const { data: userGroups, isPending } = useUserGroups();
  const { data: categories } = useCategories();

  const renderItem = React.useCallback(
    ({ item }: { item: IGroup }) => (
      <Link href={`/group/${item.id}/words`} key={item.id} asChild>
        <Pressable>
          <View className="group my-2 p-3 rounded-md bg-gray-100">
            <Text className="text-lg font-medium">{item.name}</Text>
            <Text className="text-gray-500 text-sm font-light">
              created_by: {item.created_by}%
            </Text>
          </View>
        </Pressable>
      </Link>
    ),
    [],
  );

  return (
    <View className="flex-1 px-3">
      <FocusAwareStatusBar />

      <Text>Featured Categories</Text>

      {categories?.map((category) => (
        <Link href={`/category/${category.id}`} key={category.id} asChild>
            <View>
              <Text>{category.name}</Text>
            </View>
        </Link>
      ))}

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
