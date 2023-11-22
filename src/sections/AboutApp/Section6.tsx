import { useEffect, useState } from 'react';
import { Item, fullpageApi } from '@fullpage/react-fullpage';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Logo from 'src/components/logo';
import { varHover } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { APPLE_APP_STORE_URL } from 'src/constants/commons';
import SectionUpButton from './SectionUpButton';

const TEXT = '인쇄골목';

export default function Section6({
  destination,
  fullpage,
}: {
  destination: Item | null;
  fullpage: fullpageApi;
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (destination && destination.index === 5) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [destination]);

  const onClickAppStore = () => {
    window.open(APPLE_APP_STORE_URL);
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'grey.50',
      }}
    >
      <Container>
        <Grid container rowSpacing={8}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Logo
              sx={{
                width: { xs: 200, md: 400 },
                height: { xs: 200, md: 400 },
                borderRadius: { xs: 4, md: 8 },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack>
              <Typography variant="h5" color="grey.500">
                어렵고 복잡한 인쇄, 이젠
              </Typography>
              <Typography
                component={m.h1}
                fontSize={72}
                fontWeight="bold"
                fontFamily="Godo, sans-serif"
                sx={{ letterSpacing: 3, userSelect: 'none', mb: { xs: 5, md: 10 } }}
              >
                {TEXT.split('').map((letter, index) => (
                  <m.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isActive ? { opacity: 1 } : {}}
                    transition={{ duration: 2, delay: 1 + index * 0.5 }}
                  >
                    {letter}
                  </m.span>
                ))}
              </Typography>
              <Box
                component={m.div}
                initial={{ opacity: 0, y: 50 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 3.5, type: 'spring', bounce: 0.5 }}
              >
                <Button
                  onClick={onClickAppStore}
                  component={m.button}
                  whileTap="tap"
                  whileHover="hover"
                  variants={varHover()}
                  color="primary"
                  variant="contained"
                  sx={{
                    p: '16px 20px',
                    gap: 2,
                    borderRadius: 1.5,
                  }}
                >
                  <Iconify icon="mdi:apple" width={32} />
                  <Typography variant="h4">App Store</Typography>
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <SectionUpButton isActive={isActive} fullpage={fullpage} />
    </Stack>
  );
}
