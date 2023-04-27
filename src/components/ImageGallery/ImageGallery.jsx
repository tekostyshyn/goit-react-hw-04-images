import ImageGalleryItem from 'components/ImageGalleryItem';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ pics, onClick }) => {
  const galleryRef = useRef();

  useEffect(() => {
    const { height: cardHeight } =
      galleryRef.current.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 4,
      behavior: 'smooth',
    });
  }, [pics]);

  return (
    <ul ref={galleryRef} className="ImageGallery">
      {pics.map(pic => {
        return (
          <ImageGalleryItem
            url={pic.webformatURL}
            key={pic.id}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  pics: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};

export default ImageGallery;
