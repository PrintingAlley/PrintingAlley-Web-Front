import {
  Typography,
  List,
  ListItem,
  Button,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
} from '@mui/material';
import { PrintShop } from 'src/types/print-shop';

export const PrintShopList = ({
  printShops,
  setSelectedShop,
}: {
  printShops: PrintShop[];
  setSelectedShop: (shop: PrintShop) => void;
}) => (
  <Box>
    <Typography variant="h3" gutterBottom>
      인쇄소 목록
    </Typography>
    <List>
      {printShops.map((shop) => (
        <ListItem
          key={shop.id}
          secondaryAction={
            <Button variant="contained" onClick={() => setSelectedShop(shop)}>
              자세히 보기
            </Button>
          }
        >
          <ListItemAvatar>
            <Avatar alt="Logo" src={shop.logoImage} />
          </ListItemAvatar>
          <ListItemText primary={shop.name} secondary={shop.address} />
        </ListItem>
      ))}
    </List>
  </Box>
);
