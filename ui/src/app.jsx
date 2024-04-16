/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import React,{ useEffect } from 'react';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

import { useNavigate,useLocation  } from 'react-router-dom';

export default function App() {
  useScrollToTop();
  const navigateTo = useNavigate ();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loginDetails');
    const isLoginPage = location.pathname === '/login';
    const isSignupPage = location.pathname === '/signup';

    if (!isLoggedIn && !isLoginPage && !isSignupPage) {
      // If user is not logged in, redirect to the login page
      navigateTo('/login');
    }
  }, [navigateTo,location]);

  return (
    <ThemeProvider>
      <ToastContainer />
      <Router />
    </ThemeProvider>
  );
}
