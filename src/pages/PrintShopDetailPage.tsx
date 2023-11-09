import { Avatar, Box, Button, ButtonGroup, Divider } from '@mui/material';
import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { UpdatePrintShopDialog } from 'src/sections/PrintShop/UpdatePrintShopDialog';
import { DeletePrintShopButton } from 'src/sections/PrintShop/DeletePrintShopButton';
import CenteredTitle from 'src/sections/common/CenteredTitle';
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
import PrintShopLocation from 'src/sections/PrintShop/PrintShopLocation';
import Iconify from 'src/components/iconify';
import KakaoShareButton from 'src/sections/common/KakaoShareButton';
import { Helmet } from 'react-helmet-async';

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

  const goToNewProductPage = () => {
    navigate('/product/new');
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
          <Helmet>
            <title>{printShop.name} | 인쇄 골목</title>
          </Helmet>

          <NavigateBackButton />

          <KakaoShareButton printShopDetail={printShop} />

          <CenteredTitle title={printShop.name} sx={{ my: 5 }} />

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

          <PrintShopLocation printShop={printShop} />

          <Divider sx={{ my: 2 }} />

          <ReviewSection
            type="print-shop"
            targetId={printShop.id}
            reviews={reviews}
            currentUser={user}
            fetchReviews={fetchReviews}
          />

          <Box sx={{ height: 64 }} />

          {user?.id === printShop.ownerId && (
            <ButtonGroup color="inherit">
              <Button
                startIcon={<Iconify icon="ic:baseline-add" />}
                variant="soft"
                onClick={goToNewProductPage}
              >
                상품 등록
              </Button>
              <UpdatePrintShopDialog printShop={printShop} onAdd={onAdd} />
              <DeletePrintShopButton printShop={printShop} onDelete={onDelete} />
            </ButtonGroup>
          )}
        </div>
      ) : (
        <SkeletonSection />
      )}
    </>
  );
}
