import { Box, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from 'react-router';
import { ProductInterface } from 'src/types/response.dto';
import Image from 'src/components/image';

interface Props {
  products: ProductInterface[];
}

const PrintShopProducts = ({ products }: Props) => {
  const navigate = useNavigate();

  const goToProductPage = (product: ProductInterface) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        작업
      </Typography>
      <Masonry columns={{ xs: 2, sm: 3 }} spacing={2}>
        {products.map((product) => (
          <Box
            key={product.id}
            onClick={() => goToProductPage(product)}
            sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          >
            <Image src={product.mainImage} alt={product.name} sx={{ borderRadius: 1 }} />
            <Typography
              variant="caption"
              sx={{ mx: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            >
              {product.name}
            </Typography>
          </Box>
        ))}
      </Masonry>
    </>
  );
};

export default PrintShopProducts;
