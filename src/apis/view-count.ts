import axios from 'src/utils/axios';

export const increasePrintShopViewCount = async (id: number) => {
  await axios.post(`/print-shop/${id}/view`);
};

export const increaseProductViewCount = async (id: number) => {
  await axios.post(`/product/${id}/view`);
};
