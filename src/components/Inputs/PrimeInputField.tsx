import { formatCurrency } from '@/utils/formatCurrency';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Control, Controller } from 'react-hook-form';
import { FormErrorMessage } from '../Inputs/FormErrorMessage';

type PrimeInputFieldProps = {
  label: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
  required?: boolean;
  className?: string;
  formatForCurrency?: boolean;
};

export const PrimeInputField = ({
  label,
  name,
  control,
  placeholder,
  required = false,
  className,
  formatForCurrency = false,
}: PrimeInputFieldProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className ?? 'w-full'}`}>
      <label
        htmlFor={name}
        className="text-sm font-bold text-interlis-fonts-300">
        {label}
        {required && <span className="text-interlis-fonts-200"> * </span>}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => {
          const handleFormatCurrencyOnChange = (event: any) => {
            let value = event?.target?.value || event;
            if (formatForCurrency) {
              value = formatCurrency(value);
            }
            field.onChange(value);
          };

          return (
            <>
              <InputText
                id={name}
                {...field}
                placeholder={placeholder}
                className={classNames('border border-solid border-black rounded-[5px] h-[33px] pl-2 pr-2', {
                  'p-invalid': fieldState.error,
                })}
                style={{ borderColor: fieldState.error ? 'red' : '#ced4da' }}
                onChange={formatForCurrency ? handleFormatCurrencyOnChange : field.onChange}
              />
              {fieldState.invalid && <FormErrorMessage message={fieldState.error.message} />}
            </>
          );
        }}
      />
    </div>
  );
};
