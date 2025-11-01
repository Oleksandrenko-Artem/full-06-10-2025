import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiImage } from '@mdi/js';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { addToCart } from '../../store/cartSlice';
import CONSTANTS from '../../constants';
import styles from './Product.module.scss';

const Product = (props) => {
    const { product } = props;
    const { title, category, price, description, stockQty, images } = product;
    const dispatch = useDispatch();
    const imagesGallery = images.map((img) => ({
        original: `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`,
        thumbnail: `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`,
    }));
    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };
    return (
        <article className={styles.product}>
            {images && <div className={styles.images}>
                {images && images.length === 0 ? <Icon size={12} path={mdiImage} /> :
                    <ImageGallery items={imagesGallery} showPlayButton={false} showNav={false} />}
            </div>}
            <div className={styles.info}>
                <h3>{title}</h3>
                <p className={styles.price}>${price.toFixed(2)}</p> 
                <p>Category: <Link to={`/categories/${category?._id}`}>{category?.name}</Link></p>
                <p>Description: {description}</p>
                <p>In stock: {stockQty}</p>
                <button onClick={handleAddToCart}>Add to cart</button>
            </div>
        </article>
    );
};

export default Product;