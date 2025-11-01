import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersAmountThunk, getOrdersForAdminThunk } from '../../store/ordersSlice';
import AdminOrdersRow from './AdminOrdersRow';
import Pagination from '../Pagination/Pagination';
import CONSTANTS from '../../constants';
import styles from './Admin.module.scss';

const AdminOrders = () => {
    const dispatch = useDispatch();
    const { orders, totalOrders } = useSelector((state) => state.orders);
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState(CONSTANTS.ORDER_AMOUNT[0]);
    useEffect(() => {
        dispatch(getOrdersAmountThunk());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getOrdersForAdminThunk({ page, amount }));
    }, [dispatch, page, amount]);
    const showOrder = (order) => <AdminOrdersRow key={order._id} order={order} />
    return (
        <section className={styles['admin-table']}>
            <div className={styles['order-nav']}>
                <h2>Orders total: {totalOrders}</h2>
                <Pagination page={page} setPage={setPage} total={totalOrders} amount={amount} setAmount={setAmount} />
            </div>
            <table className={styles['table-orders']}>
                {orders.length === 0 ? (
                    <thead>
                        <tr>
                            <th>Orders not found</th>
                        </tr>
                    </thead>
                ) : (
                        <thead>
                    <tr>
                        <th rowSpan={2}>user name</th>
                        <th rowSpan={2}>user email</th>
                        <th colSpan={4}>shipping</th>
                        <th>products</th>
                        <th rowSpan={2}>total</th>
                        <th rowSpan={2}>status</th>
                        <th rowSpan={2}>update</th>
                    </tr>
                    <tr>
                        <th>phone</th>
                        <th>method</th>
                        <th>address</th>
                        <th>price</th>
                        <th>
                            <table className={styles['product-table']}>
                                <thead>
                                    <tr>
                                        <th>title</th>
                                        <th>price</th>
                                        <th>quantity</th>
                                    </tr>
                                </thead>
                            </table>
                        </th>
                    </tr>
                </thead>
                )}
                <tbody>
                    {
                        orders?.map(showOrder)
                    }
                </tbody>
            </table>
        </section>
    );
};

export default AdminOrders;