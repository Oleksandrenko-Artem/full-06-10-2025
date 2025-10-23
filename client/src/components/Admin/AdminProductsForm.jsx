import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createProductThunk, updateProductThunk } from '../../store/productsSlice';
import { productCreateSchema, productUpdateSchema } from '../../validation/product.validate';
import styles from './Admin.module.scss';

const AdminProductsForm = (props) => {
    const dispatch = useDispatch();
    const { selectedProduct, cancelForm } = props;
    const { categories } = useSelector((state) => state.categories);
    const initialValues = {
        title: selectedProduct?.title || '',
        description: selectedProduct?.description || '',
        price: selectedProduct?.price || '',
        stockQty: selectedProduct?.stockQty || '',
        category: selectedProduct?.category._id || '',
        isSale: selectedProduct?.isSale || false,
        images: [],
    };
    const onSubmit = (values) => {
        const data = new FormData();
        data.append('title', values.title);
        data.append('description', values.description);
        data.append('price', values.price);
        data.append('stockQty', values.stockQty);
        data.append('category', values.category);
        data.append('isSale', values.isSale);
        values.images.forEach((file) => data.append('images', file));
        if (selectedProduct) {
            dispatch(updateProductThunk({id: selectedProduct._id, values: data}));
        } else {
            dispatch(createProductThunk(data));
        }
        cancelForm();
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={selectedProduct ? productUpdateSchema : productCreateSchema}>
            {({setFieldValue}) => {
                const showOption = (category) => <option key={category._id} value={category._id}>{category.name}</option>
                return <Form className={styles.form}>
                    <h2>{selectedProduct ? 'Update product' : 'Create product'}</h2>
                    <label>
                        <Field name="title" type="text" placeholder="title" />
                        <ErrorMessage name="title" />
                    </label>
                    <label>
                        <Field name="description" type="text" placeholder="description" />
                        <ErrorMessage name="description" />
                    </label>
                    <label>
                        <Field name="price" type="number" step="0.01" placeholder="price" />
                        <ErrorMessage name="price" />
                    </label>
                    <label>
                        <Field name="stockQty" type="number" min="0" placeholder="stockQty" />
                        <ErrorMessage name="stockQty" />
                    </label>
                    <label>
                        <Field name="category" as="select">
                            <option>choose category</option>
                            {categories?.map(showOption)}
                        </Field>
                        <ErrorMessage name="category" />
                    </label>
                    <label>
                        <span>isSale</span>
                        <Field name="isSale" type="checkbox" />
                        <ErrorMessage name="isSale" />
                    </label>
                    <label>
                        <input name="images" type="file" multiple onChange={(event) => { setFieldValue('images', Array.from(event.target.files)) }} />
                        <ErrorMessage name="images" />
                    </label>
                    <button type='submit'>Create</button>
                </Form>
            }}
        </Formik>
    );
}

export default AdminProductsForm;