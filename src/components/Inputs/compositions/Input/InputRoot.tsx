import { HTMLAttributes } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

export const inputContainerVariants = tv({
  base: 'resize-none rounded-md border border-interlis-inputs-200 hover:border-indigo-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:interlis-inputs-400 flex min-w-[60px] accent-indigo-500 w-full',
  variants: {
    containerSize: {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    },
    variant: {
      newSearch: 'rounded-full text-interlis-inputs-500 border-interlis-inputs-200 text-base',
      floatLabel: 'peer placeholder-transparent',
      error: 'border-red-500/75 hover:border-red-600 focus:border-red-500 focus:ring-red-500',
      success: 'border-green-500/75 hover:border-green-600 focus:border-green-500 focus:ring-green-500',
      disabled: 'pointer-events-none bg-gray-200',
      search:
        'rounded-full border- dark:bg-transparent dark:placeholder:text-gray-500 dark:text-gray-300 dark:border-gray-300',
      forms: 'text-interlis-fonts-300 border border-interlis-tables-300 text-sm py-1 font-normal rounded-md',
    },
  },
  defaultVariants: {
    containerSize: 'sm',
  },
});

interface InputRootProps extends VariantProps<typeof inputContainerVariants>, HTMLAttributes<HTMLDivElement> {}

export function InputRoot({ variant, children, containerSize, ...props }: InputRootProps) {
  return (
    <div
      {...props}
      className={inputContainerVariants({
        variant,
        containerSize,
      })}>
      {children}
    </div>
  );
}
