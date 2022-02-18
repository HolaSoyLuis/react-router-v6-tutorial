import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
    return (
        <Fragment>
            React router tutorial :D
            <nav>
                <Link to="/invoices">Invoices</Link>
                <Link to="/expenses">Expenses</Link>
            </nav>
            <Outlet />
        </Fragment>
    );
}
