import React from 'react';
import Cart from '../components/Cart/Cart';
import styles from './pages.module.scss';

const CartPage = () => {
    return (
        <div className={styles['page-padding']}>
            <h2>My shopping cart</h2>
            <Cart />
        </div>
    );
};

export default CartPage;