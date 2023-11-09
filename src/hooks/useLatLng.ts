import axios from 'axios';
import { UseFormSetValue } from 'react-hook-form';
import { KAKAO_REST_API_KEY } from 'src/config-global';
import { CreatePrintShop } from 'src/types/print-shop';

const useLatLng = () => {
  const setLatLngFromAddress = async (
    address: string,
    setValue: UseFormSetValue<CreatePrintShop>
  ) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
        { headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` } }
      );

      const { documents } = response.data;

      if (documents && documents[0]) {
        const { x: longitude, y: latitude } = documents[0];
        setValue('latitude', latitude);
        setValue('longitude', longitude);
      } else {
        console.error('No location data found for the given address.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return { setLatLngFromAddress };
};

export default useLatLng;
