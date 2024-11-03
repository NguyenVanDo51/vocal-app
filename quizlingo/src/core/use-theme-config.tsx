import type { Theme } from '@react-navigation/native';
import { DefaultTheme } from '@react-navigation/native';

import colors from '@/ui/colors';

const LightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[400],
    background: colors.white,
  },
};

export function useThemeConfig() {
  // const { colorScheme } = useColorScheme();

  // if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}
