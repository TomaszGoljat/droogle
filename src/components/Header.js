import React from 'react';
import Sponsors from './Sponsors';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
            <>
        <header>
            <div className='topbar--menu'>
                <Link to="/vendors">Vendors</Link>
                <Link to="/tools">Tools</Link>
                <Link to="/support">Support</Link>
                <Link to="/info">?</Link>
            </div>
        </header>
        <Sponsors />
            <Link to="/" className='logo--text'>DROOGLE.INFO</Link>
            <p className='logo--description'>privacy focused harm reduction search</p>
            </>
    )
}