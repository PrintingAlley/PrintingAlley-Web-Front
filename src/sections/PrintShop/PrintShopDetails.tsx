import {
  Grid,
  Avatar,
  Typography,
  Chip,
  Link,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { PrintShop } from 'src/types/print-shop';
import axios from 'src/utils/axios';

interface PrintShopDetailsProps {
  selectedShop: PrintShop;
  open: boolean;
  onClose: () => void;
}

export const PrintShopDetails = ({ selectedShop, open, onClose }: PrintShopDetailsProps) => {
  const [printShop, setPrintShop] = useState<PrintShop | null>(null);

  useEffect(() => {
    axios.get<PrintShop>(`print-shop/${selectedShop.id}`).then((response) => {
      setPrintShop(response.data);
    });
  }, [selectedShop.id]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle variant="h4">{printShop?.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <Avatar alt="Logo" src={printShop?.logoImage} sx={{ width: 120, height: 120 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" color="textSecondary">
              {printShop?.address}
            </Typography>
            <Typography>{printShop?.phone}</Typography>
            <Typography>{printShop?.email}</Typography>
            <Link color="primary" href={printShop?.homepage} target="_blank">
              {printShop?.homepage}
            </Link>
            <Typography fontWeight="medium">{printShop?.representative}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              {printShop?.introduction}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Avatar
              alt="Background"
              src={printShop?.backgroundImage}
              sx={{ width: 240, height: 240, bgcolor: green[500] }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography>Latitude: {printShop?.latitude}</Typography>
              <Typography>Longitude: {printShop?.longitude}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {printShop?.tags?.map((tag) => <Chip key={tag.id} label={tag.name} />)}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
