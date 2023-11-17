import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';
import {
  GetPrintShopResponse,
  GetPrintShopReviewsResponse,
  PrintShopDetail,
  PrintShopReviewWithUser,
} from 'src/types/response.dto';
import { increasePrintShopViewCount } from 'src/apis/view-count';
import { useNavigate } from 'react-router';

const usePrintShopData = (printShopId: string | undefined) => {
  const navigate = useNavigate();
  const [printShop, setPrintShop] = useState<PrintShopDetail | null>(null);
  const [reviews, setReviews] = useState<PrintShopReviewWithUser[] | null>(null);

  const fetchPrintShop = async () => {
    axios
      .get<GetPrintShopResponse>(`/print-shop/${printShopId}`)
      .then((res) => {
        setPrintShop(res.data.printShop);
        fetchReviews();
        increaseViewCount();
        return res;
      })
      .catch((err) => {
        navigate('/404');
        return err;
      });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printShopId]);

  return { printShop, reviews, fetchPrintShop };
};

export default usePrintShopData;
