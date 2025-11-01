import React from 'react';
import { useSelector } from 'react-redux';

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
        <div>
            <span>Min price</span>
            <input type="number" value={minPrice} onChange={handleChangeMinPrice}/>
            <span>Max price</span>
            <input type="number" value={maxPrice} onChange={handleChangeMaxPrice}/>
            <span>Category</span>
            <select value={category} onChange={handleChangeCategory}>
                <option></option>
                {
                    categories?.map(showCategory)
                }
            </select>
            <span>In stock</span>
            <input type="checkbox" value={inStock} onChange={handleChangeInStock}/>
            <span>In sale</span>
            <input type="checkbox" value={inSale} onChange={handleChangeInSale}/>
        </div>
    );
};

export default FiltersPanel;