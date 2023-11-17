import { Grid, Stack, Typography, Divider, Tooltip, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ProductDetail } from 'src/types/response.dto';
import LightboxForSingleImage from '../common/LightboxForSingleImage';

interface ProductInfoProps {
  product: ProductDetail;
  actions: React.ReactNode;
}

const ProductInfo = ({ product, actions }: ProductInfoProps) => (
  <Grid container spacing={{ xs: 5, md: 3 }}>
    <Grid item xs={12} md={4}>
      <Stack alignItems="center">
        <LightboxForSingleImage
          src={product.mainImage}
          sx={{
            mt: { xs: 0, md: 5 },
            width: 1,
            height: 'auto',
            aspectRatio: 1,
            maxWidth: { xs: 200, md: 1 },
            borderRadius: 1.5,
          }}
        />
      </Stack>
    </Grid>
    <Grid item xs={12} md={8}>
      <Stack alignItems="flex-end">{actions}</Stack>
      <Typography variant="subtitle1" color="text.secondary">
        {product.category.name}
      </Typography>
      <Divider sx={{ my: 0.5 }} />
      <Typography>
        <b>제작 인쇄사</b>{' '}
        <Tooltip title="인쇄사 페이지로 이동">
          <Link component={NavLink} to={`/print-shop/${product.printShop.id}`}>
            {product.printShop.name}
          </Link>
        </Tooltip>
      </Typography>
      <Divider sx={{ my: 0.5 }} />
      <Typography>
        <b>디자인</b> {product.designer}
      </Typography>
      <Divider sx={{ my: 0.5 }} />
      <Typography>
        <b>제품 크기</b> {product.size}
      </Typography>
      <Divider sx={{ my: 0.5 }} />
      <Typography>
        <b>종이</b> {product.paper}
      </Typography>
      {product.printType && (
        <>
          <Divider sx={{ my: 0.5 }} />
          <Typography>
            <b>인쇄 방식</b> {product.printType}
          </Typography>
        </>
      )}
      {product.afterProcess && (
        <>
          <Divider sx={{ my: 0.5 }} />
          <Typography>
            <b>후가공</b> {product.afterProcess}
          </Typography>
        </>
      )}
      <Divider sx={{ my: 0.5 }} />
      <Typography>{product.introduction}</Typography>
    </Grid>
  </Grid>
);

export default ProductInfo;
