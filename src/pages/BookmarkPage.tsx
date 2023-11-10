import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookmarkGroupList } from 'src/sections/Bookmark/BookmarkGroupList';
import Title from 'src/sections/common/Title';
import { BookmarkGroupWithExtra, GetBookmarkGroupsResponse } from 'src/types/response.dto';
import axios from 'src/utils/axios';

export default function BookmarkPage() {
  const [bookmarkGroups, setBookmarkGroups] = useState<BookmarkGroupWithExtra[] | null>(null);

  const fetchBookmarkGroups = () => {
    axios.get<GetBookmarkGroupsResponse>('/bookmark/group').then((response) => {
      setBookmarkGroups(response.data.bookmarkGroups);
    });
  };

  useEffect(() => {
    fetchBookmarkGroups();
  }, []);

  return (
    <div>
      <Helmet>
        <title>북마크 | 인쇄골목</title>
      </Helmet>

      <Title title="나의 북마크 목록" />

      {bookmarkGroups && (
        <BookmarkGroupList
          bookmarkGroups={bookmarkGroups}
          fetchBookmarkGroups={fetchBookmarkGroups}
        />
      )}
    </div>
  );
}
