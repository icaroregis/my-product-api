import clsx from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

export const inputVariants = tv({
  base: 'bg-transparent min-w-[50px] w-full px-4 !py-3 focus:outline-none rounded-md',
  variants: {
    mode: {
      digit: 'text-center',
    },
  },
})

interface InputRootProps
  extends VariantProps<typeof inputVariants>,
    InputHTMLAttributes<HTMLInputElement> {}

export const InputElement = forwardRef<HTMLInputElement, InputRootProps>(
  ({ mode, className, maxLength, ...props }, forwardedRef) => {
    return (
      <input
        size={1}
        maxLength={maxLength}
        className={clsx(
          inputVariants({
            mode,
          }),
          className,
        )}
        ref={forwardedRef}
        {...props}
      />
    )
  },
)

InputElement.displayName = 'InputElement'
