import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { getOneProductByIdThunk } from '../store/productsSlice';
import Product from '../components/Product/Product';
import Spinner from '../components/Spinner/Spinner';
import styles from './pages.module.scss';

const ProductPage = () => {
    const dispatch = useDispatch();
    const { idProduct } = useParams();
    const { selectedProduct, error, isLoading } = useSelector((state) => state.products);
    useEffect(() => {
        if (idProduct) {
           dispatch(getOneProductByIdThunk(idProduct)); 
        }
    }, [dispatch, idProduct]);
    if (!selectedProduct) {
        return <h2>Error 404: Product not found</h2>
    };
    return (
        <section className={styles['page-padding']}>
            <h2>Product page</h2>
            {error && <p>{error}</p>}
            {isLoading ? <Spinner /> : <Product product={selectedProduct} />}
        </section>
    );
};

export default ProductPage;