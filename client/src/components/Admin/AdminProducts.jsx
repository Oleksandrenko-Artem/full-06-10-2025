import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from './../../store/productsSlice';
import AdminProductsRow from './AdminProductsRow';
import AdminProductsForm from './AdminProductsForm';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.products);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        if (products?.length === 0) {
            dispatch(getAllProductsThunk());
        }
    }, [dispatch, products?.length]);
    const handleCreate = () => {
        setIsCreating(true);
        setSelectedProduct(null);
    };
    const cancelForm = () => {
        setIsCreating(false);
    };
    const handleUpdate = (product) => {
        setIsCreating(true);
        setSelectedProduct(product);
    };
    const showProduct = (product) => (<AdminProductsRow key={product._id} product={product} handleUpdate={handleUpdate} />);
    return (
        <section>
            {error && <p>{error}</p>}
            <h2>Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>description</th>
                        <th>price</th>
                        <th>stockQty</th>
                        <th>category</th>
                        <th>isSale</th>
                        <th>images</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(showProduct)}
                </tbody>
            </table>
            <div>
                <button onClick={handleCreate}>Create new product</button>
            </div>
            {isCreating && <AdminProductsForm selectedProduct={selectedProduct} cancelForm={cancelForm} />}
        </section>
    );
};

export default AdminProducts;