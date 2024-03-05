import { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImagesWithQuery } from 'services/api';

import {
  Searchbar,
  ImageGallery,
  Button,
  Modal,
  Loader,
  Notification,
} from 'components';

import { AppContainer } from './App.styled';

const App = () => {
  const [searchQuery, setsearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseData = await fetchImagesWithQuery(searchQuery, 1);
        setData(responseData.hits);
        setTotalHits(responseData.totalHits);
        setLoading(false);
        setIsSearch(true);
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
  
  const handleFormSubmit = searchQuery => {
    setsearchQuery(searchQuery);
  };

  const handleLoadMore = () => {
    setPage(prevPage => (prevPage + 1));
  };

  const handleModalClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <AppContainer>
        <Searchbar onSubmit={handleFormSubmit} />
        {data.length >0 && <ImageGallery data={data} modalClick={handleModalClick} />}
        {isSearch && totalHits === 0 && !loading && <Notification message="No results were found for your request. Enter another images or photo name."/> }
        {loading && <Loader />}
        {data.length > 0 && page < totalHits / 12 && <Button handleLoadMore={handleLoadMore} />}
        {showModal &&
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt='' />
          </Modal>
        }
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
  )
}

export default App;
