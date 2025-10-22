import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createCategoryThunk, updateCategoryThunk } from '../../store/categoriesSlice';

const AdminCategoriesForm = (props) => {
    const { cancelForm, selectedCategory } = props;
    const dispatch = useDispatch();
    const onSubmit = (values) => {
        if (selectedCategory) {
            dispatch(updateCategoryThunk({ id: selectedCategory._id, values }));
        } else {
            dispatch(createCategoryThunk(values));
        }
        cancelForm();
    };
    return (
        <Formik initialValues={{name: selectedCategory?.name || ''}} onSubmit={onSubmit}>
            {() => {
                return <Form>
                    <label>
                        <Field name="name" type="text" placeholder="Name" />
                        <ErrorMessage name="name" />
                    </label>
                    <button type='submit'>{selectedCategory ? 'Update' : 'Create'}</button>
                </Form>
            }}
        </Formik>
    );
}

export default AdminCategoriesForm;