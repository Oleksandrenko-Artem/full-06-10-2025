import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../store/productsSlice';
import ProductsList from '../components/ProductsList/ProductsList';
import styles from './pages.module.scss';

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, error, isLoading } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch]);
    return (
        <div className={styles['page-padding']}>
            <h2>Home</h2>
            {error && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
            <ProductsList products={products} />
        </div>
    );
};

export default HomePage;