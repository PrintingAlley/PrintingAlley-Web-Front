import { Box, BoxProps } from '@mui/material';
import { MotionProps, m } from 'framer-motion';
import { varFade } from 'src/components/animate';

type TitleAnimateProps = BoxProps &
  MotionProps & {
    text: string;
    color?: string;
    fontSize?: number;
  };

export function TitleAnimate({
  text,
  color = 'inherit',
  fontSize = 84,
  variants,
  sx,
  ...other
}: TitleAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        color,
        fontFamily: 'Godo, sans-serif',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp} style={{ fontSize }}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
