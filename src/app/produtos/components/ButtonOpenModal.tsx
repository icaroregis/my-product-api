'use client';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter } from 'next/navigation';

export const ButtonOpenModal = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  function handleCreateTagModal() {
    const params = new URLSearchParams();
    params.set('createProductModal', 'true');
    push(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <button
        onClick={handleCreateTagModal}
        className="flex justify-center items-center p-[8px] bg-green-700 rounded-[6px] gap-2 text-white">
        <FontAwesomeIcon
          icon={faPlus}
          style={{ width: '24px', height: '24px', color: '#fff' }}
        />
        Cadastrar Novo Produto
      </button>
    </div>
  );
};
