import { forwardRef } from 'react';

type ButtonIconProps = {
  icon: any;
  className?: string;
};

export const ButtonIconElement = forwardRef<any, ButtonIconProps>(({ icon: Icon, ...props }, forwardedRef) => {
  return (
    <Icon
      {...props}
      ref={forwardedRef}
    />
  );
});

ButtonIconElement.displayName = 'ButtonIconElement';
