import React from 'react';
import { Link } from 'react-router-dom';
import styles from './pages.module.scss';

const CancelPage = () => {
    return (
        <section className={styles['page-padding']}>
            <h2>Payment canceled</h2>
            <Link to="/" className={styles['link-shop']}>Return to shop</Link>
        </section>
    );
};

export default CancelPage;