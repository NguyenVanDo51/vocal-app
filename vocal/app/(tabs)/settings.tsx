import { View, Text, Button } from 'react-native'

import { useUser, useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()

  const onSignOutPress = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (err: any) {}
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signed in as {user?.primaryEmailAddress?.emailAddress}</Text>
      <Button title="Sign out" onPress={onSignOutPress} />
    </View>
  )
}
