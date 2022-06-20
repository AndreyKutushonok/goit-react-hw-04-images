import { useState } from 'react';
import search from '../../search.svg';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (searchQuery.trim() === '') {
            alert('Please, enter search query');
            return;
        }

        onSubmit(searchQuery);
        setSearchQuery('');
    };

    const handleSearchQuery = e => {
        setSearchQuery(e.currentTarget.value.toLowerCase());
    };

    return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={s.SearchFormButton}>
                    <img src={search} alt="search icon" />
                </button>

                <input
                    className={s.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="searchQuery"
                    onChange={handleSearchQuery}
                />
            </form>
        </header>
    );
}

export default Searchbar;
