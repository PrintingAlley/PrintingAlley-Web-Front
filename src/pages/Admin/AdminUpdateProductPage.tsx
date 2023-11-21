import { useTag } from 'src/hooks/useTag';
import { Box } from '@mui/material';
import Title from 'src/sections/common/Title';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { Helmet } from 'react-helmet-async';
import { AdminUpdateProductForm } from 'src/sections/Admin/AdminUpdateProductForm';
import { GetProductResponse, ProductDetail } from 'src/types/response.dto';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';
import { paths } from 'src/routes/path';
import PageContainer from 'src/sections/common/PageContainer';

export default function AdminUpdateProductPage() {
  const { printShopId, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const { topLevelTags, tagHierarchies } = useTag();

  const fetchProduct = () => {
    axios.get<GetProductResponse>(`/product/${id}`).then((response) => {
      setProduct(response.data.product);
    });
  };

  const navigateToProductDetail = () => {
    navigate(paths.product.details(id), { replace: true });
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <PageContainer>
      <Helmet>
        <title>상품 수정 (관리자) | 인쇄골목</title>
      </Helmet>

      <NavigateBackButton />

      <Title title="상품 수정 (관리자)" sx={{ mt: 8 }} />

      <Box sx={{ height: 16 }} />

      {printShopId && product && (
        <AdminUpdateProductForm
          printShopId={Number(printShopId)}
          product={product}
          topLevelTags={topLevelTags}
          tagHierarchies={tagHierarchies}
          onAddSuccess={navigateToProductDetail}
        />
      )}
    </PageContainer>
  );
}
