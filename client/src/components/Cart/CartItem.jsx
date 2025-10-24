import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiCloseCircleOutline } from '@mdi/js';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../store/cartSlice';
import styles from './Cart.module.scss';
import CONSTANTS from '../../constants';

const CartItem = (props) => {
    const dispatch = useDispatch();
    const { item } = props;
    const handleDecrement = () => {
        dispatch(decrementQuantity(item._id));
    };
    const handleIncrement = () => {
        dispatch(incrementQuantity(item._id));
    };
    const handleDelete = () => {
        dispatch(removeFromCart(item._id));
    };
    return (
        <li className={styles['cart-item']}>
            <div className={styles['product-title']}>
                <img src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${item?.images[0]}`} alt={item.title} />
                <p>{item.title}</p>
            </div>
            <p>${item.price.toFixed(2)}</p>
            <div className={styles['quantity-btns']}>
                <button onClick={handleDecrement}>-</button>
                <p>{item.quantity}</p>
                <button onClick={handleIncrement}>+</button>
            </div>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
            <Icon size={1} path={mdiCloseCircleOutline} onClick={handleDelete} />
        </li>
    );
};

export default CartItem;