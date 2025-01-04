'use client';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type CloseModalButtonProps = {
  clearParam?: string | string[];
  disableCloseModal: boolean;
};

export function CloseModalButton({ clearParam, disableCloseModal }: Readonly<CloseModalButtonProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const closeModal = useCallback(() => {
    if (disableCloseModal) return;

    if (clearParam && !Array.isArray(clearParam)) {
      const params = new URLSearchParams(searchParams);
      params.delete(clearParam);
      return replace(`${pathname}?${params.toString()}`);
    }

    if (clearParam && Array.isArray(clearParam)) {
      const params = new URLSearchParams(searchParams);
      clearParam.forEach((param) => {
        params.delete(param);
      });
      return replace(`${pathname}?${params.toString()}`);
    }

    replace(pathname);
  }, [clearParam, disableCloseModal, pathname, replace, searchParams]);

  return (
    <button
      className="inline-flex items-center justify-center w-6 h-6 rounded-full cursor-pointer ms-auto hover:bg-gray-300"
      type="button"
      onClick={closeModal}
      aria-label="Close Modal">
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
}
