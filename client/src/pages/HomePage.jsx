import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../store/productsSlice';
import ProductsList from '../components/ProductsList/ProductsList';

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, error, isLoading } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch]);
    return (
        <div>
            <h1>Home</h1>
            {error && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
            <ProductsList products={products} />
        </div>
    );
}

export default HomePage;