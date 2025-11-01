import React from 'react';
import { useSelector } from 'react-redux';
import ProductsList from '../components/ProductsList/ProductsList';
import styles from './pages.module.scss';

const SearchResults = () => {
    const { products, error, isLoading } = useSelector((state) => state.products);
    return (
        <div className={styles['page-padding']}>
            <h2>Search results</h2>
            {error && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
            <ProductsList products={products} />
        </div>
    );
};

export default SearchResults;