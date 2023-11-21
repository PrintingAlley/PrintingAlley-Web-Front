import ReactFullpage from '@fullpage/react-fullpage';
import { Box, ButtonBase, IconButton, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { m } from 'framer-motion';

export default function AboutAppPage() {
  return (
    <ReactFullpage
      credits={{ enabled: false, label: '인쇄골목' }}
      scrollingSpeed={1000}
      render={({ state, fullpageApi }) => (
        <ReactFullpage.Wrapper>
          <Box className="section">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                height: '100vh',
                backgroundColor: 'primary.main',
              }}
              spacing={2}
            >
              <Box
                sx={{
                  position: 'absolute',
                  height: '100vh',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component={m.img}
                  src="/assets/about-app/road.svg"
                  initial={{ y: '-1%' }}
                  animate={{ y: '-101%' }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 3 }}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 'calc(50% - 16px)',
                    width: 32,
                    height: '100.5%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <Box
                  component={m.img}
                  src="/assets/about-app/road.svg"
                  initial={{ y: '99%' }}
                  animate={{ y: '-1%' }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 3 }}
                  sx={{
                    top: 0,
                    left: 'calc(50% - 16px)',
                    width: 32,
                    height: '100.5%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>

              <Box
                component={m.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                sx={{ zIndex: 1 }}
              >
                <Typography variant="h4" color="primary.lighter">
                  인쇄로 가는 지름길
                </Typography>
              </Box>
              <Box
                component={m.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                sx={{ zIndex: 1 }}
              >
                <Typography
                  fontSize={80}
                  fontWeight="bold"
                  color="common.white"
                  fontFamily="Godo, sans-serif"
                  mb={5}
                  sx={{ letterSpacing: 3 }}
                >
                  인쇄골목
                </Typography>
              </Box>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
              >
                <ButtonBase
                  sx={{
                    color: 'primary.main',
                    backgroundColor: 'common.white',
                    '&:hover': {
                      backgroundColor: 'common.white',
                    },
                    px: 3,
                    py: 2,
                    gap: 2,
                    borderRadius: 1.5,
                  }}
                >
                  <Iconify icon="mdi:apple" width={32} />
                  <Typography variant="h4">App Store</Typography>
                </ButtonBase>
              </m.div>

              <Box
                component={m.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  mb: 5,
                }}
              >
                <IconButton
                  onClick={() => fullpageApi.moveSectionDown()}
                  component={m.button}
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    repeatType: 'reverse',
                  }}
                >
                  <Iconify icon="ic:round-keyboard-arrow-down" color="common.white" width={64} />
                </IconButton>
              </Box>
            </Stack>
          </Box>
          <Box className="section">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                height: '100vh',
                color: 'grey.800',
                backgroundColor: 'common.white',
              }}
              spacing={2}
            >
              section 2
            </Stack>
          </Box>
          <Box className="section">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                height: '100vh',
                color: 'grey.800',
                backgroundColor: 'common.white',
              }}
              spacing={2}
            >
              section 3
            </Stack>
          </Box>
          <Box className="section">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                height: '100vh',
                color: 'grey.800',
                backgroundColor: 'common.white',
              }}
              spacing={2}
            >
              section 4
            </Stack>
          </Box>
          <Box className="section">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                height: '100vh',
                color: 'grey.800',
                backgroundColor: 'common.white',
              }}
              spacing={2}
            >
              section 5
            </Stack>
          </Box>
        </ReactFullpage.Wrapper>
      )}
    />
  );
}
