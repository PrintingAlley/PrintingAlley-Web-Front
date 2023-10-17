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
import { PrintShop } from 'src/types/print-shop';

interface Props {
  selectedShop: PrintShop;
  open: boolean;
  onClose: () => void;
}

export const PrintShopDetails = ({ selectedShop, open, onClose }: Props) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle variant="h4">{selectedShop.name}</DialogTitle>
    <DialogContent>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Avatar alt="Logo" src={selectedShop.logoImage} sx={{ width: 120, height: 120 }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" color="textSecondary">
            {selectedShop.address}
          </Typography>
          <Typography>{selectedShop.phone}</Typography>
          <Typography>{selectedShop.email}</Typography>
          <Link color="primary" href={selectedShop.homepage} target="_blank">
            {selectedShop.homepage}
          </Link>
          <Typography fontWeight="medium">{selectedShop.representative}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {selectedShop.introduction}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Avatar
            alt="Background"
            src={selectedShop.backgroundImage}
            sx={{ width: 240, height: 240, bgcolor: green[500] }}
            variant="rounded"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography>Latitude: {selectedShop.latitude}</Typography>
            <Typography>Longitude: {selectedShop.longitude}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Tags:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedShop.tags?.map((tag) => <Chip key={tag.id} label={tag.name} />)}
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
