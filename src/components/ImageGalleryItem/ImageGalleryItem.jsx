import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, onClick }) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        onClick(url);
      }}
    >
      <img className="ImageGalleryItem-image" src={url} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
