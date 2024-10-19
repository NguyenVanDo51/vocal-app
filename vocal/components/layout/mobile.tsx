import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export const MobileLayout = () => {
  console.log('MobileLayout')
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#78C800', // Màu xanh tươi của Duolingo
        tabBarInactiveTintColor: '#A8A8A8', // Màu xám khi tab không được chọn
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
          height: 70, // Tăng chiều cao để dễ tương tác hơn
          borderTopEndRadius: 20, // Bo góc cho thanh tab
          borderTopStartRadius: 20, // Bo góc cho thanh tab
        },
        tabBarItemStyle: {
          borderRadius: 20, // Bo tròn tab item
        },
        headerShown: false, // Ẩn header
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : styles.inactiveTab}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={32} // Biểu tượng lớn hơn
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : styles.inactiveTab}>
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={32} // Biểu tượng lớn hơn
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : styles.inactiveTab}>
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={32} // Biểu tượng lớn hơn
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: '#E5F8D6', // Màu nền nhẹ nhàng khi tab được chọn
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTab: {
    backgroundColor: '#fff', // Màu nền trắng khi tab không được chọn
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#78C800', // Màu nền cho nút +
    borderRadius: 50, // Bo tròn
    width: 60, // Kích thước nút +
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Khoảng cách dưới cùng
    elevation: 5, // Để tạo hiệu ứng nổi
  },
})
