import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

export const buttonVariant = tv({
  base: 'rounded-md flex items-center justify-center transition-all duration-400 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 group gap-2 text-center font-medium text-white',
  variants: {
    size: {
      xs: 'h-8 py-0 px-4',
      sm: 'h-9 py-2 px-6',
      '3md': 'h-10 py-2 px-6',
      '2md': 'h-10 py-3 px-8',
      md: 'h-11 py-3 px-8',
      lg: 'h-13 py-4 px-10',
      iconOnly: 'p-3',
    },
    width: {
      full: 'w-full',
    },
    variant: {
      newPrimary: 'bg-interlis-buttons-800',
      primary: 'bg-green-500 hover:bg-green-600',
      newSecondary: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 border border-indigo-100 text-indigo-700',
      outline: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 border border-gray-300 text-gray-500',
      successWithMore: 'rounded-l-md rounded-r-none bg-green-500 hover:bg-green-600',
      more: 'rounded-l-none rounded-r-md px-3 py-3 bg-green-500 hover:bg-green-600',
      delete: 'bg-red-600 hover:bg-red-700 text-white',
      warning: 'bg-red-600 hover:bg-red-700 active:bg-red-800',
      iconOnly: 'bg-indigo-700',
    },
  },
});

interface ButtonRootProps extends VariantProps<typeof buttonVariant>, ComponentProps<'button'> {}

export function ButtonRoot({
  variant = 'primary',
  size = 'md',
  width,
  type = 'button',
  children,
  className,
  ...props
}: ButtonRootProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariant({ variant, size, width, className }), className)}
      {...props}>
      {children}
    </button>
  );
}
