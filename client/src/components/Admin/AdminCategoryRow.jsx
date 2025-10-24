import { useDispatch } from "react-redux";
import { Icon } from '@mdi/react';
import { mdiUpdate, mdiDelete } from '@mdi/js';
import { deleteCategoryThunk } from "../../store/categoriesSlice";

const AdminCategoryRow = (props) => {
    const dispatch = useDispatch();
    const { category, handleUpdate } = props;
    const handleDelete = (id) => {
        dispatch(deleteCategoryThunk(id));
    };
    return (
        <tr>
            <td>{category.name}</td>
            <td><Icon onClick={() => handleUpdate(category)} size={1} path={mdiUpdate} /></td>
            <td><Icon onClick={() => handleDelete(category._id)} size={1} path={mdiDelete} /></td>
        </tr>
    );
};

export default AdminCategoryRow;