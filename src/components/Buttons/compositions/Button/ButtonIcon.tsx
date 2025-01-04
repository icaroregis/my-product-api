import clsx from 'clsx';
import { ElementType, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const iconVariant = tv({
  base: 'w-4 h-4 fill-current text-gray-500',
});

type ButtonIconProps = {
  icon: ElementType;
  className?: string;
};

export const ButtonIcon = forwardRef<any, ButtonIconProps>(({ icon: Icon, className, ...props }, forwardedRef) => {
  return (
    <Icon
      {...props}
      className={clsx(iconVariant(), className)}
      ref={forwardedRef}
    />
  );
});

ButtonIcon.displayName = 'ButtonIcon';
