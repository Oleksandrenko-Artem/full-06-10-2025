import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiSale, mdiCartArrowDown } from '@mdi/js';
import { addToCart } from '../../store/cartSlice';
import CONSTANTS from '../../constants';
import styles from './ProductsList.module.scss';

const ProductItem = (props) => {
    const dispatch = useDispatch();
    const { product } = props;
    const { title, price, stockQty, isSale, images, category } = product;
    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };
    return (
        <article className={styles.product}>
            {isSale && <Icon size={1.5} path={mdiSale} color='green' />}
            <div className={styles.picture}>
                <img src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`} alt={title} />
            </div>
            <p>{title}</p>
            <p>Category: {category?.name}</p>
            <h4>${price.toFixed(2)}</h4>
            <div>
                <p>{stockQty >= 0 ? 'In stock' : 'Out of stock'}</p>
                <Icon size={1} path={mdiCartArrowDown} onClick={handleAddToCart} className={styles['cart-img']} />
            </div>
        </article>
    );
}

export default ProductItem;