import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { UpdatePrintShopDialog } from 'src/sections/PrintShop/UpdatePrintShopDialog';
import { DeletePrintShopButton } from 'src/sections/PrintShop/DeletePrintShopButton';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import useAuth from 'src/hooks/useAuth';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { ReviewSection } from 'src/sections/Review/ReviewSection';
import PrintShopInfo from 'src/sections/PrintShop/PrintShopInfo';
import PrintShopProducts from 'src/sections/PrintShop/PrintShopProducts';
import PrintShopLocation from 'src/sections/PrintShop/PrintShopLocation';
import Iconify from 'src/components/iconify';
import { Helmet } from 'react-helmet-async';
import LightboxForSingleImage from 'src/sections/common/LightboxForSingleImage';
import PrintShopActions from 'src/sections/PrintShop/PrintShopActions';
import usePrintShopData from 'src/hooks/usePrintShopData';

export default function PrintShopDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  const { printShop, reviews, fetchPrintShop, fetchReviews } = usePrintShopData(id);

  const scrollToReviewSection = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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

  const navigateToAdminNewProductPage = () => {
    navigate(`/admin/product/new/${id}`);
  };

  return (
    <>
      {printShop ? (
        <div>
          <Helmet>
            <title>{printShop.name} | 인쇄골목</title>
          </Helmet>

          <NavigateBackButton />

          <CenteredTitle title={printShop.name} sx={{ mt: 8, mb: { xs: 5, md: 3 } }} />

          <PrintShopInfo
            printShop={printShop}
            actions={
              <PrintShopActions
                printShop={printShop}
                reviews={reviews}
                isAuthenticated={isAuthenticated}
                onReviewScroll={scrollToReviewSection}
                fetchPrintShop={fetchPrintShop}
              />
            }
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            인쇄사 사진
          </Typography>
          <LightboxForSingleImage
            src={printShop.backgroundImage}
            sx={{
              width: '100%',
              height: 300,
              borderRadius: 1.5,
            }}
          />

          <Divider sx={{ my: 2 }} />

          <PrintShopProducts products={printShop.products} />

          <Divider sx={{ my: 2 }} />

          <PrintShopLocation printShop={printShop} />

          <Divider sx={{ my: 2 }} />

          <Box ref={reviewSectionRef}>
            {reviews && (
              <ReviewSection
                type="print-shop"
                targetId={printShop.id}
                reviews={reviews}
                fetchReviews={fetchReviews}
              />
            )}
          </Box>

          <Box sx={{ height: 64 }} />

          {user?.id === printShop.ownerId && (
            <ButtonGroup color="inherit">
              {user.userType === 'ADMIN' ? (
                <Button
                  onClick={navigateToAdminNewProductPage}
                  startIcon={<Iconify icon="ic:baseline-edit" />}
                  variant="soft"
                >
                  상품 등록 (관리자)
                </Button>
              ) : (
                <Button
                  startIcon={<Iconify icon="ic:baseline-add" />}
                  variant="soft"
                  onClick={goToNewProductPage}
                >
                  상품 등록
                </Button>
              )}
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
