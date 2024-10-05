import React from 'react'
import '../styles/header.css'

function Header() {
    return (
        <div className='navbar'>
            <div className='header'>
                <div className='logo'>
                    <h1>TripWay Holidays</h1>
                </div>
                <div className='header-items'>
                <ul className='header-list'>
                    <li>Home</li>
                    <li>Trips</li>
                    <li>About</li>
                    <li>Contact Us</li>
                    <button>Login</button>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
