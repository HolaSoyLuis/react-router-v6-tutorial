import { useParams, useNavigate } from 'react-router-dom';
import { getInvoice, deleteInvoice } from '../data';

// Personal addition
import { useSearchParams, useLocation } from 'react-router-dom';

export default function Invoice(){
    let params = useParams();
    // We'll do search params persistent when delete an invoice
    let [searchParams] = useSearchParams();
    let location = useLocation();
    let navigate = useNavigate();
    let invoice = getInvoice(parseInt(params.invoice_id));

    const deleteButton = () => {
        deleteInvoice(invoice.number);
        console.log('Invoice number:', invoice.number, 'has been deleted');
        navigate("/invoices" + location.search);
        // SUCCESS
        // now when search parameters are set, it persists when you delete an invoice :D
    }

    return (
        <main style={{ padding: "1rem" }}>
            <h2>Total due: {invoice.amount}</h2>
            <p>{invoice.name}: {invoice.number}</p>
            <p>Due date: {invoice.due}</p> 
            {/*
            <button
                type="button"
                onClick={() => {
                    deleteInvoice(invoice.number);
                    navigate("/invoices");
                }}
            >
            onClick={deleteButton}
            Delete
            </button>
            */}
            <button type="button" onClick={deleteButton}>Delete</button>
        </main>
    );
}
