import { useState, useEffect } from 'react';
import axios from 'src/utils/axios';
import { GetContentsResponse, ContentInterface } from 'src/types/response.dto';
import { ContentList } from 'src/sections/Content/ContentList';
import Title from 'src/sections/common/Title';
import { Helmet } from 'react-helmet-async';

export default function ContentPage() {
  const [contents, setContents] = useState<ContentInterface[] | null>(null);

  const fetchContents = () => {
    axios.get<GetContentsResponse>('/content').then((response) => {
      setContents(response.data.contents);
    });
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <div>
      <Helmet>
        <title>콘텐츠 | 인쇄 골목</title>
      </Helmet>

      <Title title="인쇄가 어려운 당신에게" />

      {contents && <ContentList contents={contents} />}
    </div>
  );
}
