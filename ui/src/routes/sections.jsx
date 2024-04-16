import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import SignUpPage from 'src/pages/signup';

export const IndexPage = lazy(() => import('src/pages/app'));
export const CreateProductPage = lazy(() => import('src/pages/create-products'));
export const UserPage = lazy(() => import('src/pages/user'));
export const HistoryPage = lazy(() => import('src/pages/history'));
export const NotificationPage = lazy(() => import('src/pages/notifications'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/farmer-products'));
export const UserProductsPage = lazy(() => import('src/pages/user-products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
// ----------------------------------------------------------------------
export const CartPage = lazy(() => import('src/pages/cart'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { element: <IndexPage />, path: 'dashboard' },
        { path: 'Profile', element: <ProfilePage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'create-product', element: <CreateProductPage /> },
        { path: 'notification', element: <NotificationPage /> },
        { path: 'history', element: <HistoryPage /> },
        { path: 'cart/:productId', element: <CartPage /> },
        { path: 'shop', element: <UserProductsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
