import React from 'react';
import ProductItem from './ProductItem';
import styles from './ProductsList.module.scss';

const ProductsList = (props) => {
    const { products } = props;
    const showProduct = (product) => <ProductItem key={product._id} product={product} />;
    return (
        <section className={styles.products}>
            {products && products.length === 0 && <p>Products not found</p>}
            {products.map(showProduct)}
        </section>
    );
}

export default ProductsList;