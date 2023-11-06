import axios from './axios';

export const uploadFileAndGetUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post('/upload', formData);
    return response.data.url as string;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const uploadFilesAndGetUrls = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  try {
    const response = await axios.post('/upload/multiple', formData);
    return response.data.urls as string[];
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};
