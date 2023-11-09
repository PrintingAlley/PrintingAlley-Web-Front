import React, { useEffect, useCallback } from 'react';
import { PrintShopDetail, ProductDetail } from 'src/types/response.dto';
import Iconify from 'src/components/iconify';
import { Box, IconButton, Tooltip } from '@mui/material';
import { KAKAO_KEY } from 'src/config-global';

interface ShareButtonProps {
  productDetail?: ProductDetail;
  printShopDetail?: PrintShopDetail;
}

const KakaoShareButton: React.FC<ShareButtonProps> = ({ productDetail, printShopDetail }) => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
    }
  }, []);

  const sendKakaoMessage = useCallback(() => {
    if (!(window.Kakao && window.Kakao.isInitialized())) {
      console.error('Kakao SDK not initialized');
      return;
    }

    let kakaoPayload: any;
    const mobileWebUrl = window.location.href;
    const webUrl = window.location.href;

    if (productDetail) {
      kakaoPayload = {
        objectType: 'feed',
        content: {
          title: productDetail.name,
          description: productDetail.introduction,
          imageUrl: productDetail.mainImage,
          link: {
            mobileWebUrl,
            webUrl,
          },
        },
        social: {
          likeCount: productDetail.bookmarkCount,
          commentCount: productDetail.reviews.length,
        },
        buttons: [
          {
            title: '자세히 보기',
            link: { mobileWebUrl, webUrl },
          },
          {
            title: '앱으로 보기',
            link: { mobileWebUrl, webUrl },
          },
        ],
      };
    } else if (printShopDetail) {
      kakaoPayload = {
        objectType: 'location',
        content: {
          title: printShopDetail.name,
          description: printShopDetail.introduction,
          imageUrl: printShopDetail.logoImage,
          link: {
            mobileWebUrl,
            webUrl,
          },
        },
        address: printShopDetail.address,
        social: {
          commentCount: printShopDetail.reviews.length,
        },
        buttons: [
          {
            title: '자세히 보기',
            link: { mobileWebUrl, webUrl },
          },
        ],
      };
    }

    if (kakaoPayload) {
      window.Kakao.Share.sendDefault(kakaoPayload);
    }
  }, [productDetail, printShopDetail]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip title="카카오톡으로 공유하기">
        <IconButton onClick={sendKakaoMessage} sx={{ position: 'absolute', right: 0, top: 4 }}>
          <Iconify icon="ri:kakao-talk-fill" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default KakaoShareButton;
