import {
  Button,
  Container,
  Dialog,
  FormHelperText,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AnimatePresence, m } from 'framer-motion';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';
import { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { CLIENT_URL } from 'src/config-global';
import { uploadFileAndGetUrl } from 'src/utils/upload';

export default function PhotoBooth() {
  const paperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(4);
  const [message, setMessage] = useState<string>('');
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const qrUrl = `${CLIENT_URL}/photo?url=${uploadUrl}`;
  const isError = message.length > 30;

  const startCountdown = useCallback(() => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(interval);
          return 4;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  }, []);

  const captureFull = useCallback(() => {
    if (countdown === 0 && paperRef.current) {
      playSound();
      setLoading(true);
      setUploadUrl(null);
      html2canvas(paperRef.current, { scale: 4 }).then(async (canvas) => {
        const base64Image = canvas.toDataURL('image/jpeg');
        setImgSrc(base64Image);

        const blob = await (await fetch(base64Image)).blob();

        const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });

        const url = await uploadFileAndGetUrl(file);
        setUploadUrl(url);
        setMessage('');
        setLoading(false);
      });
    }
  }, [countdown, paperRef]);

  useEffect(() => {
    if (countdown === 0) {
      captureFull();
    }
  }, [countdown, captureFull]);

  const [fullscreen, setFullscreen] = useState(false);

  const onToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const playSound = () => {
    const audio = new Audio('/assets/sounds/camera-shutter-click.mp3');
    audio.play();
  };

  return (
    <Dialog open fullScreen>
      {imgSrc && (
        <Stack
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 200,
            zIndex: 1,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {loading && (
            <Typography
              variant="h3"
              fontFamily="Moirai One, sans-serif"
              sx={{ position: 'absolute', top: 0, right: 0 }}
            >
              업로드 중...
            </Typography>
          )}
          <AnimatePresence>
            {uploadUrl && (
              <Stack
                key="qr"
                alignItems="center"
                spacing={2}
                component={m.div}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Image src={uploadUrl} alt="Captured" sx={{ minHeight: 272, borderRadius: 1 }} />
                <Stack>
                  <QRCode value={qrUrl} />
                  <FormHelperText
                    sx={{
                      textAlign: 'center',
                      whiteSpace: 'pre-line',
                      wordBreak: 'break-all',
                    }}
                  >
                    QR 코드를 스캔해서{'\n'}사진을 저장하세요!
                  </FormHelperText>
                </Stack>
                <Button onClick={() => setUploadUrl(null)} variant="soft">
                  지우기
                </Button>
              </Stack>
            )}
          </AnimatePresence>
        </Stack>
      )}
      <Stack sx={{ position: 'absolute', bottom: 16, right: 16, flexDirection: 'row', gap: 0.5 }}>
        <IconButton onClick={onToggleFullScreen}>
          <Iconify
            icon={fullscreen ? 'icon-park-outline:off-screen' : 'icon-park-outline:full-screen'}
          />
        </IconButton>
      </Stack>
      <Container
        maxWidth="sm"
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          component={Paper}
          ref={paperRef}
          variant="outlined"
          justifyContent="center"
          alignItems="center"
          width={1}
          height={750}
          p={3}
          spacing={3}
        >
          <Typography variant="h1" fontFamily="Moirai One, sans-serif">
            정다운 남매들
          </Typography>

          <Webcam width="100%" screenshotFormat="image/jpeg" style={{ borderRadius: 8 }} />

          <Stack width={1} justifyContent="center" alignItems="center" flexGrow={1}>
            {countdown === 4 ? (
              <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                label="응원의 한마디"
                placeholder="정다운 남매들 화이팅!"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                error={isError}
                helperText={isError && '30자 이내로 입력해주세요.'}
              />
            ) : (
              <Typography
                variant="h2"
                fontFamily="Moirai One, sans-serif"
                textAlign="center"
                sx={{ whiteSpace: 'pre-line' }}
              >
                {message || '정다운 남매들 화이팅!'}
              </Typography>
            )}
          </Stack>

          {countdown > 0 && (
            <Button
              onClick={() => {
                if (countdown === 4) startCountdown();
              }}
              variant="soft"
              sx={{ px: 3, py: 2 }}
            >
              <Typography variant="h2" fontFamily="Moirai One, sans-serif">
                촬영하기
                {countdown < 4 && ` (${countdown}s 남음)`}
              </Typography>
            </Button>
          )}
        </Stack>
      </Container>
    </Dialog>
  );
}
