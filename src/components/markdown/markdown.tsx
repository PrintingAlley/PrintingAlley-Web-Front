import 'src/utils/highlight';

// markdown plugins
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';

import Image from '../image';
import StyledMarkdown from './styles';
import { MarkdownProps } from './types';

// ----------------------------------------------------------------------

export default function Markdown({ sx, ...other }: MarkdownProps) {
  return (
    <StyledMarkdown sx={sx}>
      <ReactMarkdown
        className="ql-editor"
        rehypePlugins={[rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]]}
        components={components}
        {...other}
      />
    </StyledMarkdown>
  );
}

// ----------------------------------------------------------------------

const components = {
  img: ({ ...props }) => <Image alt={props.alt} sx={{ borderRadius: 2 }} {...props} />,
  a: ({ ...props }) => {
    const isHttp = props.href.includes('http');

    return isHttp ? (
      <Link target="_blank" rel="noopener" {...props} />
    ) : (
      <Link component={RouterLink} to={props.href} {...props}>
        {props.children}
      </Link>
    );
  },
};
