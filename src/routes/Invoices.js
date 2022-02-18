/*
import { getInvoices } from '../data';
import { Link, Outlet } from 'react-router-dom';

export default function Invoices(){

    let invoices = getInvoices();
    let renderedInvoices = invoices.map(invoice => (
        <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={"/invoices/" + invoice.number}
            key={invoice.number}
        >
            {invoice.name}
        </Link>
    ));

    return (
        <main style={{padding: "1rem 0"}}>
            <h2>Invoices</h2>
            { renderedInvoices }
            <Outlet />
        </main>
    );
}
*/

import { getInvoices } from '../data';
import { NavLink, Outlet, useSearchParams, useLocation } from 'react-router-dom';

export function QueryNavLink({ to, ...props }){
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
}

export default function Invoices(){
    let invoices = getInvoices();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const handleSearch = e => {
        let filter = e.target.value;
        if(filter) setSearchParams({filter});
        else setSearchParams({});
    }

    const searchFilter = invoice => {
        let filter = searchParams.get("filter");
        if(!filter) return true;
        let name = invoice.name.toLowerCase();
        if(name.startsWith(filter.toLowerCase())) return true;
    }

    let renderedInvoices = invoices
    /*
    .filter(invoice => {
        let filter = searchParams.get("filter");
        if(!filter) return true;
        console.log('Filter:', filter);
        let name = invoice.name.toLowerCase();
        if(name.startsWith(filter.toLowerCase())) return true;
    })
    */
    .filter(searchFilter)
    .map(invoice => (
        <QueryNavLink
            style={({isActive}) => {
                return {
                    display: "block",
                    margin: "1rem 0",
                    color: isActive ? "red": "",
                }
            }}
            to={"/invoices/" + invoice.number}
            key={invoice.number}
        >
            {invoice.name}
        </QueryNavLink>
    ));

    // on the last code there was a tag: <NavLink /> instead of <QueryNavLink />
    // i commented <NavLink /> component declaration but code didn't work
    // every time you write a tag, be sure to delete it instead of commenting because
    // react still read it and show errors out of nowhere :'(

    return (
        <main style={{padding: "1rem 0"}}>
            <h2>Invoices</h2>
            <input value={searchParams.get("filter") || ""} onChange={handleSearch} />
            { renderedInvoices }
            <Outlet />
        </main>
    );
}
