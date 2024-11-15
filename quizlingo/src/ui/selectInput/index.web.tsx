import { FC } from 'react';
import { SelectProps } from './type';
import { Select as MSelect, Option } from '@material-tailwind/react';

export const Select: FC<SelectProps> = (props) => {
  const {
    label,
    value,
    error,
    options = [],
    placeholder = 'select...',
    disabled = false,
    onSelect,
  } = props;

  return (
    <MSelect
      label={label}
      value={value as string}
      placeholder={placeholder}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      disabled={disabled}
      error={!!error}
      onChange={(e) => onSelect?.(e)}
      size='lg'
    >
      {options?.map((o) => (
        <Option key={o.value} value={String(o.value)}>
          {o.label}
        </Option>
      ))}
    </MSelect>
  );
};
