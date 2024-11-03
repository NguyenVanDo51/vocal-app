import { Redirect } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { FocusAwareStatusBar, Text, TouchableOpacity } from '@/ui';
import { useAuth, useOAuth } from '@clerk/clerk-expo';

export default function Login() {
  const { isSignedIn, ...auth } = useAuth();

  const { signOut } = useAuth();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      console.log('startOAuthFlow');
      const {
        createdSessionId,
        signIn,
        signUp,
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
  }, []);

  if (isSignedIn) {
    return <Redirect href={'/'} />;
  }

  return (
    <>
      <FocusAwareStatusBar />
      {/* <LoginForm onSubmit={onSubmit} /> */}

      <TouchableOpacity onPress={onPress}>
        {/* <Image source={require('../assets/google-icon.png')} style={styles.googleIcon} /> */}
        <Text>Login with Google HIHI</Text>
      </TouchableOpacity>

      {/* <LoginWithGoogle /> */}
    </>
  );
}
