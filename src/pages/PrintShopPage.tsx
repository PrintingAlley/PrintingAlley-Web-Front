import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Container } from '@mui/material';
import axios from 'src/utils/axios';
import { PrintShopDetails } from 'src/sections/PrintShop/PrintShopDetails';
import { PrintShopList } from 'src/sections/PrintShop/PrintShopList';
import { PrintShop, Tag } from 'src/types/print-shop';
import { selectedTagsState } from 'src/store/atoms';
import { NewPrintShopDialog } from 'src/sections/PrintShop/NewPrintShopDialog';

const useTopLevelTags = () => {
  const [topLevelTags, setTopLevelTags] = useState<Tag[]>([]);
  const [tagHierarchies, setTagHierarchies] = useState<Record<number, Tag[]>>({});

  useEffect(() => {
    axios.get<Tag[]>('tag/top-level').then((response) => {
      setTopLevelTags(response.data);
      response.data.forEach((tag) => {
        axios.get<Tag>(`tag/${tag.id}/hierarchy`).then((res) => {
          setTagHierarchies((prev) => ({ ...prev, [tag.id]: res.data.children }));
        });
      });
    });
  }, []);

  return { topLevelTags, tagHierarchies };
};

export default function PrintShopPage() {
  const [printShops, setPrintShops] = useState<PrintShop[]>([]);
  const selectedTags = useRecoilValue(selectedTagsState);
  const { topLevelTags, tagHierarchies } = useTopLevelTags();
  const [selectedShop, setSelectedShop] = useState<PrintShop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPrintShops = (tags = [] as number[]) => {
    axios
      .get<PrintShop[]>('print-shop', {
        params: { tagIds: tags },
      })
      .then((response) => {
        // 요청 URL 확인
        // console.log(response.request.responseURL);
        setPrintShops(response.data);
      });
  };

  useEffect(() => {
    fetchPrintShops(selectedTags);
  }, [selectedTags]);

  const handleShopSelect = (shop: PrintShop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <PrintShopList
        printShops={printShops}
        setSelectedShop={handleShopSelect}
        topLevelTags={topLevelTags}
        tagHierarchies={tagHierarchies}
      />
      {selectedShop && (
        <PrintShopDetails
          selectedShop={selectedShop}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      <NewPrintShopDialog
        topLevelTags={topLevelTags}
        tagHierarchies={tagHierarchies}
        onAdd={fetchPrintShops}
      />
    </Container>
  );
}
