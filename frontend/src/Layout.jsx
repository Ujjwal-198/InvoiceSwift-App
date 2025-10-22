import React from 'react';
import { Header, Footer, Popup} from './components/index.js';
import {Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Popup />
            <Footer />
        </div>
    );
}

export default Layout;
