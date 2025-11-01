import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loadStripe } from '@stripe/stripe-js';
import { orderDeliverySchema } from '../../validation/order.validate';
import { createOrderThunk } from '../../store/ordersSlice';
import { clearCart } from '../../store/cartSlice';
import CONSTANTS from '../../constants';
import styles from './Cart.module.scss';
import { createCheckoutSession } from '../../api';

const stripePromise = loadStripe(CONSTANTS.STRIPE_SECRET_KEY);

const CartDelivery = (props) => {
    const { items } = props;
    const dispatch = useDispatch();
    const onSubmit = async (values) => {
        try {
            const stripe = await stripePromise;
            const orderValues = {
                products: items.map((item) => ({
                    productId: item._id,
                    quantity: item.quantity
                })),
            // shippingPhone: values.shippingPhone,
            // shippingMethod: values.shippingMethod,
            // shippingAddress: values.shippingAddress,
            ...values,
            shippingPrice: CONSTANTS.SHIPPING_PRICE[values.shippingMethod],
            };
            console.log(orderValues);
            const order = await dispatch(createOrderThunk(orderValues)).unwrap();
            const stripeProducts = items.map((item) => ({
                title: item.title,
                productPrice: item.price,
                quantity: item.quantity,
            }));
            const response = await createCheckoutSession(order._id, stripeProducts);
            await stripe.redirectToCheckout({ sessionId: response.data.id });
            dispatch(clearCart());
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Formik initialValues={{ shippingPhone: '', shippingMethod: CONSTANTS.SHIPPING_METHOD[0], shippingAddress: '' }} validationSchema={orderDeliverySchema} onSubmit={onSubmit}>
            {() => {
                return <Form className={styles['cart-form']}>
                    <label>
                        <span>Phone</span>
                        <Field name="shippingPhone" type="tel" placeholder="Phone" />
                        <ErrorMessage name="shippingPhone" />
                    </label>
                    <label>
                        <span>Method</span>
                        <Field name="shippingMethod" as="select" >
                            {CONSTANTS.SHIPPING_METHOD.map((method) => <option key={method} value={method}>{method}</option>)}
                        </Field>
                        <ErrorMessage name="shippingMethod" />
                    </label>
                    <label>
                        <span>Address</span>
                        <Field name="shippingAddress" type="text" placeholder="Address" />
                        <ErrorMessage name="shippingAddress" />
                    </label>
                    <button type='submit'>Create order and payment</button>
                </Form>
            }}
        </Formik>
    );
};

export default CartDelivery;