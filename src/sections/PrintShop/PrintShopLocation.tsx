import { Typography } from '@mui/material';
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import { PrintShopDetail } from 'src/types/response.dto';

interface Props {
  printShop: PrintShopDetail;
}

const PrintShopLocation = ({ printShop }: Props) => (
  <>
    <Typography variant="h6" gutterBottom>
      위치
    </Typography>
    <Map
      center={{ lat: +printShop.latitude, lng: +printShop.longitude }}
      style={{ width: '100%', height: 300, borderRadius: 12 }}
    >
      <MapMarker position={{ lat: +printShop.latitude, lng: +printShop.longitude }} />
      <ZoomControl position="RIGHT" />
    </Map>
  </>
);

export default PrintShopLocation;
