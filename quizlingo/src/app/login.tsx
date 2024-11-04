import { useAuth, useOAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';

import LoginScreen from '@/components/auth/login/index';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const { isSignedIn } = useAuth();

  const { signOut } = useAuth();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      console.log('startOAuthFlow');
      const {
        createdSessionId,
        setActive: setActiveOAuth,
        authSessionResult,
      } = await startOAuthFlow();

      console.log('createdSessionId', { createdSessionId, authSessionResult });

      if (createdSessionId && setActiveOAuth) {
        await setActiveOAuth({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
        // await signIn()
        console.log('signOut');
        await signOut();
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [signOut, startOAuthFlow]);

  if (isSignedIn) {
    return <Redirect href={'/'} />;
  }

  return (
    <>
      <FocusAwareStatusBar />

      <LoginScreen onPress={onPress} />
    </>
  );
}
