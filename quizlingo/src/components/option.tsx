import { isMobile } from '@/core/constant/dimenssions';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, { type FC, type ReactNode } from 'react';
import { type PressableProps } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';

type IProps = PressableProps & {
  text: string | ReactNode;
  isSelected: boolean;
  isDisabled?: boolean;
  isIncorrect: boolean;
  onPress: () => void;
};

const SUCCESS_COLOR = '#1E88E5';
const ERROR_COLOR = '#E15F5F';

export const Option: FC<IProps> = React.memo(
  ({ text, isSelected, isDisabled, isIncorrect, ...props }) => {
    let p = {
      textColor: '#e5e5e5',
    } as any;

    if (!isDisabled) {
      p = {
        borderColor: '#e5e5e5',
        backgroundDarker: '#e5e5e5',
      };

      if (isSelected) {
        p = {
          borderColor: SUCCESS_COLOR,
          backgroundDarker: SUCCESS_COLOR,
          textColor: SUCCESS_COLOR,
        };

        if (isIncorrect) {
          p = {
            borderColor: ERROR_COLOR,
            backgroundDarker: ERROR_COLOR,
            textColor: ERROR_COLOR,
          };
        }
      }
    }

    if (isMobile) {
      p.width = SCREEN_WIDTH * 0.4
    }

    return (
      <ThemedButton
        name="bruce"
        height={70}
        raiseLevel={3}
        type="secondary"
        {...p}
        {...props}
        disabled={isDisabled}
      >
        {text}
      </ThemedButton>
    );
  },
);
