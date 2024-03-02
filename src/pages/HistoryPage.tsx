import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Image } from '../types';
import ImageModal from '../components/ImageModal';
import { fetchImageDetails } from '../api/imageDetails';


const HistoryPage: React.FC = () => {
  const { history, getResultsFromCache } = useAppContext();
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [currentTerm, setCurrentTerm] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  

  useEffect(() => {
    const loadImagesForTerm = () => {
      const cachedImages = getResultsFromCache(currentTerm);
      if (cachedImages) {
        const imagesToShow = cachedImages.slice(0, displayCount);
        setSelectedImages(imagesToShow);
      }
    };

    if (currentTerm) {
      loadImagesForTerm();
    }
  }, [currentTerm, displayCount, getResultsFromCache]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        const allImagesForTerm = getResultsFromCache(currentTerm);
        if (allImagesForTerm && displayCount < allImagesForTerm.length) {
          setDisplayCount(prevCount => prevCount + 20);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTerm, displayCount, getResultsFromCache]);

  const handleImageClick = async (image: Image) => {
    try {
      const updatedImageDetails = await fetchImageDetails(image.id);
      setSelectedImage(updatedImageDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Could not fetch updated image details.', error);
    }
  };

  return (
    <div>
      <h2>Search History</h2>
      <ul style={{ display: 'flex', gap: "8px", flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
        {history.map((term, index) => (
          <li  key={index} onClick={() => {
            setCurrentTerm(term);
            setDisplayCount(20);
          }} style={{ backgroundColor: "orangered", padding: "4px 8px", borderRadius:"6px", color:"white", cursor: 'pointer' }}>
            {term}
          </li>
        ))}
      </ul>
      <div>
        {selectedImages.map((image, index) => (
          <img key={index} src={image.urls.small} alt="" style={{objectFit:"contain", width: '300px', height: '500px', cursor: 'pointer' }} onClick={() => handleImageClick(image)} />
        ))}
      </div>
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default HistoryPage;
