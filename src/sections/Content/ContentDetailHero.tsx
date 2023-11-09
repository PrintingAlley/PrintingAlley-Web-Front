import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { fDateTime } from 'src/utils/format-time';
import { ContentInterface } from 'src/types/response.dto';

// ----------------------------------------------------------------------

export default function ContentDetailHero({
  content,
  isWebView = false,
}: {
  content: ContentInterface;
  isWebView?: boolean;
}) {
  const { title, thumbnail, createdAt } = content;
  const theme = useTheme();

  return (
    <Box sx={{ height: isWebView ? 360 : { xs: 304, sm: 296 } }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 360,
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
          <Typography
            variant="h3"
            component="h1"
            sx={{
              zIndex: 9,
              color: 'common.white',
              pt: isWebView ? { xs: 2, md: 8 } : 10,
            }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Stack sx={{ pb: { xs: 2, md: 8 } }}>
            <ListItemText
              sx={{ color: 'common.white' }}
              primary={fDateTime(createdAt)}
              primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
              secondaryTypographyProps={{
                color: 'inherit',
                sx: { opacity: 0.64 },
              }}
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
