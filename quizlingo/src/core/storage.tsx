import { MMKV } from 'react-native-mmkv';

export const storage =
  typeof window != 'undefined'
    ? new MMKV()
    : ({
        getItem: (_: string) => null,
        setItem: async (_: string, __: any) => {},
        removeItem: async (_: string) => {},
        getString: (_: string) => null,
        set: async (_: string, __: any) => {},
        delete: async (_: string) => {},
      } as unknown as MMKV);

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}
