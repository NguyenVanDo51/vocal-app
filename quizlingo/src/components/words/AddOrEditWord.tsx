import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { queryClient } from '@/api';
import {
  Button,
  ControlledInput,
  Pressable,
  showErrorMessage,
  View,
  Text,
} from '@/ui';
import { useAddWord } from '@/api/words/useAddWord';
import { IWord } from '@/api/words/type';
import { useWordStore } from '@/api/words/useWordStore';
import { useWordSuggest } from '@/api/words/use-word-suggest';
import { useWordInfo } from '@/api/words/use-word-info';
import { TextInput as PaperTextInput } from 'react-native-paper';

const schema = z.object({
  word: z.string().min(1).max(100),
  meaning: z.string().min(1).max(100),
  proun: z.string().optional(),
  example: z.string().max(255).optional(),
});

type FormType = z.infer<typeof schema>;

export function AddOrEditWord() {
  const router = useRouter();
  const { id: groupId } = useLocalSearchParams<{ id: string }>();
  const { word = {} as IWord, removeWord } = useWordStore((state) => state);
  const { control, handleSubmit, setValue, watch } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const wordText = watch('word');

  const { mutate: addWord, isPending } = useAddWord();
  const { data: wordSuggestion } = useWordSuggest({ text: wordText });
  const { mutate: getWordInfo, isPending: isGetWordInfoPending } = useWordInfo({
    onSuccess: (data) => {
      if (data?.meaning) {
        setValue('meaning', data.meaning);
        setValue('proun', data.proun);
        setValue('example', data.example || '');
      }
    },
  });

  React.useEffect(() => {
    if (word?.id) {
      setValue('word', word.word);
      setValue('proun', word.proun);
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
      <View className="flex-1 p-3">
        <View className="flex-1 gap-2">
          <ControlledInput name="word" label="Từ mới" control={control} />

          <View className="flex flex-row flex-wrap gap-2">
            {wordSuggestion &&
              wordSuggestion?.length > 1 &&
              wordSuggestion.map((w, i) => (
                <Pressable key={i} onPress={() => setValue('word', w)}>
                  <View className="rounded-full border px-3">
                    <Text>{w}</Text>
                  </View>
                </Pressable>
              ))}
          </View>

          <Button
            label="auto fill"
            loading={isGetWordInfoPending}
            onPress={() => {
              getWordInfo({ text: wordText });
            }}
          />

          <ControlledInput name="meaning" label="Ý nghĩa" control={control} />
          <ControlledInput name="proun" label="Phiên âm" control={control} />
          <ControlledInput name="example" label="Ví dụ" control={control} />
        </View>

        <Button
          label="Create"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
}
