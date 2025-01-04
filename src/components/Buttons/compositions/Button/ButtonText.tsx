import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

export const buttonTextVariant = tv({
  base: '',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      'lg-semibold': 'text-lg font-semibold',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
  },
})

interface ButtonTextProps
  extends VariantProps<typeof buttonTextVariant>,
    ComponentProps<'span'> {
  text: string
}

export function ButtonText({
  text,
  size = 'base',
  className,
  ...props
}: ButtonTextProps) {
  return (
    <span {...props} className={buttonTextVariant({ size, className })}>
      {text}
    </span>
  )
}
