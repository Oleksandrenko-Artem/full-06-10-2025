import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiSale, mdiCartArrowDown, mdiImage } from '@mdi/js';
import { addToCart } from '../../store/cartSlice';
import CONSTANTS from '../../constants';
import styles from './ProductsList.module.scss';

const ProductItem = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product } = props;
    const { title, price, stockQty, isSale, images, category } = product;
    const handleAddToCart = (event) => {
        event.stopPropagation();
        dispatch(addToCart(product));
    };
    const navigateProduct = () => {
        navigate(`/products/${product._id}`);
    };
    const handleCategory = (event) => {
        event.stopPropagation();
    };
    return (
        <article className={styles.product} onClick={navigateProduct}>
            {isSale && <Icon size={1.5} path={mdiSale} color='green' />}
            <div className={styles.picture}>
                {images && images.length === 0 ? <Icon size={8} path={mdiImage} /> : <img src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`} alt={title} />}
            </div>
            <h4>{title}</h4>
            {category?.name && <p>Category: <Link to={`/categories/${category?._id}`} onClick={handleCategory}>{category.name}</Link></p>}
            <b>${price.toFixed(2)}</b>
            <div>
                <p>{stockQty !== 0 ? 'In stock' : 'Out of stock'}</p>
                {stockQty !== 0 && <Icon size={1} path={mdiCartArrowDown} onClick={handleAddToCart} className={styles['cart-img']} />}
            </div>
        </article>
    );
};

export default ProductItem;