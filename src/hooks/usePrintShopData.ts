import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';
import {
  GetPrintShopResponse,
  GetPrintShopReviewsResponse,
  PrintShopDetail,
  PrintShopReviewWithUser,
} from 'src/types/response.dto';
import { increasePrintShopViewCount } from 'src/apis/view-count';

const usePrintShopData = (printShopId: string | undefined) => {
  const [printShop, setPrintShop] = useState<PrintShopDetail | null>(null);
  const [reviews, setReviews] = useState<PrintShopReviewWithUser[] | null>(null);

  const fetchPrintShop = async () => {
    const response = await axios.get<GetPrintShopResponse>(`/print-shop/${printShopId}`);
    setPrintShop(response.data.printShop);
  };

  const fetchReviews = async () => {
    const response = await axios.get<GetPrintShopReviewsResponse>(
      `/print-shop/${printShopId}/review`
    );
    setReviews(response.data.printShopReviews);
  };

  const increaseViewCount = async () => {
    await increasePrintShopViewCount(Number(printShopId));
  };

  useEffect(() => {
    if (!printShopId) return;
    fetchPrintShop();
    fetchReviews();
    increaseViewCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printShopId]);

  return { printShop, reviews, fetchPrintShop, fetchReviews };
};

export default usePrintShopData;
