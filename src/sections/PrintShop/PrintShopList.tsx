import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify/iconify';
import { PrintShopInterface } from 'src/types/response.dto';

interface PrintShopListProps {
  printShops: PrintShopInterface[];
}

export const PrintShopList = ({ printShops }: PrintShopListProps) => {
  const navigate = useNavigate();

  const goToPrintShopPage = (shop: PrintShopInterface) => {
    navigate(`/print-shop/${shop.id}`);
  };

  return (
    <>
      {printShops.length ? (
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
      ) : (
        <Typography variant="h6" sx={{ mt: 4 }}>
          결과가 없습니다. 😢
        </Typography>
      )}
    </>
  );
};
