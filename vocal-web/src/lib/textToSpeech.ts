
"use client"

const voices = window.speechSynthesis.getVoices();
const USVoice = voices.find(voice => voice.name === 'Google US English') || voices[0]; // Chọn giọng nói

export const textToSpeech = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.voice = USVoice

  window.speechSynthesis.speak(utterance);
};
