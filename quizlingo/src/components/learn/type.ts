import { IWord } from "@/api/words/type";

export enum QuestionType {
  EN_TO_VN = 'en-to-vn',
  VN_TO_EN = 'vn-to-en',
  MATCH = 'match',
  FILL_BLANK = 'fill-blank',
}

export const questionTitleMapping = {
  [QuestionType.EN_TO_VN]: 'Select meaning',
  [QuestionType.VN_TO_EN]: 'Select segment',
  [QuestionType.MATCH]: 'Match the words',
  [QuestionType.FILL_BLANK]: 'Fill the blank',
};

export interface IQuestion {
  type: QuestionType;
  word?: IWord;
  words?: IWord[];
  shouldShowAudio: boolean;
  timestamp?: number
}