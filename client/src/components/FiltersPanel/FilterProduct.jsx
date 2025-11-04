import React from 'react';
import { useSelector } from 'react-redux';
import styles from './filter.module.scss';

const FiltersPanel = (props) => {
    const { setMinPrice, setMaxPrice, setCategory, setInStock, setInSale, minPrice, maxPrice, category, inStock, inSale } = props;
    const { categories } = useSelector((state) => state.categories);
    const showCategory = (category) => <option key={category._id} value={category._id}>{category.name}</option>
    const handleChangeMinPrice = (event) => {
        setMinPrice(event.target.value);
    };
    const handleChangeMaxPrice = (event) => {
        setMaxPrice(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    const handleChangeInStock = (event) => {
        setInStock(event.target.checked);
    };
    const handleChangeInSale = (event) => {
        setInSale(event.target.checked);
    };
    return (
        <div className={styles['filter-form']}>
            <div>
                <span>Min price</span>
                <input type="number" value={minPrice} onChange={handleChangeMinPrice} />
            </div>
            <div>
                <span>Max price</span>
                <input type="number" value={maxPrice} onChange={handleChangeMaxPrice} />
            </div>
            <div>
                <span>Category</span>
                <select value={category} onChange={handleChangeCategory}>
                    <option></option>
                    {
                        categories?.map(showCategory)
                    }
                </select>
            </div>
            <div>
                <span>In stock</span>
                <input type="checkbox" value={inStock} onChange={handleChangeInStock} />
            </div>
            <div>
                <span>In sale</span>
                <input type="checkbox" value={inSale} onChange={handleChangeInSale} />
            </div>
        </div>
    );
};

export default FiltersPanel;