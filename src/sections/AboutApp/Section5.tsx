import { useEffect, useState } from 'react';
import { Item, fullpageApi } from '@fullpage/react-fullpage';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import SectionDownButton from './SectionDownButton';

export default function Section5({
  destination,
  fullpage,
}: {
  destination: Item | null;
  fullpage: fullpageApi;
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (destination && destination.index === 4) {
      setIsActive(true);
    }
  }, [destination]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        color: 'grey.800',
        backgroundColor: 'common.white',
        overflow: 'hidden',
      }}
    >
      <Container sx={{ height: 1 }}>
        <Grid container sx={{ height: 1 }} columnSpacing={3} rowSpacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: { xs: 0.6, md: 1 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              component={m.div}
              initial={{ x: -100, opacity: 0 }}
              animate={isActive ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 2 }}
              sx={{ height: 0.4 }}
            >
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                어렵고 낯선 인쇄용어
              </Typography>
              <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
                이해하기
              </Typography>
              <Typography
                variant="subtitle1"
                color="grey.500"
                textAlign="center"
                sx={{ whiteSpace: 'pre-line' }}
              >
                복잡하고 낯선 인쇄용어와 과정을{'\n'}쉽게 이해해보세요
              </Typography>
            </Stack>
            <Stack sx={{ height: 0.6 }}>
              <Box
                component={m.img}
                src="/assets/about-app/section5-1-iphone.png"
                initial={{ x: -100, opacity: 0 }}
                animate={isActive ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 2 }}
                maxHeight={1}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: { xs: 0.4, md: 1 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component={m.img}
              src="/assets/about-app/section5-2-iphone.png"
              initial={{ x: 100, opacity: 0 }}
              animate={isActive ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 2 }}
              maxHeight={1}
            />
          </Grid>
        </Grid>
      </Container>

      <SectionDownButton isActive={isActive} fullpage={fullpage} />
    </Stack>
  );
}
