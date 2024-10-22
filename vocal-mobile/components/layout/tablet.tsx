import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { View, Pressable, StyleSheet } from 'react-native'

export const TabletLayout = () => {
  return (
    <View style={styles.sidebar}>
      <Pressable onPress={() => router.push('/(tabs)')} style={styles.tabIcon}>
        <Ionicons name="home-outline" size={32} color="#A8A8A8" />
      </Pressable>

      <Pressable style={styles.addButton} onPress={() => router.push('/(tabs)/create')}>
        <Ionicons name="add" size={32} color="#fff" />
      </Pressable>

      <Pressable onPress={() => router.push('/(tabs)/settings')} style={styles.tabIcon}>
        <Ionicons name="settings-outline" size={32} color="#A8A8A8" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Để đặt các thành phần bên cạnh nhau
  },
  sidebar: {
    width: 70, // Kích thước sidebar
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  tabIcon: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#78C800',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto', // Đặt nút ở cuối
    marginBottom: 20, // Khoảng cách dưới cùng
    elevation: 5,
  },
  activeTab: {
    backgroundColor: '#E5F8D6',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
