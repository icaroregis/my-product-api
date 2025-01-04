// import { getInitialTagAction } from '../../specifications/tag.actions';
import { ProductTable } from '../client/ProductTable';

export async function ListProducts() {
  // const tags = await getInitialTagAction();
  const dataTable = [
    { id: 1, nome: 'Produto 1', preco: '10', quantidade: '10' },
    { id: 1, nome: 'Produto 2', preco: '20', quantidade: '40' },
  ];

  return <ProductTable data={dataTable} />;
}
