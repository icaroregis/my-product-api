import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'react';
import { Button } from '../Buttons/compositions/Button';
import { buttonVariant } from '../Buttons/compositions/Button/ButtonRoot';
import { buttonTextVariant } from '../Buttons/compositions/Button/ButtonText';
import { AddButtonSubmit } from './AddButtonSubmit';

type SubmitFormButtonProps = {
  isSubmitting: boolean;
  title?: string;
  disabled?: boolean;
  icon?: IconProp;
  id?: string;
  variant?: 'warning' | 'primary' | 'successWithMore';
  className?: string;
  classNameMain?: string;
  size?: keyof typeof buttonVariant.variants.size;
  fontSize?: keyof typeof buttonTextVariant.variants.size;
  handleClick?: (value: any) => void;
  addButton?: boolean;
} & ComponentProps<'button'>;

export function SubmitFormButton({
  isSubmitting,
  title = 'Salvar',
  disabled = false,
  icon,
  id = 'submit-form',
  variant,
  className,
  classNameMain,
  handleClick,
  addButton,
  size,
  fontSize,
  ref,
  ...props
}: SubmitFormButtonProps) {
  return (
    <div className={classNameMain}>
      <Button.Root
        {...props}
        id={id}
        ref={ref}
        type="submit"
        variant={variant ?? 'success'}
        size={size || 'sm'}
        disabled={isSubmitting || disabled}
        className={className}
        onClick={() => {
          if (handleClick) handleClick(false);
        }}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <Button.Text
          size={fontSize}
          text={title}
        />
      </Button.Root>

      {addButton && (
        <AddButtonSubmit
          isSubmitting={isSubmitting}
          handleClick={handleClick}
          size={size}
        />
      )}
    </div>
  );
}
