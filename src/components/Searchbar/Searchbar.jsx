import { useState } from 'react';
import PropTypes from 'prop-types';

const Seachbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <header className="Searchbar">
      <form
        className="SearchForm"
        onSubmit={e => {
          e.preventDefault();
          onSubmit(inputValue);
        }}
      >
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
          }}
        />
      </form>
    </header>
  );
};

Seachbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Seachbar;
