import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify/iconify';
import { PrintShop } from 'src/types/print-shop';

interface PrintShopListProps {
  printShops: PrintShop[];
}

export const PrintShopList = ({ printShops }: PrintShopListProps) => {
  const navigate = useNavigate();

  const goToPrintShopPage = (shop: PrintShop) => {
    navigate(`/print-shop/${shop.id}`);
  };

  return (
    <List>
      {printShops.map((shop) => (
        <ListItem
          key={shop.id}
          secondaryAction={
            <IconButton onClick={() => goToPrintShopPage(shop)}>
              <Iconify icon="ic:round-keyboard-arrow-right" />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar alt="Logo" src={shop.logoImage} />
          </ListItemAvatar>
          <ListItemText primary={shop.name} secondary={shop.address} />
        </ListItem>
      ))}
    </List>
  );
};
