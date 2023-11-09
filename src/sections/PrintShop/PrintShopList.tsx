import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify/iconify';
import { PrintShopInterface } from 'src/types/response.dto';
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
            <ListItem
              key={shop.id}
              secondaryAction={
                <Tooltip title="인쇄사 페이지로 이동">
                  <IconButton onClick={() => goToPrintShopPage(shop)}>
                    <Iconify icon="ic:round-keyboard-arrow-right" />
                  </IconButton>
                </Tooltip>
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
        <NoResult />
      )}
    </>
  );
};
