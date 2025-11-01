import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiMagnify, mdiPurseOutline } from '@mdi/js';
import { getAllCategoriesThunk } from '../../store/categoriesSlice';
import { searchProductsThunk } from '../../store/productsSlice';
import { logoutUserThunk } from '../../store/authSlice';
import { resetOrders } from '../../store/ordersSlice';
import styles from './Header.module.scss';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.categories);
    const { items } = useSelector((state) => state.cart);
    const total = items?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const [value, setValue] = useState('');
    useEffect(() => {
        if (categories?.length === 0) {
            dispatch(getAllCategoriesThunk());
        }
    }, [dispatch, categories?.length]);
    const showCategory = (category) => (
        <li key={category._id}>
            <NavLink to={`/categories/${category._id}`} className={({ isActive }) => (isActive ? styles.active : undefined)}>{category.name}</NavLink>
        </li>
    );
    const logout = () => {
        dispatch(resetOrders());
        dispatch(logoutUserThunk());
    };
    const search = () => {
        dispatch(searchProductsThunk(value));
        navigate('/products/search');
    }
    return (
        <header>
            <div className={styles['header-div']}>
                <div className={styles.sign}>
                    {user ? (
                        <>
                            <Link to="/account">Hi, {user?.name}</Link>
                            {user?.role === 'admin' && '|'}
                            {user?.role === 'admin' && <Link to="/admin-panel">Admin panel</Link>}
                            <span>|</span>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                            <>
                                <Link to="/login">Sign in</Link> / {' '}
                                <Link to="/register">Sign up</Link>
                            </>
                    )} 
                </div>
            </div>
            <div className={styles['header-nav']}>
                <div className={styles['logo-border']}>
                    <div className={styles.logo}>
                        <div className={styles['logo-link']}>
                            <NavLink to='/'><img src="/logo.svg" alt="logo" /></NavLink>
                            <NavLink to='/'>Ecobazar</NavLink> 
                        </div>
                        <div className={styles.search}>
                            <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Search" />
                            <div>
                                <Icon size={1.4} path={mdiMagnify} onClick={search} />
                            </div>
                        </div>
                        <div className={styles['cart-link']}>
                            {items?.length !== 0 && <NavLink to='/cart'><span className={styles['items-length']}>{items?.length}</span></NavLink>}
                            <NavLink to='/cart'><Icon size={1.8} path={mdiPurseOutline} /></NavLink>
                            <NavLink to='/cart'>
                                <div>
                                    <span>Shopping cart</span>
                                    <p>${total.toFixed(2)}</p> 
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className={styles['nav-border']}>
                   <nav>
                        <ul className={styles.menu}>
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/products/sale" className={({ isActive }) => (isActive ? styles.active : undefined)}>Sale</NavLink>
                            </li>
                            {categories?.map(showCategory)}
                        </ul>
                    </nav> 
                </div>
            </div>
        </header>
    );
};

export default Header;