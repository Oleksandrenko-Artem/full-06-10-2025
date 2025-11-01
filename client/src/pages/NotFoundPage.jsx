import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './pages.module.scss';


const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }
    return (
        <div className={styles['page-padding']}>
            <div className={styles.image}>
               <img src="\public\images\Illustration.png" alt="Not Found" /> 
            </div>
            <h2>Oops! page not found</h2>
            <div className={styles['link-home']}>
                <button onClick={handleBack}>Back to home</button> 
            </div>
        </div>
    );
};

export default NotFoundPage;