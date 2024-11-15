export type OptionType = { label: string; value: string | number };


export interface SelectProps {
    value?: string | number;
    label?: string;
    disabled?: boolean;
    error?: string;
    options?: OptionType[];
    onSelect?: (value: string | undefined) => void;
    placeholder?: string;
    testID?: string;
  }

  

  