import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './pages.module.scss';

const AdminPage = () => {
    return (
        <div className={styles['admin']}>
            <h2>Admin panel</h2>
            <ul className={styles['admin-links']}>
                <li><NavLink to="/admin-panel/categories" className={({ isActive }) => (isActive ? styles.active : undefined)}>Categories</NavLink></li>
                <li><NavLink to="/admin-panel/products" className={({ isActive }) => (isActive ? styles.active : undefined)}>Products</NavLink></li>
                <li><NavLink to="/admin-panel/orders" className={({ isActive }) => (isActive ? styles.active : undefined)}>Orders</NavLink></li>
                <li><NavLink to="/admin-panel/stats" className={({ isActive }) => (isActive ? styles.active : undefined)}>Stats</NavLink></li>
            </ul>
            <Outlet />
        </div>
    );
};

export default AdminPage;