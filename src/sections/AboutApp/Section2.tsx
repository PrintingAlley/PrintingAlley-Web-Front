import { useEffect, useState } from 'react';
import { Item, fullpageApi } from '@fullpage/react-fullpage';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import SectionDownButton from './SectionDownButton';

export default function Section2({
  destination,
  fullpage,
}: {
  destination: Item | null;
  fullpage: fullpageApi;
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (destination && destination.index === 1) {
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
        <Grid container direction="row-reverse" sx={{ height: 1 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: { xs: 0.5, md: 1 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack
              alignItems="center"
              component={m.div}
              initial={{ x: 100, opacity: 0 }}
              animate={isActive ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                내가 하고 싶은 바로 그 인쇄
              </Typography>
              <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
                찾아보기
              </Typography>
              <Typography
                variant="subtitle1"
                color="grey.500"
                textAlign="center"
                sx={{ whiteSpace: 'pre-line' }}
              >
                필터를 통해 원하는 인쇄물을{'\n'}빠르고 정확하게 찾아보세요
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: { xs: 0.5, md: 1 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Box
              component={m.img}
              src="/assets/about-app/section2-iphone.png"
              initial={{ y: 100, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </Grid>
        </Grid>
      </Container>

      <SectionDownButton isActive={isActive} fullpage={fullpage} />
    </Stack>
  );
}
