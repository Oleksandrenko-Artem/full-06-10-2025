import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { getOneOrderByIdThunk } from '../../store/ordersSlice';
import { createCheckoutSession } from '../../api';
import CONSTANTS from '../../constants';
import styles from './OrdersList.module.scss';

const stripePromise = loadStripe(CONSTANTS.STRIPE_SECRET_KEY);

const OrdersDetails = (props) => {
    const { idOrder } = props;
    const dispatch = useDispatch();
    const { selectedOrder } = useSelector((state) => state.orders);
    useEffect(() => {
        dispatch(getOneOrderByIdThunk(idOrder));
    }, [dispatch, idOrder]);
    const handlePayment = async () => {
        const stripe = await stripePromise;
        const stripeProducts = selectedOrder?.products?.map((product) => ({
            title: product?.productId?.title,
            productPrice: product?.productPrice,
            quantity: product?.quantity,
        }));
        const response = await createCheckoutSession(selectedOrder?._id, stripeProducts);
        await stripe.redirectToCheckout({ sessionId: response.data.id });
    }
    return (
        <div>
            <div className={styles['order-info']}>
                <h3>Order: {selectedOrder?._id.slice(-4)}: {selectedOrder?.createdAt.slice(0, 10)} - {selectedOrder?.products?.length} items</h3>
                <p>{selectedOrder?.status === 'new' ? (
                    <button onClick={handlePayment}>Payment</button>
                ) : (
                    <span>Status: {selectedOrder?.status}</span>
                )}</p>
                <div>
                    <h4>Shipping</h4>
                    <p>phone: {selectedOrder?.shippingPhone}</p>
                    <p>address: {selectedOrder?.shippingAddress}</p>
                    <p>method: {selectedOrder?.shippingMethod}</p>
                    <p>price: ${selectedOrder?.shippingPrice}</p>
                </div> 
            </div>
            <table className={styles['order-table']}>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>subtotal</th>
                    </tr>
                </thead>
                <tbody className={styles.products}>
                    {
                        selectedOrder?.products?.map((product) => <tr key={product?.productId?._id}>
                            <td>{product?.productId?.title}</td>
                            <td>${product?.productPrice}</td>
                            <td>{product?.quantity}</td>
                            <td>{product?.productPrice * product?.quantity}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OrdersDetails;