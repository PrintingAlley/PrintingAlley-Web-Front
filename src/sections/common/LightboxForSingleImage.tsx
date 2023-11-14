import { SxProps, Theme } from '@mui/material';
import Image from 'src/components/image';
import Lightbox, { useLightBox } from 'src/components/lightbox';

interface Props {
  src?: string;
  sx?: SxProps<Theme>;
}

export default function LightboxForSingleImage({
  src = '/assets/images/placeholder.svg',
  sx,
}: Props) {
  const slide = { src };
  const slides = [slide];
  const lightbox = useLightBox(slides);

  return (
    <>
      <Image
        alt={slide.src}
        src={slide.src}
        onClick={() => lightbox.onOpen(slide.src)}
        sx={{
          cursor: 'zoom-in',
          ...sx,
        }}
      />
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}
