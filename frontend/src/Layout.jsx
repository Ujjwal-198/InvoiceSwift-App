import React from 'react';
import { Header, Footer } from './components/index.js';
import {Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
