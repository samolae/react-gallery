import React, { useState, useEffect, useCallback } from 'react';
import {fetchImages } from '../api/unsplash';
import { useAppContext } from '../context/AppContext';
import debounce from '../utilities/debounce';
import ImageModal from '../components/ImageModal';
import { fetchImageDetails } from '../api/imageDetails';
import { Image } from '../types';

const MainPage: React.FC = () => {
  const { addHistory } = useAppContext();
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  useEffect(() => {
    const loadImages = async () => {
      const results = await fetchImages(query, page);
      if (page === 1) {
        setImages(results);
      } else {
        setImages(prev => [...prev, ...results]);
      }
      if (query) addHistory(query, results);
    };

    loadImages().catch(console.error);
  }, [query, page]);

  const handleSearch = useCallback(debounce((searchTerm: string) => {
    setQuery(searchTerm);
    setPage(1);
  }, 800), []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
      <input
        type="text"
        placeholder="Search for images"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.urls.regular} alt=""  style={{objectFit:"cover", width: '300px', height: '500px', cursor: 'pointer' }}onClick={() => handleImageClick(image)} />
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

export default MainPage;
