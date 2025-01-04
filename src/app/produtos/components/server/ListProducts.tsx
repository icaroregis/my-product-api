// import { getInitialTagAction } from '../../specifications/tag.actions';
import { ProductTable } from '../client/ProductTable';

export async function ListProducts() {
  // const tags = await getInitialTagAction();
  return <ProductTable data={[]} />;
}
