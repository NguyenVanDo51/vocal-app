export const soundCorrect = () => {
  const audio = new Audio('/sounds/correct.mp3');
  audio.play();
}

export const soundWrong = () => {
  const audio = new Audio('/wrong.mp3');
  audio.play();
}