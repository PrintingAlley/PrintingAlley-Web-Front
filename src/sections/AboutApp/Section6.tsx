import { useEffect, useState } from 'react';
import { Item } from '@fullpage/react-fullpage';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Logo from 'src/components/logo';
import { varHover } from 'src/components/animate';
import Iconify from 'src/components/iconify';

const TEXT = '인쇄골목';

export default function Section6({ destination }: { destination: Item | null }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (destination && destination.index === 5) {
      setIsActive(true);
    }
  }, [destination]);

  const onClickAppStore = () => {
    // window.open('https://apps.apple.com/kr/app/%EC%9D%B8%EC%87%84%EA%B3%A8%EB%AA%A9/id1584964144');
    alert('11월 말 출시 예정!');
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        color: 'grey.800',
        backgroundColor: 'grey.50',
        overflow: 'hidden',
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
                    transition={{ duration: 2, delay: index * 0.1 }}
                  >
                    {letter}
                  </m.span>
                ))}
              </Typography>
              <Box
                component={m.div}
                initial={{ opacity: 0, y: 50 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1, type: 'spring', bounce: 0.5 }}
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
    </Stack>
  );
}
