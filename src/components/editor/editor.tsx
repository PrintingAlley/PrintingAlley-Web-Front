import 'src/utils/highlight';

import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';

import { alpha } from '@mui/material/styles';

import { useEffect, useRef } from 'react';
import { uploadFileAndGetUrl } from 'src/utils/upload';
import { EditorProps } from './types';
import { StyledEditor } from './styles';
import Toolbar, { formats } from './toolbar';

// ----------------------------------------------------------------------

Quill.register('modules/imageResize', ImageResize);

export default function Editor({
  id = 'minimal-quill',
  error,
  simple = false,
  helperText,
  sx,
  ...other
}: EditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  useEffect(() => {
    const handleImage = async () => {
      if (quillRef.current) {
        const quillEditor = quillRef.current.getEditor();

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];

          if (!file) {
            return;
          }

          const range = quillEditor.getSelection(true);

          quillEditor.insertEmbed(range.index, 'image', `/assets/images/loading.gif`);

          try {
            const url = await uploadFileAndGetUrl(file);

            quillEditor.deleteText(range.index, 1);
            quillEditor.insertEmbed(range.index, 'image', url);

            quillEditor.setSelection(range.index + 1, 0);
          } catch (e) {
            quillEditor.deleteText(range.index, 1);
            console.error(e);
          }
        };
      }
    };

    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();

      const toolbar = quillEditor.getModule('toolbar');
      toolbar.addHandler('image', handleImage);
    }
  }, []);

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            '& .ql-editor': {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
          ...sx,
        }}
      >
        <Toolbar id={id} simple={simple} />

        <ReactQuill
          ref={quillRef}
          modules={modules}
          formats={formats}
          placeholder="내용을 작성해주세요."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
