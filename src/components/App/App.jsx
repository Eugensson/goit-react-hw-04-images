import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImagesWithQuery } from '../../services/api';
import {
  Searchbar,
  ImageGallery,
  LoadMoreButton,
  Modal,
  Loader,
} from 'components/index';
import { AppContainer } from 'components/App/App.styled';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseData = await fetchImagesWithQuery(searchQuery, 1);
        setData(responseData.hits);
        setTotalHits(responseData.totalHits);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseData = await fetchImagesWithQuery(searchQuery, page);
        setData(prevData => [...prevData, ...responseData.hits]);
        setTotalHits(responseData.totalHits);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (page > 1) {
      fetchData();
    }
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalClick = url => {
    setLargeImageURL(url);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery data={data} modalClick={handleModalClick} />
      {loading && <Loader />}
      {data.length > 0 && page < totalHits / 12 && (
        <LoadMoreButton handleLoadMore={handleLoadMore} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AppContainer>
  );
};

export default App;
