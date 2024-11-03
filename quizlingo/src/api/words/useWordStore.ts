import { create } from 'zustand'
import { IWord } from './type'

type State = {
  word: IWord | undefined
}

export const useWordStore = create<{ word: IWord | undefined, setWord: (word: IWord) => void, removeWord: () => void }>((set: any) => ({
  word: undefined,
  setWord: (word) => set({ word }),
  removeWord: () => set({ word: undefined })
}))