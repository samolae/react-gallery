import { useState, useCallback } from 'react';
import { fetchImageDetails } from '../api/unsplash'; 

export const useImageClickHandler = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = useCallback(async (imageId) => {
    try {
      const updatedImageDetails = await fetchImageDetails(imageId);
      setSelectedImage(updatedImageDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Could not fetch image details', error);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  return { selectedImage, isModalOpen, handleImageClick, closeModal };
};
