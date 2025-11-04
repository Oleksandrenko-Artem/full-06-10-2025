import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk, getProductsAmountThunk } from '../store/productsSlice';
import ProductsList from '../components/ProductsList/ProductsList';
import Pagination from '../components/Pagination/Pagination';
import FilterProduct from '../components/FiltersPanel/FilterProduct';
import Spinner from '../components/Spinner/Spinner';
import CONSTANTS from '../constants';
import styles from './pages.module.scss';

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, totalProducts, error, isLoading } = useSelector((state) => state.products);
    const [page, setPage] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [category, setCategory] = useState('');
    const [inStock, setInStock] = useState(false);
    const [inSale, setInSale] = useState(false);
    const [amount, setAmount] = useState(CONSTANTS.ORDER_AMOUNT[0]);
    useEffect(() => {
        const values = {};
        if (minPrice || maxPrice) {
            if (minPrice) {
                values.minPrice = minPrice;
            }
            if (maxPrice) {
                values.maxPrice = maxPrice;
            }
        }
        if (category) {
            values.category = category;
        }
        if (inStock) {
            values.availability = inStock;
        }
        if (inSale) {
            values.sale = inSale;
        }
        dispatch(getProductsAmountThunk(values));
        dispatch(getAllProductsThunk({ ...values, page, amount }));
    }, [dispatch, page, amount, minPrice, maxPrice, category, inStock, inSale]);
    return (
        <div className={styles['page-padding']}>
            <h2>Home</h2>
            {error && <p>{error}</p>}
            <div className={styles.filter}>
                <FilterProduct setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setCategory={setCategory} setInStock={setInStock} setInSale={setInSale} minPrice={minPrice} maxPrice={maxPrice} category={category} inStock={inStock} inSale={inSale} />
            </div>
            <div className={styles.paginate}>
                <Pagination page={page} setPage={setPage} total={totalProducts} amount={amount} setAmount={setAmount} />
            </div>
            <div className={styles['product-section']}>
                {isLoading ? <Spinner /> : <ProductsList products={products} />}
            </div>
        </div>
    );
};

export default HomePage;