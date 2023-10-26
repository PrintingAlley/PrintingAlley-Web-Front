import { useState } from 'react';
import axios from 'src/utils/axios';

const useFileUpload = (defaultUrl: string | null = null) => {
  const [fileData, setFileData] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFileData(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!fileData) return null;
    const formData = new FormData();
    formData.append('file', fileData);

    try {
      const response = await axios.post('/upload', formData);
      return response.data.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  return { handleFileChange, uploadFile, previewUrl };
};

export default useFileUpload;
