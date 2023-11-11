import { Typography, Stack } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from 'react-router';
import { ProductInterface, ProductWithTags } from 'src/types/response.dto';
import Image from 'src/components/image';
import NoResult from '../common/NoResult';

interface ProductListProps {
  products: ProductWithTags[] | ProductInterface[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const navigate = useNavigate();

  const goToProductPage = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {products.length ? (
        <Masonry columns={{ xs: 2, sm: 3 }} spacing={2} sx={{ width: 'auto' }}>
          {products.map((product) => (
            <Stack
              key={product.id}
              onClick={() => goToProductPage(product.id)}
              spacing={0.5}
              sx={{ cursor: 'pointer' }}
            >
              <Image src={product.mainImage} alt={product.name} sx={{ borderRadius: 1 }} />
              <Typography variant="caption" noWrap>
                {product.name}
              </Typography>
            </Stack>
          ))}
        </Masonry>
      ) : (
        <NoResult />
      )}
    </>
  );
};
