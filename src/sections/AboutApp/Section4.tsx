import { useEffect, useState } from 'react';
import { Item, fullpageApi } from '@fullpage/react-fullpage';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import SectionDownButton from './SectionDownButton';

export default function Section4({
  destination,
  fullpage,
}: {
  destination: Item | null;
  fullpage: fullpageApi;
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (destination && destination.index === 3) {
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
        <Grid container direction="row-reverse" sx={{ height: 1 }} columnSpacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: { xs: 0.5, md: 1 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Stack sx={{ height: 0.6 }}>
              <Box
                component={m.img}
                src="/assets/about-app/section4-2-iphone.png"
                initial={{ y: -100, opacity: 0 }}
                animate={isActive ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 2 }}
                maxHeight={1}
              />
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              component={m.div}
              initial={{ y: 100, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 2 }}
              sx={{ height: 0.4 }}
            >
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                인쇄사 정보 한 눈에
              </Typography>
              <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
                확인하기
              </Typography>
              <Typography
                variant="subtitle1"
                color="grey.500"
                textAlign="center"
                sx={{ whiteSpace: 'pre-line', mb: { xs: 0, md: 2 } }}
              >
                작업할 때 꼭 알아야 하는{'\n'}인쇄사 정보만 골라서 확인하세요
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
              src="/assets/about-app/section4-1-iphone.png"
              initial={{ y: 100, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : {}}
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
