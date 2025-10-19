import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesThunk } from '../../store/categoriesSlice';
import styles from './Header.module.scss';

const Header = () => {
    const dispatch = useDispatch();
    const { categories, error, isLoading } = useSelector((state) => state.categories);
    useEffect(() => {
        if (categories?.length === 0) {
            dispatch(getAllCategoriesThunk());
        }
    }, [dispatch, categories?.length]);
    const showCategory = (category) => (
        <li key={category._id}>
            <NavLink to={`/categories/${category._id}`}>{category.name}</NavLink>
        </li>
    );
    return (
        <header>
            <nav>
                <ul className={styles.menu}>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>{error?.message}</p>}
                    {categories?.map(showCategory)}
                </ul>
            </nav>
        </header>
    );
}

export default Header;