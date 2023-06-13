import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMemo } from 'react';
import * as API from '@/utils/api';

type Props = {
  html: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
  quillRef: React.MutableRefObject<ReactQuill | null>;
};

type Image = {
  imageUrl: string;
};

const QuillEditor = ({ html, setHtml, quillRef }: Props) => {
  const imageHandler = () => {
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (!input.files) {
        return;
      }
      const imageFile = input.files[0];
      const data = new FormData();
      data.append('image', imageFile);

      const pathPoint = imageFile.name.lastIndexOf('.');
      const filePoint = imageFile.name.substring(
        pathPoint + 1,
        imageFile.name.length
      );
      const fileType = filePoint.toLowerCase();

      // console.log('file', { pathPoint, filePoint, fileType });

      if (
        fileType == 'jpg' ||
        fileType == 'gif' ||
        fileType == 'png' ||
        fileType == 'jpeg' ||
        fileType == 'bmp'
      ) {
        try {
          const response = await API.post<Image>('/posts/image', data);
          console.log('res', response.data.imageUrl);
          const imgUrl = response.data.imageUrl;
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          if (range) {
            editor?.insertEmbed(range.index, 'image', imgUrl);
            editor?.setSelection(range.index + 1, 0, undefined);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('file', fileType);
        return alert('.jpg .gif .png .jpeg .bmp 파일만 업로드할 수 있습니다.');
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['code', 'image'],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'code',
    'image',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      onChange={setHtml}
      modules={modules}
      formats={formats}
      value={html}
      placeholder={'내용을 입력해주세요'}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default QuillEditor;
