import { useState, useEffect } from 'react';
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
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedPictures = await API.searchPictures(
          searchQuery,
          pageNumber
        );
        const picturesAmount = fetchedPictures.totalHits;
        const newPictures = fetchedPictures.hits.map(
          ({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          }
        );
        setPictures(pics => {
          return [...pics, ...newPictures];
        });
        setShowButton(pageNumber < Math.ceil(picturesAmount / 12));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, pageNumber]);

  const handleSearch = value => {
    setSearchQuery(value);
    setPageNumber(1);
    setPictures([]);
  };

  const showLargeImg = url => {
    setLargeImgUrl(url);
    setShowModal(true);
  };

  return (
    <>
      <Seachbar onSubmit={handleSearch} />
      {pictures.length > 0 && (
        <ImageGallery
          pics={pictures}
          onClick={showLargeImg}
          pageNumber={pageNumber}
        />
      )}
      {isLoading && <Loader />}
      {error && <h2>{Error}</h2>}
      {showButton === true && (
        <Button
          onClick={() => {
            setPageNumber(prevPage => prevPage + 1);
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
