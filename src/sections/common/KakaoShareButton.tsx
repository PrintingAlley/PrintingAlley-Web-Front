import React, { useEffect, useCallback } from 'react';
import { PrintShopDetail, ProductDetail } from 'src/types/response.dto';
import Iconify from 'src/components/iconify';
import { Box, IconButton, Tooltip } from '@mui/material';

interface ShareButtonProps {
  productDetail?: ProductDetail;
  printShopDetail?: PrintShopDetail;
}

const KakaoShareButton: React.FC<ShareButtonProps> = ({ productDetail, printShopDetail }) => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);

  const sendKakaoMessage = useCallback(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      console.error('Kakao SDK not initialized');
      return;
    }

    const sharedDetail = productDetail ?? printShopDetail;
    if (!sharedDetail) {
      console.error('No detail provided for sharing');
      return;
    }

    const mobileWebUrl = window.location.href;
    const webUrl = window.location.href;

    const kakaoPayload: any = {
      objectType: 'feed',
      content: {
        title: sharedDetail.name,
        description: productDetail?.description ?? printShopDetail?.introduction,
        imageUrl: productDetail?.mainImage ?? printShopDetail?.logoImage,
        link: {
          mobileWebUrl,
          webUrl,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: { mobileWebUrl, webUrl },
        },
      ],
    };

    if (productDetail) {
      kakaoPayload.social = {
        likeCount: productDetail.bookmarkCount ?? 0,
      };
    }

    window.Kakao.Share.sendDefault(kakaoPayload);
  }, [productDetail, printShopDetail]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip title="카카오톡으로 공유하기">
        <IconButton onClick={sendKakaoMessage} sx={{ position: 'absolute', right: -18 }}>
          <Iconify icon="ri:kakao-talk-fill" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default KakaoShareButton;
