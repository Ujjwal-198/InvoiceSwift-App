import React, { useEffect } from 'react'
import Layout from './Layout.jsx'
import { Routes, Route } from 'react-router-dom';
import { Home, Invoice, Login, Signup, WelcomePage, Profile, Dashboard, Services, About, Contact } from './pages/index.js';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/userSlice.js';
import { ProtectedRoutes, AuthRequired } from './components/index.js';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='invoice' element={<Invoice />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='welcome' element={<WelcomePage />} />
          <Route path='404' element={<AuthRequired />} />
          <Route path='services' element={<Services />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path='profile' element={<Profile />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>

          {/* Catch-all route */}
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
