import { useEffect, useState } from 'react';
import { Item, fullpageApi } from '@fullpage/react-fullpage';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import SectionDownButton from './SectionDownButton';

export default function Section3({
  destination,
  fullpage,
}: {
  destination: Item | null;
  fullpage: fullpageApi;
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (destination && destination.index === 2) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [destination]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Container sx={{ height: 1, maxHeight: 960 }}>
        <Grid container sx={{ height: 1 }}>
          <Grid
            item
            xs={12}
            sx={{
              height: 0.4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack
              alignItems="center"
              component={m.div}
              initial={{ y: -100, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                종이부터 후가공까지
              </Typography>
              <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
                살펴보기
              </Typography>
              <Typography
                variant="subtitle1"
                color="grey.500"
                textAlign="center"
                sx={{ whiteSpace: 'pre-line' }}
              >
                인쇄물에 대한 상세한 정보를{'\n'}한눈에 확인하세요
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              height: 0.6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Box
              component={m.img}
              src="/assets/about-app/section3-iphone.png"
              initial={{ y: 100, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
              sx={{ display: { xs: 'none', md: 'block' } }}
            />
            <Box
              component={m.img}
              src="/assets/about-app/section3-iphone-mobile.png"
              initial={{ y: 100, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            />
          </Grid>
        </Grid>
      </Container>

      <SectionDownButton isActive={isActive} fullpage={fullpage} />
    </Stack>
  );
}
