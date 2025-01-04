import { cn } from '@/utils/cn';
import { CloseModalButton } from './CloseModalButton';
import { ModalOverlay } from './ModalOverlay';

type ModalProps = {
  title: string;
  className?: string;
  clearParam?: string | string[];
  children: React.ReactNode;
  disableCloseModal?: boolean;
  iconCloseModal?: boolean;
};

export function Modal({
  title,
  className,
  clearParam,
  children,
  disableCloseModal = false,
  iconCloseModal = true,
}: Readonly<ModalProps>) {
  return (
    <>
      <ModalOverlay
        clearParam={clearParam}
        disableCloseModal={disableCloseModal}
      />
      <div className="fixed transform -translate-x-1/2 -translate-y-1/2 z-[100] top-1/2 left-1/2">
        <div className="relative w-full rounded-xl shadow-md bg-white">
          <div className="flex items-center justify-between p-4 bg-white rounded-t-xl">
            <h3 className="text-base font-bold leading-5 text-black">{title}</h3>
            {iconCloseModal && (
              <CloseModalButton
                clearParam={clearParam}
                disableCloseModal={disableCloseModal}
              />
            )}
          </div>
          <div className={cn('p-4', className)}>{children}</div>
        </div>
      </div>
    </>
  );
}
