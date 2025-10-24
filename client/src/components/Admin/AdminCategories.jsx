import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesThunk } from './../../store/categoriesSlice';
import AdminCategoriesForm from './AdminCategoriesForm';
import AdminCategoryRow from './AdminCategoryRow';

const AdminCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const dispatch = useDispatch();
    const { categories, error } = useSelector((state) => state.categories);
    useEffect(() => {
        if (categories?.length === 0) {
            dispatch(getAllCategoriesThunk());
        }
    }, [dispatch, categories?.length]);
    const handleCreate = () => {
        setIsCreating(true);
        setSelectedCategory(null);
    };
    const handleUpdate = (category) => {
        setIsCreating(true);
        setSelectedCategory(category);
    };
    const cancelForm = () => {
        setIsCreating(false);
    };
    const showCategory = (category) => <AdminCategoryRow key={category._id} category={category} handleUpdate={handleUpdate} />;
    return (
        <section>
            {error && error.includes('409') && <p>Error: Category has products</p>}
            <h2>Categories</h2>
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map(showCategory)}
                </tbody>
            </table>
            <button onClick={handleCreate}>Create new category</button>
            {isCreating && <AdminCategoriesForm cancelForm={cancelForm} selectedCategory={selectedCategory} />}
        </section>
    );
};

export default AdminCategories;