import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { queryClient } from '@/api';
import { Button, ControlledInput, showErrorMessage, View } from '@/ui';
import { useCreateGroup } from '@/api/groups/useCreateGroup';
import { useUserGroups } from '@/api/groups/useUserGroups';
import { useAddWord } from '@/api/words/useAddWord';
import { IWord } from '@/api/words/type';
import { useWordStore } from '@/api/words/useWordStore';

const schema = z.object({
  word: z.string().min(1).max(100),
  meaning: z.string().min(1).max(100),
  example: z.string().max(255).optional(),
});

type FormType = z.infer<typeof schema>;

export function AddOrEditWord() {
  const router = useRouter();
  const { id: groupId } = useLocalSearchParams<{ id: string }>();
  const { word = {} as IWord, removeWord } = useWordStore((state) => state);
  console.log('word', word);
  const { control, handleSubmit, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const { mutate: addWord, isPending } = useAddWord();

  React.useEffect(() => {
    if (word?.id) {
      setValue('word', word.word);
      setValue('meaning', word.meaning);
      setValue('example', word.example || '');
    }
  }, [word]);

  const onSubmit = (data: FormType) => {
    addWord(
      {
        ...word,
        group_id: Number(groupId),
        ...data,
      },
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
          title: 'Thêm từ mới',
          headerBackTitle: 'Thêm từ mới',
        }}
      />
      <View className="flex-1 p-4 ">
        <ControlledInput name="word" label="Từ mới" control={control} />
        <ControlledInput name="meaning" label="Ý nghĩa" control={control} />
        <ControlledInput name="example" label="Ví dụ" control={control} />
        <Button
          label="Create"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
}
