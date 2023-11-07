import { Typography, Box } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from 'react-router';
import { ProductInterface, ProductWithTags } from 'src/types/response.dto';
import Image from 'src/components/image';

interface ProductListProps {
  products: ProductWithTags[] | ProductInterface[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const navigate = useNavigate();

  const goToProductPage = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Masonry columns={{ xs: 2, sm: 3 }} spacing={2} sx={{ width: 'auto' }}>
      {products.map((product) => (
        <Box
          key={product.id}
          onClick={() => goToProductPage(product.id)}
          sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
        >
          <Image src={product.mainImage} alt={product.name} sx={{ borderRadius: 1 }} />
          <Typography
            variant="caption"
            sx={{ mx: 0.5, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          >
            {product.name}
          </Typography>
        </Box>
      ))}
    </Masonry>
  );
};
