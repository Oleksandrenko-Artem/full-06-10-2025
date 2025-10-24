import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './pages.module.scss';

const AdminPage = () => {
    return (
        <div className={styles['page-padding']}>
            <h1>Admin panel</h1>
            <ul>
                <li><Link to="/admin-panel/categories">Categories</Link></li>
                <li><Link to="/admin-panel/products">Products</Link></li>
            </ul>
            <Outlet />
        </div>
    );
};

export default AdminPage;