import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiUpdate, mdiDelete } from '@mdi/js';
import { deleteProductThunk } from '../../store/productsSlice';
import CONSTANTS from '../../constants';

const AdminProductsRow = (props) => {
    const dispatch = useDispatch();
    const { product, handleUpdate } = props;
    const { _id, title, description, price, stockQty, category, isSale, images } = product;
    const handleDelete = (id) => {
        dispatch(deleteProductThunk(id));
    };
    const showImages = (img, i) => <img key={i} style={{width: '30px'}} src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`} alt={title} />
    return (
        <tr>
            <td>{title}</td>
            <td>{description}</td>
            <td>{price}</td>
            <td>{stockQty}</td>
            <td>{category?.name}</td>
            <td>{isSale ? 'yes' : 'no'}</td>
            <td>{images?.map(showImages)}</td>
            <td><Icon onClick={() => { handleUpdate(product) }} size={1} path={mdiUpdate} /></td>
            <td><Icon onClick={() => { handleDelete(_id) }} size={1} path={mdiDelete} /></td>
        </tr>
    );
};

export default AdminProductsRow;