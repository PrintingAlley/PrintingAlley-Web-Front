import { useState } from 'react';
import axios from 'src/utils/axios';

const useFilesUpload = (initialDefaultUrls: string[] = []) => {
  const [fileData, setFileData] = useState<File[]>([]);
  const [defaultUrls, setDefaultUrls] = useState<string[]>(initialDefaultUrls);
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialDefaultUrls);
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const newFileList = Array.from(files);
      setFileData((prev) => [...prev, ...newFileList]);

      const newPreviewUrls = newFileList.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }

    e.target.value = '';
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

    // defaultUrls 배열을 업데이트합니다.
    if (index < defaultUrls.length) {
      const updatedDefaultUrls = [...defaultUrls];
      updatedDefaultUrls.splice(index, 1);
      setDefaultUrls(updatedDefaultUrls);
    } else {
      // 새로 추가된 파일을 fileData 배열에서 제거합니다.
      const fileDataIndex = index - defaultUrls.length;
      const updatedFileData = [...fileData];
      updatedFileData.splice(fileDataIndex, 1);
      setFileData(updatedFileData);
    }
  };

  return { handleFileChange, uploadFiles, previewUrls, removeFileAtIndex };
};

export default useFilesUpload;
