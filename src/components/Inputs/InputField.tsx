import { formatCurrency } from '@/utils/formatCurrency';
import { ElementRef, forwardRef, InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';
import { VariantProps } from 'tailwind-variants';
import { FormErrorMessage } from '../Inputs/FormErrorMessage';
import { InputForm } from '../Inputs/InputForm';
import { Input as InputPrimitive } from '../Inputs/compositions/Input';
import { inputVariants } from '../Inputs/compositions/Input/InputElement';
import { inputContainerVariants } from '../Inputs/compositions/Input/InputRoot';

type InputFieldProps = {
  label?: string;
  labelClassName?: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
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
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg';
  customValue?: string;
  noRecharge?: boolean;
  showError?: boolean;
  mode?: string;
  formatForCurrency?: boolean;
  onChangeCustom?: (value: any) => void;
  isClearable?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputContainerVariants>;

export const InputField = forwardRef<ElementRef<typeof InputPrimitive.Element>, InputFieldProps>(
  (
    {
      name,
      control,
      label,
      labelClassName,
      type = 'text',
      required = false,
      placeholder,
      mask,
      unmask,
      scale,
      thousandsSeparator,
      radix,
      mapToRadix,
      normalizeZeros,
      padFractionalZeros,
      onAccept,
      overwrite,
      className,
      customValue,
      noRecharge,
      showError = true,
      onChange,
      onChangeCustom,
      containerSize,
      mode,
      id,
      isClearable = false,
      formatForCurrency = false,
      ...props
    },
    _,
  ) => {
    return (
      <Controller
        defaultValue={''}
        name={name}
        control={control}
        render={({ field: { onChange, name, ref, value }, fieldState: { error } }) => {
          const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text');
            const input = e.target as HTMLInputElement;

            const { selectionStart, selectionEnd } = input;

            if (selectionStart !== null && selectionEnd !== null) {
              const newValue = input.value.slice(0, selectionStart) + pastedData + input.value.slice(selectionEnd);

              if (unmask) {
                handleOnChange({
                  target: { value: newValue.replace(/\D/g, '') },
                });
              } else {
                handleOnChange({ target: { value: newValue } });
              }
            }
          };

          const handleFormatCurrencyOnChange = (event: any) => {
            let value = event?.target?.value || event;
            if (unmask) {
              value = value.replace(/\D/g, '');
            }
            if (formatForCurrency) {
              value = formatCurrency(value);
            }
            if (onChangeCustom) {
              onChangeCustom(value);
            }
            if (!noRecharge) {
              onChange(value);
            }
          };

          const handleOnChange = (e: any) => {
            if (unmask && e) e = e.target.value.replace(/\D/g, '');
            if (onChangeCustom) {
              onChangeCustom(e);
            }
            if (!noRecharge) {
              onChange(e);
            }
          };

          const clearInput = () => {
            onChange('');
          };

          return (
            <div className={`relative flex flex-col gap-1 ${className ?? 'w-full'}`}>
              {label && (
                <label
                  htmlFor={name}
                  className={`text-sm font-bold text-interlis-fonts-300 ${labelClassName}`}>
                  {label}
                  {required && <span className="text-interlis-fonts-200"> * </span>}
                </label>
              )}
              <div>
                <InputForm
                  {...props}
                  variant={props.disabled ? 'disabled' : props.variant}
                  name={name}
                  id={id ?? name}
                  control={control}
                  ref={ref}
                  type={type}
                  value={customValue ?? (formatForCurrency ? formatCurrency(value) : value)}
                  onChange={formatForCurrency ? handleFormatCurrencyOnChange : handleOnChange}
                  onPaste={handleOnPaste}
                  mask={mask}
                  unmask={unmask}
                  scale={scale}
                  thousandsSeparator={thousandsSeparator}
                  radix={radix}
                  mapToRadix={mapToRadix}
                  normalizeZeros={normalizeZeros}
                  padFractionalZeros={padFractionalZeros}
                  onAccept={onAccept}
                  overwrite={overwrite}
                  placeholder={placeholder ?? 'Digite'}
                  containerSize={containerSize}
                  mode={mode as keyof typeof inputVariants.variants.mode}
                />
                {isClearable && value && (
                  <button
                    type="button"
                    onClick={clearInput}
                    className="absolute right-2 top-[40px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    <svg
                      height="20"
                      width="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      className="fill-current text-[#CCCCCC] hover:text-[#999999]">
                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>
                  </button>
                )}
              </div>
              {showError && error?.message && <FormErrorMessage message={error.message} />}
            </div>
          );
        }}
      />
    );
  },
);

InputField.displayName = 'InputField';
