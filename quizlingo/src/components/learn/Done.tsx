import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@/ui';

type DoneProps = {
  analysis: {
    maxStreak: number;
  };
};

export const Done: React.FC<DoneProps> = ({ analysis }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      {/* <Lottie
        source={require('@/assets/success.lottie')}
        autoPlay
        loop
        style={{ width: 333, height: 222 }}
      /> */}

      <Text className="text-2xl font-bold text-primary">
        Well done! You have completed this collection!
      </Text>

      <View className="flex flex-col gap-3 text-lg font-medium">
        <Text>You earned: 10 DCoin</Text>
        <Text>Max streak: {analysis?.maxStreak}</Text>
      </View>

      <View className="flex flex-row gap-4">
        <Button
          // variant="doulingo"
          label="Share"
        ></Button>
        <Button
          // variant="doulingo"
          // status="primary"
          onPress={() => navigation.goBack()}
          label="Go Home"
        ></Button>
      </View>
    </View>
  );
};
