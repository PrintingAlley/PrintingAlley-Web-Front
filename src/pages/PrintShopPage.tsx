import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'src/utils/axios';
import { NewPrintShopForm } from 'src/sections/PrintShop/NewPrintShopForm';
import { PrintShopDetails } from 'src/sections/PrintShop/PrintShopDetails';
import { PrintShopList } from 'src/sections/PrintShop/PrintShopList';
import { PrintShop, Tag } from 'src/types/print-shop';

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
  const { topLevelTags, tagHierarchies } = useTopLevelTags();
  const [selectedShop, setSelectedShop] = useState<PrintShop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPrintShops = () => {
    axios.get<PrintShop[]>('print-shop').then((response) => setPrintShops(response.data));
  };

  useEffect(() => {
    fetchPrintShops();
  }, []);

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
      <PrintShopList printShops={printShops} setSelectedShop={handleShopSelect} />
      {selectedShop && (
        <PrintShopDetails
          selectedShop={selectedShop}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      <NewPrintShopForm
        topLevelTags={topLevelTags}
        tagHierarchies={tagHierarchies}
        onAdd={fetchPrintShops}
      />
    </Container>
  );
}
