import { ButtonOpenModal } from './components/client/ButtonOpenModal';
import { CreateProductModal } from './components/server/CreateProductModal';
import { DeleteProductModal } from './components/server/DeleteProductModal';
import { ListProducts } from './components/server/ListProducts';
import { UpdateProductModal } from './components/server/UpdateProductModal';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: Readonly<Props>) {
  const createProductModal = searchParams.createProductModal === 'true';
  const updateProductModal = searchParams.updateProductModal === 'true';
  const updateProductId = searchParams.updateProductId ? String(searchParams.updateProductId) : null;
  const deleteProductModal = searchParams.deleteProductModal === 'true';
  const deleteProductId = searchParams.deleteProductId ? String(searchParams.deleteProductId) : null;

  return (
    <div className="flex flex-col justify-center items-center flex-1 w-full gap-4">
      <div className="flex flex-col flex-1 w-[1000px] min-h-[calc(95vh-0px)] max-h-[calc(95vh-68px)] gap-4 px-4 py-7">
        <div className="flex items-center gap-5">
          <ButtonOpenModal />
        </div>

        <ListProducts />
      </div>

      {createProductModal && <CreateProductModal />}
      {updateProductModal && updateProductId && <UpdateProductModal id={updateProductId} />}
      {deleteProductModal && deleteProductId && <DeleteProductModal id={deleteProductId} />}
    </div>
  );
}
