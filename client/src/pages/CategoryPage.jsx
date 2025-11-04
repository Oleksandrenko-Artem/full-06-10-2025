import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneCategoryByIdThunk } from '../store/categoriesSlice';
import ProductsList from '../components/ProductsList/ProductsList';
import Spinner from '../components/Spinner/Spinner';
import styles from './pages.module.scss';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const { idCategory } = useParams();
    const { selectedCategory, error, isLoading } = useSelector((state) => state.categories);
    useEffect(() => {
        if (idCategory) {
            dispatch(getOneCategoryByIdThunk(idCategory));
        }
    }, [dispatch, idCategory]);
    return (
        <section className={styles['page-padding']}>
            <h2>{selectedCategory?.name}</h2>
            {error && <p>{error}</p>}
            {selectedCategory?.products ? (
                isLoading ? <Spinner /> : <ProductsList products={selectedCategory?.products} />
            ) : (
                <p>Products not found</p>
            )}
        </section>
    );
};

export default CategoryPage;