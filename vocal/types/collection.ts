import { IUser } from "./user"

export interface IWord {
  id: string
  vocal: string
  meaning: string
  image?: string
  audio?: string
  examples?: string[]
  pronounciation?: string
}

export interface Collection {
  id: string
  title: string
  words: IWord[]
  author: string
}