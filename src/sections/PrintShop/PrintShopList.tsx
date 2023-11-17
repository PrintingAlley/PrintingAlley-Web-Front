import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { PrintShopInterface } from 'src/types/response.dto';
import { PLACEHOLDER_IMAGE_PATH } from 'src/constants/image-path';
import NoResult from '../common/NoResult';

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
            <ListItem key={shop.id} disablePadding>
              <ListItemButton onClick={() => goToPrintShopPage(shop)}>
                <ListItemAvatar>
                  <Avatar
                    alt="Logo"
                    src={shop.logoImage || PLACEHOLDER_IMAGE_PATH}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                  />
                </ListItemAvatar>
                <ListItemText primary={shop.name} secondary={shop.address} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <NoResult />
      )}
    </>
  );
};
