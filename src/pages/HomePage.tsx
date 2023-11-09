import { Helmet } from 'react-helmet-async';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import SkeletonSection from 'src/sections/common/SkeletonSection';

export default function HomePage() {
  return (
    <div>
      <Helmet>
        <title>인쇄 골목</title>
      </Helmet>

      <CenteredTitle title="인쇄 골목은 이러한 서비스입니다" />

      <SkeletonSection />
    </div>
  );
}
