import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSaleProductsThunk } from '../store/productsSlice';
import ProductsList from '../components/ProductsList/ProductsList';
import Spinner from '../components/Spinner/Spinner';
import styles from './pages.module.scss'

const SalePage = () => {
    const dispatch = useDispatch();
    const { products, error, isLoading } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getSaleProductsThunk());
    }, [dispatch]);
    return (
        <div className={styles['page-padding']}>
            <h2>Products on sale</h2>
            {error && <p>{error}</p>}
            {isLoading ? <Spinner /> : !products && <p>No products on sale at the moment</p>}
            <ProductsList products={products} />
        </div>
    );
};

export default SalePage;