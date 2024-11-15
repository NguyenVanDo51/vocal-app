/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useIsFirstTime } from '@/core';
import { Pressable, Text } from '@/ui';
import {
  Feed as FeedIcon,
  Settings as SettingsIcon,
  Style as StyleIcon,
} from '@/ui/icons';
import { useAuth } from '@clerk/clerk-expo';
import { httpClient } from '@/services/httpClient';
import { storage } from '@/core/storage';

export default function TabLayout() {
  const [isFirstTime] = useIsFirstTime();
  const [isLoading, setIsLoading] = React.useState(true);

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  const { isSignedIn, userId, getToken, signOut } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    httpClient
      .post('/auth/google', {
        userId,
      })
      .then((res) => {
        if (res.data) {
          storage.set('token', res.data);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          storage.delete('token');
        }
      })
      .finally(() => {
        setIsLoading(false);
        hideSplash();
      });
  }, []);

  if (!isSignedIn) {
    return <Redirect href={'/login'} />;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          headerRight: () => <CreateNewPostLink />,
          tabBarTestID: 'feed-tab',
        }}
      />

      <Tabs.Screen
        name="style"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/group/create" asChild>
      <Pressable>
        <Text className="px-3 text-primary-300">Add</Text>
      </Pressable>
    </Link>
  );
};
