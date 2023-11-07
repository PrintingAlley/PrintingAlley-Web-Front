import { Typography } from '@mui/material';
import { ProductInterface } from 'src/types/response.dto';
import { ProductList } from '../Product/ProductList';

interface Props {
  products: ProductInterface[];
}

const PrintShopProducts = ({ products }: Props) => (
  <>
    <Typography variant="h6" gutterBottom>
      작업
    </Typography>
    <ProductList products={products} />
  </>
);

export default PrintShopProducts;
