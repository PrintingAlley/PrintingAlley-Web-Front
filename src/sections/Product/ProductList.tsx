import { Typography, Stack, Box, alpha } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from 'react-router';
import { ProductInterface, ProductWithTags } from 'src/types/response.dto';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/path';
import NoResult from '../common/NoResult';

interface ProductItemProps {
  product: ProductInterface | ProductWithTags;
  onClick: () => void;
}

interface ProductListProps {
  products: ProductWithTags[] | ProductInterface[];
}

const ProductItem = ({ product, onClick }: ProductItemProps) => {
  const isProductWithTags = (item: ProductInterface | ProductWithTags): item is ProductWithTags =>
    'bookmarkCount' in item;

  return (
    <Stack onClick={onClick} spacing={0.5} sx={{ cursor: 'pointer' }}>
      <Box
        sx={{
          position: 'relative',
          '&:hover .productInfo': {
            display: isProductWithTags(product) ? 'flex' : 'none',
          },
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Image src={product.mainImage} alt={product.name} />

        {isProductWithTags(product) && (
          <Stack
            className="productInfo"
            direction="row"
            sx={{
              display: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: (theme) => alpha(theme.palette.grey[900], 0.64),
              color: 'common.white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            spacing={1}
          >
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="mdi:eye" />
              {product.viewCount}
            </Typography>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="mdi:bookmark-outline" />
              {product.bookmarkCount}
            </Typography>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="mdi:comment-text-outline" />
              {product.reviewCount}
            </Typography>
          </Stack>
        )}
      </Box>
      <Typography variant="caption" noWrap>
        {product.name}
      </Typography>
    </Stack>
  );
};

export const ProductList = ({ products }: ProductListProps) => {
  const navigate = useNavigate();
  const goToProductPage = (productId: number) => {
    navigate(paths.product.details(productId));
  };

  return (
    <>
      {products.length ? (
        <Masonry columns={{ xs: 2, sm: 3 }} spacing={2} sx={{ width: 'auto' }}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onClick={() => goToProductPage(product.id)}
            />
          ))}
        </Masonry>
      ) : (
        <NoResult />
      )}
    </>
  );
};
