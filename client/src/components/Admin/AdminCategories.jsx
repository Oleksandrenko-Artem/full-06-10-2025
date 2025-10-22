import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryThunk, getAllCategoriesThunk } from './../../store/categoriesSlice';
import AdminCategoriesForm from './AdminCategoriesForm';

const CategoryRow = (props) => {
    const dispatch = useDispatch();
    const { category, handleUpdate } = props;
    const handleDelete = (id) => {
        dispatch(deleteCategoryThunk(id));
    };
    return (
        <tr>
            <td>{category.name}</td>
            <td><button onClick={() => handleUpdate(category)}>Update</button></td>
            <td><button onClick={()=> handleDelete(category._id)}>Delete</button></td>
        </tr>
    );
};

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
    const showCategory = (category) => <CategoryRow key={category._id} category={category} handleUpdate={handleUpdate} />;
    return (
        <section>
            {error && error.includes('409') && <p>Error: Category has products</p>}
            <h2>Categories</h2>
            <table>
                <tbody>
                    {categories.map(showCategory)}
                </tbody>
            </table>
            <button onClick={handleCreate}>Create new category</button>
            {isCreating && <AdminCategoriesForm cancelForm={cancelForm} selectedCategory={selectedCategory} />}
        </section>
    );
};

export default AdminCategories;