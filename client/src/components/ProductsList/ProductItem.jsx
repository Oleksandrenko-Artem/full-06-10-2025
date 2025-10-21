import React from 'react';
import Icon from '@mdi/react';
import { mdiSale } from '@mdi/js';
import CONSTANTS from '../../constants';
import styles from './ProductsList.module.scss';

const ProductItem = (props) => {
    const { product: { title, price, stockQty, isSale, images, category } } = props;
    return (
        <article className={styles.product}>
            {isSale && <Icon size={1} path={mdiSale} />}
            <div className={styles.picture}>
                <img src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`} alt={title} />
            </div>
            <p>{title}</p>
            <p>Category: {category?.name}</p>
            <h4>${price}</h4>
            <p>{stockQty >= 0 ? 'In stock' : 'Out of stock'}</p>
        </article>
    );
}

export default ProductItem;