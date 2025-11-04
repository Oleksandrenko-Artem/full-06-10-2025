import React from 'react';
import OrdersRow from './OrdersRow';
import styles from './OrdersList.module.scss';

const OrdersList = (props) => {
    const { orders, setIdOrder } = props;
    const showOrderRow = (order) => <OrdersRow key={order._id} order={order} setIdOrder={setIdOrder} />
    return (
        <table className={styles['order-table']}>
            <thead>
                <tr>
                    <th>order id</th>
                    <th>data</th>
                    <th>total</th>
                    <th>status</th>
                    <th></th> 
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(showOrderRow)
                }
            </tbody>
        </table>
    );
};

export default OrdersList;