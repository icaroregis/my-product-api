import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../Buttons/compositions/Button';
import { buttonVariant } from '../Buttons/compositions/Button/ButtonRoot';

type AddButtonSubmitProps = {
  id?: string;
  isSubmitting: boolean;
  disabled?: boolean;
  className?: string;
  handleClick?: (value: any) => void;
  size?: keyof typeof buttonVariant.variants.size;
};

export function AddButtonSubmit({
  id = 'add-form',
  className,
  isSubmitting,
  disabled,
  handleClick,
  size,
}: AddButtonSubmitProps) {
  return (
    <Button.Root
      id={id}
      type="submit"
      variant="more"
      size={size || 'sm'}
      disabled={isSubmitting || disabled}
      className={className}
      onClick={() => {
        if (handleClick) handleClick(true);
      }}>
      <FontAwesomeIcon icon={faPlus} />
    </Button.Root>
  );
}
