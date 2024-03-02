import React from 'react';
import { Image } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: Image;
}

const ImageModal: React.FC<Props> = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div style={{ maxWidth: '20%', margin: '40px auto', backgroundColor: '#fff', padding: '20px' }}>
        <img src={image.urls.full} alt="" style={{ width: '100%' }} />
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <p>Downloads: {image.downloads}</p>
          <p>Views: {image.views}</p>
          <p>Likes: {image.likes}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
