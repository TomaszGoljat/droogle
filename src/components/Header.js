import React from 'react';
import Sponsors from './Sponsors';
import { Link } from 'react-router-dom';
import Logo from './logo.png';

export default function Header() {
    return (
            <>
        <header>
            <div className='topbar--menu'>
                <Link to="/" className='topbar--link'>Search</Link>
                <Link to="/vendors" className='topbar--link'>Vendors</Link>
                <Link to="/tools" className='topbar--link'>Tools</Link>
                <Link to="/support" className='topbar--link'>Support</Link>
                <Link to="/info" className='topbar--link'>?</Link>
            </div>
        </header>
        <Sponsors />
            <Link to="/" className='logo--text'>UNHARMED.INFO</Link>
            <p className='logo--description'>privacy focused harm reduction tools</p>
            </>
    )
}