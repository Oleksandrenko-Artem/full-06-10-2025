import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateOrderStatusThunk } from '../store/ordersSlice';
import styles from './pages.module.scss';
import CONSTANTS from '../constants';

const SuccessPage = () => {
    const { idOrder } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateOrderStatusThunk({id: idOrder, status: 'paid'}));
    }, [dispatch, idOrder]);
    return (
        <section className={styles['page-padding']}>
            <h2>Thanks!</h2>
            <Link to="/" className={styles['link-shop']}>Return to shop</Link>
        </section>
    );
};

export default SuccessPage;