import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import CartItem from './CartItem';
import CartDelivery from './CartDelivery';
import styles from './Cart.module.scss';

const Cart = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);
    const { error } = useSelector((state) => state.orders);
    const total = items?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const showItem = (item) => <CartItem key={item._id} item={item} total={total} />
    const handleClear = () => {
        dispatch(clearCart());
    };
    return (
        <section className={styles.wrapper}>
            {error && <h3>{error}</h3>}
            <div className={styles.cart}>
                <div className={styles['products-cart']}>
                    {items?.length === 0 && <p>Empty cart</p>}
                    <ul>
                        <li>
                            <div className={styles['cart-header']}>
                                <p>Product</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                                <p>Total</p>
                            </div>  
                        </li>
                        {
                            items?.map(showItem)
                        }
                    </ul>
                    <div className={styles['cart-btn']}>
                        <span>{items?.length > 0 && <NavLink to="/">Return to shop</NavLink>}</span>
                        <span>{items?.length > 0 && <button onClick={handleClear}>Clear cart</button>}</span>
                    </div>
                </div>
            </div>
            {items.length > 0 && <CartDelivery items={items} />}
        </section>
    );
};

export default Cart;