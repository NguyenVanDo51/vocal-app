import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useAuth, useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import LogoIcon from '@/assets/icons/LogoIcon'

export const SignIn = () => {
  const router = useRouter()
  const { signOut } = useAuth()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      console.log('startOAuthFlow')
      const { createdSessionId, signIn, signUp, setActive: setActiveOAuth } = await startOAuthFlow()
      console.log('createdSessionId', createdSessionId, signIn)
      if (createdSessionId && setActiveOAuth) {
        await setActiveOAuth({ session: createdSessionId })
        router.replace('/')
      } else {
        // Use signIn or signUp for next steps such as MFA
        // await signIn()
        console.log('signOut')
        await signOut()
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View style={styles.container}>
      {/* Logo hoặc Hình ảnh */}
      <LogoIcon />

      {/* Tiêu đề */}
      <Text style={styles.title}>Welcome to English Learning</Text>

      {/* Mô tả ngắn */}
      <Text style={styles.description}>Improve your English skills with personalized lessons!</Text>

      {/* Nút đăng nhập với Google */}
      <TouchableOpacity style={styles.googleButton} onPress={onPress}>
        {/* <Image source={require('../assets/google-icon.png')} style={styles.googleIcon} /> */}
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7', // Màu nền nhẹ nhàng
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30, // Khoảng cách dưới logo
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#333',
  },
})
