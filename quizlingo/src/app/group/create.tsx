import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { queryClient, useAddPost, usePosts } from '@/api';
import { Button, ControlledInput, showErrorMessage, View } from '@/ui';
import { useCreateGroup } from '@/api/groups/useCreateGroup';
import { useUserGroups } from '@/api/groups/useUserGroups';

const schema = z.object({
  name: z.string().min(5),
  description: z.string().max(100),
});

type FormType = z.infer<typeof schema>;

export default function AddPost() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const { mutate: createGroup, isPending } = useCreateGroup();

  const onSubmit = (data: FormType) => {
    console.log(data);
    createGroup(
      { ...data },
      {
        onSuccess: () => {
          showMessage({
            message: 'Post added successfully',
            type: 'success',
          });
          queryClient.invalidateQueries({ queryKey: ['my-groups'] });
          router.back();
        },
        onError: () => {
          showErrorMessage('Error adding post');
        },
      },
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add Post',
          headerBackTitle: 'Feed',
        }}
      />
      <View className="flex-1 p-4 ">
        <ControlledInput
          name="name"
          label="Name"
          control={control}
          testID="title"
        />
        <ControlledInput
          name="description"
          label="Description"
          control={control}
          multiline
          testID="body-input"
        />
        <Button
          label="Create"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
          testID="add-post-button"
        />
      </View>
    </>
  );
}
