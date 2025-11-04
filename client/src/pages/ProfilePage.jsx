import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountThunk } from '../store/authSlice';
import { getAccountOrdersThunk } from '../store/ordersSlice';
import OrdersList from '../components/OrdersList/OrdersList';
import OrdersDetails from '../components/OrdersList/OrdersDetails';
import UpdateUserForm from '../components/Auth/UpdateUserForm';
import Spinner from '../components/Spinner/Spinner';
import styles from './pages.module.scss';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [idOrder, setIdOrder] = useState('');
    const { user, error } = useSelector((state) => state.auth);
    const { ordersAccount, error: errorOrders, isLoading } = useSelector((state) => state.orders);
    const [isUpdate, setIsUpdate] = useState(false);
    useEffect(() => {
        if (!user) {
            dispatch(getAccountThunk());  
        }
    }, [dispatch, user]);
    useEffect(() => {
        if (ordersAccount?.length === 0) {
            dispatch(getAccountOrdersThunk());
        }
    }, [dispatch, ordersAccount?.length]);
    const handleChange = () => {
        setIsUpdate(true);
    };
    if (error) {
        navigate('/login');
    }
    return (
        <section className={styles['page-padding']}>
            <h2>{user?.name}</h2>
            <article className={styles['personal-info']}>
                {isUpdate ? (
                    <UpdateUserForm setIsUpdate={setIsUpdate} />
                ) : (
                    <div>
                        <p><b>Birthday year:</b> {user?.birthYear}</p>
                        <p><b>Email:</b> {user?.email}</p>
                        <p><b>Role:</b> {user?.role}</p>
                        <button onClick={handleChange}>Change personal info</button>
                    </div>     
                )}
            </article>
            <div>
                {idOrder && <OrdersDetails idOrder={idOrder} />}
            </div>
            <div className={styles['orders-list']}>
                {errorOrders && <p>{errorOrders}</p>}
                {ordersAccount?.length > 0 ? (
                    isLoading ? <Spinner /> : <OrdersList orders={ordersAccount} setIdOrder={setIdOrder} />
                ) : (
                    <p>Empty orders list</p>
                )}
            </div>
        </section>
    );
};

export default ProfilePage;