import { Avatar, Box, ButtonGroup, Divider, Typography } from '@mui/material';
import axios from 'src/utils/axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { UpdatePrintShopDialog } from 'src/sections/PrintShop/UpdatePrintShopDialog';
import { DeletePrintShopButton } from 'src/sections/PrintShop/DeletePrintShopButton';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';
import {
  GetPrintShopResponse,
  GetPrintShopReviewsResponse,
  PrintShopDetail,
  PrintShopReviewWithUser,
} from 'src/types/response.dto';
import useAuth from 'src/hooks/useAuth';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { ReviewSection } from 'src/sections/Review/ReviewSection';
import PrintShopInfo from 'src/sections/PrintShop/PrintShopInfo';
import PrintShopProducts from 'src/sections/PrintShop/PrintShopProducts';

export default function PrintShopDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [printShop, setPrintShop] = useState<PrintShopDetail | null>(null);
  const [reviews, setReviews] = useState<PrintShopReviewWithUser[]>([]);

  const fetchPrintShop = () => {
    axios.get<GetPrintShopResponse>(`print-shop/${id}`).then((response) => {
      setPrintShop(response.data.printShop);
    });
  };

  const fetchReviews = () => {
    axios.get<GetPrintShopReviewsResponse>(`/print-shop/${id}/review`).then((response) => {
      setReviews(response.data.printShopReviews);
    });
  };

  const onAdd = () => {
    fetchPrintShop();
  };

  const onDelete = () => {
    navigate('/print-shop', { replace: true });
  };

  useEffect(() => {
    fetchPrintShop();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {printShop ? (
        <div>
          <NavigateBackButton />
          <CenteredTitle title={printShop.name} />
          <PrintShopInfo printShop={printShop} />

          <Box sx={{ height: 32 }} />

          <Avatar
            alt="Background"
            src={printShop.backgroundImage}
            sx={{ width: '100%', height: 300 }}
            variant="rounded"
          />

          <Divider sx={{ my: 2 }} />

          <PrintShopProducts products={printShop.products} />

          <Divider sx={{ my: 2 }} />

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

          <Divider sx={{ my: 2 }} />

          <ReviewSection
            type="print-shop"
            targetId={printShop.id}
            reviews={reviews}
            currentUser={user}
            fetchReviews={fetchReviews}
          />

          <Box sx={{ height: 64 }} />

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
