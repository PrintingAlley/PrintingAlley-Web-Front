import { useState } from 'react';
import axios from 'src/utils/axios';

const useFilesUpload = (defaultUrls: string[] = []) => {
  const [fileData, setFileData] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(defaultUrls);
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const newFileList = Array.from(files);
      setFileData((prev) => [...prev, ...newFileList]);

      const newPreviewUrls = newFileList.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const uploadFiles = async (): Promise<string[]> => {
    const formData = new FormData();
    fileData.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('/upload/multiple', formData);
      const newUploadedUrls = response.data.urls;

      return [...defaultUrls.filter((url) => !removedUrls.includes(url)), ...newUploadedUrls];
    } catch (error) {
      console.error('Error uploading files:', error);
      return [];
    }
  };

  const removeFileAtIndex = (index: number) => {
    const removedUrl = previewUrls[index];
    setRemovedUrls((prev) => [...prev, removedUrl]);

    const updatedPreviewUrls = [...previewUrls];
    updatedPreviewUrls.splice(index, 1);
    setPreviewUrls(updatedPreviewUrls);

    if (index >= defaultUrls.length) {
      const fileDataIndex = index - defaultUrls.length;
      const updatedFileData = [...fileData];
      updatedFileData.splice(fileDataIndex, 1);
      setFileData(updatedFileData);
    }
  };

  return { handleFileChange, uploadFiles, previewUrls, removeFileAtIndex };
};

export default useFilesUpload;
