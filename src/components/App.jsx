import { useState, useEffect, useRef } from 'react';
import Seachbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import * as API from 'services/api';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const pictures = useRef([]);
  const error = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setShowButton(false);
      const fetchedPictures = await API.searchPictures(searchQuery, pageNumber);
      const picturesAmount = fetchedPictures.totalHits;
      const newPictures = fetchedPictures.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );
      pictures.current = [...pictures.current, ...newPictures];
      setShowButton(pageNumber < Math.ceil(picturesAmount / 12));
      setLoading(false);
    };

    if (searchQuery) {
      try {
        fetchData();
      } catch (err) {
        error.current = err;
        setLoading(false);
        console.log(error.current);
      } 
    }
  }, [searchQuery, pageNumber]);

  return (
    <>
      <Seachbar
        onSubmit={value => {
          pictures.current = [];
          setSearchQuery(value);
          setPageNumber(1);
        }}
      />
      {pictures.current.length > 0 && (
        <ImageGallery
          pics={pictures.current}
          onClick={url => {
            setLargeImgUrl(url);
            setShowModal(true);
          }}
          pageNumber={pageNumber}
        />
      )}
      {isLoading && <Loader />}
      {pictures.current.length > 0 && showButton === true && (
        <Button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        />
      )}
      {showModal && (
        <Modal
          onClose={() => {
            setLargeImgUrl('');
            setShowModal(false);
          }}
          url={largeImgUrl}
        />
      )}
    </>
  );
};
