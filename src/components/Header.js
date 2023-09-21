import React from 'react';
import Sponsors from './Sponsors';

export default function Header() {
    return (
            <>
        <header>
            <div className='topbar--menu'>
                <span>Tools</span>
                <span>Donate now</span>
                <span>?</span>
            </div>
        </header>
        <Sponsors />
            <h1 className="logo-text">DROOGLE.INFO</h1>
            </>
    )
}