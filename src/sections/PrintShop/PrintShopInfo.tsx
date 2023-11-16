import { Box, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { PrintShopDetail } from 'src/types/response.dto';
import LightboxForSingleImage from '../common/LightboxForSingleImage';

interface PrintShopInfoProps {
  printShop: PrintShopDetail;
  actions: React.ReactNode;
}

const PrintShopInfo = ({ printShop, actions }: PrintShopInfoProps) => (
  <Grid container spacing={{ xs: 5, md: 3 }}>
    <Grid item xs={12} md={4}>
      <Stack alignItems="center">
        <LightboxForSingleImage
          src={printShop.logoImage}
          sx={{
            mt: { xs: 0, md: 5 },
            width: 1,
            height: 'auto',
            aspectRatio: 1,
            maxWidth: { xs: 150, md: 1 },
            borderRadius: 1.5,
          }}
        />
      </Stack>
    </Grid>
    <Grid item xs={12} md={8} sx={{ svg: { minWidth: 20 } }}>
      <Stack alignItems="flex-end">{actions}</Stack>
      <Typography variant="subtitle1" color="secondary.dark">
        {printShop.type}
      </Typography>
      <Divider sx={{ my: 0.5 }} />
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
      {printShop.homepage && (
        <>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon="carbon:link" color="text.secondary" />
            <Link color="primary" href={printShop.homepage} target="_blank" noWrap>
              {printShop.homepage}
            </Link>
          </Box>
        </>
      )}
      <Divider sx={{ my: 0.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="carbon:time" color="text.secondary" />
        <Typography>{printShop.businessHours}</Typography>
      </Box>
      <Divider sx={{ my: 0.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="carbon:chat" color="text.secondary" />
        <Typography>{printShop.introduction}</Typography>
      </Box>
      {printShop.printType && (
        <>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon="carbon:printer" color="text.secondary" />
            <Typography>{printShop.printType}</Typography>
          </Box>
        </>
      )}
      {printShop.afterProcess && (
        <>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon="carbon:cut" color="text.secondary" />
            <Typography>{printShop.afterProcess}</Typography>
          </Box>
        </>
      )}
    </Grid>
  </Grid>
);

export default PrintShopInfo;
