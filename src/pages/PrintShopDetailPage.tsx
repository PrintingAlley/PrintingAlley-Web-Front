import { Avatar, ButtonGroup, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { UpdatePrintShopDialog } from 'src/sections/PrintShop/UpdatePrintShopDialog';
import { DeletePrintShopButton } from 'src/sections/PrintShop/DeletePrintShopButton';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import Iconify from 'src/components/iconify';
import { GetPrintShopResponse, PrintShopDetail } from 'src/types/response.dto';

export default function PrintShopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [printShop, setPrintShop] = useState<PrintShopDetail | null>(null);

  const fetchPrintShop = () => {
    axios.get<GetPrintShopResponse>(`print-shop/${id}`).then((response) => {
      setPrintShop(response.data.printShop);
    });
  };

  const onAdd = () => {
    fetchPrintShop();
  };

  const onDelete = () => {
    navigate('/print-shop', { replace: true });
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchPrintShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {printShop ? (
        <div>
          <IconButton onClick={goBack}>
            <Iconify icon="ic:round-arrow-back" />
          </IconButton>

          <CenteredTitle title={printShop.name} />

          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <Avatar alt="Logo" src={printShop.logoImage} sx={{ width: 120, height: 120 }} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" color="textSecondary">
                {printShop.address}
              </Typography>
              <Typography>{printShop.phone}</Typography>
              <Typography>{printShop.email}</Typography>
              <Link color="primary" href={printShop.homepage} target="_blank">
                {printShop.homepage}
              </Link>
              <Typography fontWeight="medium">{printShop.representative}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                {printShop.introduction}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
              <Avatar
                alt="Background"
                src={printShop.backgroundImage}
                sx={{ width: '100%', height: 240 }}
                variant="rounded"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Map
                center={{ lat: +printShop.latitude, lng: +printShop.longitude }}
                style={{ width: '100%', height: 240, borderRadius: 12 }}
              >
                <MapMarker position={{ lat: +printShop.latitude, lng: +printShop.longitude }} />
                <ZoomControl position="RIGHT" />
              </Map>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <ButtonGroup color="inherit">
            <UpdatePrintShopDialog printShop={printShop} onAdd={onAdd} />
            <DeletePrintShopButton printShop={printShop} onDelete={onDelete} />
          </ButtonGroup>
        </div>
      ) : (
        <SkeletonSection />
      )}
    </>
  );
}
