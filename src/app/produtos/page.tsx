import { ButtonOpenModal } from './components/ButtonOpenModal';
import { CreateProductModal } from './components/CreateProductModal';
import { DeleteProductModal } from './components/DeleteProductModal';
import { ProductTable } from './components/ProductTable';
import { UpdateProductModal } from './components/UpdateProductModal';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type Props = {
  searchParams: SearchParams;
};

export default async function Page(props: Readonly<Props>) {
  const searchParams = await props.searchParams;
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

        <ProductTable />
      </div>

      {createProductModal && <CreateProductModal />}
      {updateProductModal && updateProductId && <UpdateProductModal id={updateProductId} />}
      {deleteProductModal && deleteProductId && <DeleteProductModal id={deleteProductId} />}
    </div>
  );
}
