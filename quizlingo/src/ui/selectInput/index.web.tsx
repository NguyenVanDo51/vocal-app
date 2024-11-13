import { FC } from 'react';
import { SelectProps } from './type';

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
    <div className="">
      <select>
        <option>1</option>
        <option>2</option>
      </select>
    </div>
  );
};
