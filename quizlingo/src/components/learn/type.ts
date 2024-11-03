import { type IWord } from "@/api/words/type";

export enum QuestionType {
  EN_TO_VN = 'en-to-vn',
  VN_TO_EN = 'vn-to-en',
  MATCH = 'match',
  FILL_BLANK = 'fill-blank',
}

export const questionTitleMapping = {
  [QuestionType.EN_TO_VN]: 'Chọn ý nghĩa',
  [QuestionType.VN_TO_EN]: 'Chọn từ vựng',
  [QuestionType.MATCH]: 'Nhấn vào các cặp tương ứng',
  [QuestionType.FILL_BLANK]: 'Chọn đáp án đúng',
};

export interface IQuestion {
  type: QuestionType;
  word?: IWord;
  words?: IWord[];
  shouldShowAudio: boolean;
  timestamp?: number
}