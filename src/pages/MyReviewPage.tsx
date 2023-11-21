import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MyPrintShopReviewSection,
  MyProductReviewSection,
} from 'src/sections/MyReview/MyReviewSection';
import PageContainer from 'src/sections/common/PageContainer';
import Title from 'src/sections/common/Title';
import {
  GetUserPrintShopReviewsResponse,
  GetUserProductReviewsResponse,
  PrintShopReviewWithPrintShop,
  ProductReviewWithProduct,
} from 'src/types/response.dto';
import axios from 'src/utils/axios';

export default function MyReviewPage() {
  const [currentTab, setCurrentTab] = useState<'print-shop' | 'product'>('print-shop');
  const [printShopReviews, setPrintShopReviews] = useState<PrintShopReviewWithPrintShop[] | null>(
    null
  );
  const [productReviews, setProductReviews] = useState<ProductReviewWithProduct[] | null>(null);
  const fetchPrintShopReviews = () => {
    axios.get<GetUserPrintShopReviewsResponse>(`/user/print-shop-review`).then((response) => {
      setPrintShopReviews(response.data.printShopReviews);
    });
  };
  const fetchProductReviews = () => {
    axios.get<GetUserProductReviewsResponse>(`/user/product-review`).then((response) => {
      setProductReviews(response.data.productReviews);
    });
  };

  useEffect(() => {
    fetchPrintShopReviews();
    fetchProductReviews();
  }, []);

  return (
    <PageContainer>
      <Helmet>
        <title>내 리뷰 | 인쇄골목</title>
      </Helmet>

      <Title title="내가 작성한 리뷰 목록" />

      <ToggleButtonGroup
        value={currentTab}
        exclusive
        onChange={(event, value) => value && setCurrentTab(value)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="print-shop">인쇄사 리뷰</ToggleButton>
        <ToggleButton value="product">상품 리뷰</ToggleButton>
      </ToggleButtonGroup>

      {currentTab === 'print-shop' ? (
        <>
          {printShopReviews && (
            <MyPrintShopReviewSection
              reviews={printShopReviews}
              fetchReviews={fetchPrintShopReviews}
            />
          )}
        </>
      ) : (
        <>
          {productReviews && (
            <MyProductReviewSection reviews={productReviews} fetchReviews={fetchPrintShopReviews} />
          )}
        </>
      )}
    </PageContainer>
  );
}
