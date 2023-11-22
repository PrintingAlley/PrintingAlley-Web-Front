import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { fShortDate } from 'src/utils/format-time';
import { ContentInterface } from 'src/types/response.dto';

// ----------------------------------------------------------------------

export default function ContentWebViewHero({ content }: { content: ContentInterface }) {
  const { thumbnail, createdAt } = content;
  const theme = useTheme();

  return (
    <Box sx={{ height: 312 }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 312,
          overflow: 'hidden',
          ...bgGradient({
            imgUrl: thumbnail,
            startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexGrow: 1 }} />

          <Stack sx={{ pb: 2 }}>
            <ListItemText
              sx={{ color: 'common.white' }}
              primary={fShortDate(createdAt)}
              primaryTypographyProps={{ typography: 'subtitle1', textAlign: 'right' }}
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
