import Layout from './components/Layout';
import CartPage from './pages/CartPage';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupCompletePage from './pages/SignupCompletePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import OrderListPage from './pages/OrderListPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderPage from './pages/OrderPage';
import OrderCompletePage from './pages/OrderCompletePage';

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/signup/complete', element: <SignupCompletePage /> },
      { path: '/products', element: <ProductListPage /> },
      { path: '/products/:productId', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/order', element: <OrderPage /> },
      { path: '/order/complete', element: <OrderCompletePage /> },
      { path: '/orders', element: <OrderListPage /> },
      { path: '/orders/:orderId', element: <OrderDetailPage /> },
    ],
  },
];

export default routes;
