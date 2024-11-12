import { Linking, Platform } from 'react-native';
import Tts from 'react-native-tts';
import type { StoreApi, UseBoundStore } from 'zustand';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const shuffleArray = (originArray: any[]) => {
  const array = [...originArray]

  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array
}

export const textToSpeech = (text: string) => {
  console.log("textToSpeech", text)
  if (Platform.OS === 'web') {
    window.speechSynthesis.cancel()

    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-US'
    window.speechSynthesis.speak(msg);

  } else {
    Tts.speak(text)
  }
}