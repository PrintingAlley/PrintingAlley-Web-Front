import { useState } from 'react';
import axios from 'src/utils/axios';

const useFilesUpload = (defaultUrls: string[] = []) => {
  const [fileData, setFileData] = useState<File[] | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>(defaultUrls);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      setFileData(fileList);
      const previewUrlList = fileList.map((file) => URL.createObjectURL(file));
      setPreviewUrls(previewUrlList);
    }
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (!fileData) return [];
    const formData = new FormData();
    fileData.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('/upload/multiple', formData);
      return response.data.urls;
    } catch (error) {
      console.error('Error uploading files:', error);
      return [];
    }
  };

  return { handleFileChange, uploadFiles, previewUrls };
};

export default useFilesUpload;
