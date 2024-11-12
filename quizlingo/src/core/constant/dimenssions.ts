import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const BUTTON_FULL_WIDTH = SCREEN_WIDTH - 24
export const isMobile = SCREEN_WIDTH < 768