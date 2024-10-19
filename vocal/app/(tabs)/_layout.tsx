import { Redirect } from 'expo-router'
import React from 'react'

import { useAuth } from '@clerk/clerk-expo'
import { View, Dimensions } from 'react-native'
import { TabletLayout } from '@/components/layout/tablet'
import { MobileLayout } from '@/components/layout/mobile'

const { width } = Dimensions.get('window')
const isTablet = width >= 768 // Kiểm tra xem có phải tablet không (768px là kích thước tiêu chuẩn)

export default function TabLayout() {
  const { isSignedIn } = useAuth()
  console.log('Tabs layout')

  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sign-in'} />
  }

  // return <View style={{ flex: 1 }}>{isTablet ? <TabletLayout /> : <MobileLayout />}</View>
  return (
    <View style={{ flex: 1 }}>
      <MobileLayout />
    </View>
  )
}
