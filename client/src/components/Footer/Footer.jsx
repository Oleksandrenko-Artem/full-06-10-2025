import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Footer.module.scss';

const Footer = () => {
    const { categories } = useSelector((state) => state.categories);
    const showCategory = (category) => <li key={category._id}>
        <NavLink to={`/categories/${category._id}`} className={({ isActive }) => (isActive ? styles.active : undefined)}>{category.name}</NavLink>
    </li>
    return (
        <footer className={styles.wrapper}>
            <div className={styles.footer}>
                <div className={styles['footer-logo']}>
                    <NavLink to='/'><img src="/logo.svg" alt="logo" /></NavLink>
                    <NavLink to='/'>Ecobazar</NavLink> 
                </div>
                <div className={styles.account}>
                    <p>My account</p>
                    <Link to="/account">My Account</Link>
                    <Link to="/cart">Shopping cart</Link>
                </div>
                <div className={styles.categories}>
                    <p>Categories</p>
                    {
                        categories?.map(showCategory)
                    }
                </div>
            </div>
            <div className={styles['bottom-div']}>
                <p>Ecobazar &copy; 2025</p>
            </div>
        </footer>
    );
};

export default Footer;