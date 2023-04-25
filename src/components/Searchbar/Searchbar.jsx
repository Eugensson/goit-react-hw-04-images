import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { GoSearch } from 'react-icons/go';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

const Searchbar = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = e => {
    setSearchQuery(e.currentTarget.value.trim().toLowerCase());
  };

  const resetForm = () => {
    setSearchQuery('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') {
      toast.info('The input field must not be empty!', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    props.onSubmit(searchQuery);
    resetForm();
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>
            <GoSearch />
          </SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          value={searchQuery}
          onChange={handleNameChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarContainer>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
