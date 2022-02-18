import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Invoices from './routes/Invoices';
import Expenses from './routes/Expenses';
import Invoice from './routes/Invoice';

const NotFound = () => <h1>404 Not Found</h1>
const InvoiceIndex = () => <main>Index, select an invoice :D</main>


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="expenses" element={<Expenses />} />
                <Route path="invoices" element={<Invoices />} >
                    <Route index element={<InvoiceIndex />} />
                    <Route path=":invoice_id" element={<Invoice />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
