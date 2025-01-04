'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { VariantProps } from 'tailwind-variants';
import { Input as InputPrimitive } from '../Inputs/compositions/Input';
import { inputVariants } from '../Inputs/compositions/Input/InputElement';
import { inputContainerVariants } from '../Inputs/compositions/Input/InputRoot';

interface InputFormProps
  extends VariantProps<typeof inputContainerVariants>,
    ComponentPropsWithoutRef<typeof InputPrimitive.Element> {
  isSearch?: boolean;
  hasFilter?: boolean;
  name: string;
  control?: Control<any>;
  handleFilterClick?: () => void;
  containerSize?: 'sm' | 'md' | 'lg';
  mode?: keyof typeof inputVariants.variants.mode;
  mask?: any;
  unmask?: boolean;
  scale?: number;
  thousandsSeparator?: string;
  radix?: string;
  mapToRadix?: string[];
  normalizeZeros?: boolean;
  padFractionalZeros?: boolean;
  onAccept?: (value: any) => void;
  overwrite?: boolean;
}

export const InputForm = forwardRef<ElementRef<typeof InputPrimitive.Element>, InputFormProps>(
  ({ variant, containerSize, onChange, name, control, mode, ...props }, forwardedRef) => {
    return (
      <Controller
        name={name}
        defaultValue={''}
        control={control}
        render={({ fieldState: { error } }) => {
          return (
            <InputPrimitive.Root
              variant={variant === 'disabled' ? 'disabled' : error ? 'error' : variant}
              containerSize={containerSize}>
              <InputPrimitive.Element
                {...props}
                mode={mode}
                onChange={onChange}
                ref={forwardedRef}
              />
            </InputPrimitive.Root>
          );
        }}
      />
    );
  },
);

InputForm.displayName = 'InputForm';
