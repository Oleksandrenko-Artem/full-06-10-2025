import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountThunk } from './store/authSlice';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header/Header';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import AdminPage from './pages/AdminPage';
import AdminCategories from './components/Admin/AdminCategories';
import AdminProducts from './components/Admin/AdminProducts';

const App = () => {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAccountThunk());
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/admin-panel' element={user?.role === 'admin' ? <AdminPage /> : <Navigate to='/' />}>
            <Route path='/admin-panel/categories' element={user?.role === 'admin' ? <AdminCategories /> : <Navigate to='/' />} />
            <Route path='/admin-panel/products' element={user?.role === 'admin' ? <AdminProducts /> : <Navigate to='/' />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
