import React from 'react'
import { NavLink } from 'react-router-dom'
function Header() {
    return (
        <div>
            <header> <img src="src/assets/books.png" alt="books icon" width="200" />
                <p className="headerTitle">The Book Palace</p>
                <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/books">Books</NavLink></li>
                    <li><NavLink to="/reviews"> ⭐ Reviews </NavLink></li>
                    <li><img src="src/assets/account_circle.svg" alt="account icon" width="20" /><NavLink to="/profile">Profile</NavLink></li>

                </ul></nav>
            </header>
        </div>
    )
}

export default Header
