import { View, Text, Button, TouchableOpacity, FlatList } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { httpClient } from '../services/httpClient'

export default function HomeClient() {
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['my-collections'],
    queryFn: () => httpClient.get('/collections/mine').then((r) => r.data),
  })

  if (isLoading) {
    return <Text style={{ color: 'white', textAlign: 'center' }}>Loading...</Text>
  }

  if (!data || data.length === 0) {
    return (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>
          Bạn chưa có bộ từ nào. Hãy tạo mới một bộ từ!
        </Text>
        <TouchableOpacity onPress={() => router.push('/collections/create')}>
          <View
            style={{ marginTop: 20, backgroundColor: '#1E90FF', padding: 10, borderRadius: 10 }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              + Tạo mới
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: 'black', flex: 1, padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
        Your vocal packages
      </Text>

      {/* Nút Tạo mới */}
      <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => router.push('/collections/create')}>
          <View style={{ backgroundColor: '#1E90FF', padding: 10, borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Tạo mới</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Danh sách bộ từ */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ backgroundColor: '#333', padding: 15, borderRadius: 10, marginBottom: 15 }}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              {item.collectionName}
            </Text>
            <Text style={{ color: 'gray', marginBottom: 10 }}>Số từ: {item.words.length}</Text>

            {/* Hiển thị 3 từ đầu tiên */}
            <FlatList
              data={item.words.slice(0, 3)}
              keyExtractor={(word, index) => index.toString()}
              renderItem={({ item: word }) => (
                <Text style={{ color: 'lightgray' }}>
                  {word.word} - {word.meaning}
                </Text>
              )}
            />

            {item.words.length > 3 && (
              <Text style={{ color: 'gray', marginTop: 10 }}>
                ... và {item.words.length - 3} từ khác
              </Text>
            )}

            {/* Nút sửa và học */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity onPress={() => router.push(`/collections/${item.id}/update`)}>
                <View style={{ backgroundColor: '#FFD700', padding: 10, borderRadius: 10 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>Sửa</Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => router.push(`/collections/${item.id}/learn`)}>
                <View style={{ backgroundColor: '#32CD32', padding: 10, borderRadius: 10 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Học ngay</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </View>
        )}
      />
    </View>
  )
}
