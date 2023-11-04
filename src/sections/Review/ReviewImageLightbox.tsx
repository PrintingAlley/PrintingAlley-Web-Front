import { Avatar, Box } from '@mui/material';
import { useEffect } from 'react';
import { useCarousel } from 'src/components/carousel';
import Lightbox, { useLightBox } from 'src/components/lightbox';

const THUMB_SIZE = 64;

interface Props {
  images: string[];
}

export default function ReviewImageLightbox({ images }: Props) {
  const slides = images.map((img) => ({
    src: img,
  }));

  const lightbox = useLightBox(slides);

  const carouselLarge = useCarousel({
    rtl: false,
    draggable: false,
    adaptiveHeight: true,
  });

  const carouselThumb = useCarousel({
    rtl: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: slides.length > 3 ? 3 : slides.length,
  });

  useEffect(() => {
    carouselLarge.onSetNav();
    carouselThumb.onSetNav();
  }, [carouselLarge, carouselThumb]);

  useEffect(() => {
    if (lightbox.open) {
      carouselLarge.onTogo(lightbox.selected);
    }
  }, [carouselLarge, lightbox.open, lightbox.selected]);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {slides.map((item) => (
          <Avatar
            key={item.src}
            alt={item.src}
            src={item.src}
            variant="rounded"
            sx={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              cursor: 'zoom-in',
            }}
            onClick={() => lightbox.onOpen(item.src)}
          />
        ))}
      </Box>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </>
  );
}
