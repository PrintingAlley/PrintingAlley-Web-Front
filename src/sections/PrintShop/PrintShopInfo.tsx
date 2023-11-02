import { Avatar, Box, Divider, Grid, Link, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { PrintShopDetail } from 'src/types/response.dto';

interface Props {
  printShop: PrintShopDetail;
}

const PrintShopInfo = ({ printShop }: Props) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Avatar
        alt="Logo"
        src={printShop.logoImage}
        sx={{ width: 1, height: 'auto' }}
        variant="rounded"
      />
    </Grid>
    <Grid item xs={12} md={8}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="carbon:location" color="text.secondary" />
        <Link
          color="primary"
          href={`https://map.kakao.com/link/to/${printShop.name},${printShop.latitude},${printShop.longitude}`}
          target="_blank"
        >
          {printShop.address}
        </Link>
      </Box>
      <Divider sx={{ my: 0.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="carbon:phone" color="text.secondary" />
        <Link color="primary" href={`tel:${printShop.phone}`}>
          {printShop.phone}
        </Link>
      </Box>
      <Divider sx={{ my: 0.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="carbon:email" color="text.secondary" />
        <Link color="primary" href={`mailto:${printShop.email}`}>
          {printShop.email}
        </Link>
      </Box>
      <Divider sx={{ my: 0.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="carbon:link" color="text.secondary" />
        <Link color="primary" href={printShop.homepage} target="_blank">
          {printShop.homepage}
        </Link>
      </Box>
      <Divider sx={{ my: 0.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="carbon:user" color="text.secondary" />
        <Typography fontWeight="medium">{printShop.representative}</Typography>
      </Box>
      <Divider sx={{ my: 0.5 }} />
      <Typography variant="body2">{printShop.introduction}</Typography>
    </Grid>
  </Grid>
);

export default PrintShopInfo;
