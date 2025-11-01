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
import CartPage from './pages/CartPage';
import SearchResults from './pages/SearchResults';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import AdminStatsPage from './components/Admin/AdminStatsPage';
import AdminOrders from './components/Admin/AdminOrders';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/products/search' element={<SearchResults />} />
          <Route path='/success/:idOrder' element={<SuccessPage />} />
          <Route path='/cancel/:idOrder' element={<CancelPage />} />
          <Route path='/products/:idProduct' element={<ProductPage />} />
          <Route path='/categories/:idCategory' element={<CategoryPage />} />
          <Route path='/admin-panel' element={user?.role === 'admin' ? <AdminPage /> : <Navigate to='/' />}>
            <Route index element={user?.role === 'admin' ? <AdminCategories /> : <Navigate to='/' />} />
            <Route path='/admin-panel/categories' element={user?.role === 'admin' ? <AdminCategories /> : <Navigate to='/' />} />
            <Route path='/admin-panel/products' element={user?.role === 'admin' ? <AdminProducts /> : <Navigate to='/' />} />
            <Route path='/admin-panel/stats' element={user?.role === 'admin' ? <AdminStatsPage /> : <Navigate to='/' />} />
            <Route path='/admin-panel/orders' element={user?.role === 'admin' ? <AdminOrders /> : <Navigate to='/' />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
