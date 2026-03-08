import { NavLink } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import books from "../assets/books.png"
import profileicon from "../assets/account_circle.svg"

{/* Header Component */ }
function Header() {
    const { user, logout } = useAuth();
    {/* State for hamburger menu */ }
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <div>
                <NavLink to="/">
                    <div className='logo'>
                        <img src={books} alt="books icon" width="200" />
                        <p className="headerTitle">Bookpal Reviews</p>
                    </div>
                </NavLink>

                {/* Hamburger */}
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}

                >
                    ☰
                </button>
            </div>
            <nav className={menuOpen ? "nav-open" : ""} style={{ zIndex: "100" }}>
                <ul>

                    <li>
                        <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }: { isActive: boolean }) =>
                            isActive ? "active-link" : ""
                        }>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/books" onClick={() => setMenuOpen(false)} className={({ isActive }: { isActive: boolean }) =>
                            isActive ? "active-link" : ""
                        }>
                            Books
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/users" onClick={() => setMenuOpen(false)} className={({ isActive }: { isActive: boolean }) =>
                            isActive ? "active-link" : ""
                        }>
                            Follow
                        </NavLink>
                    </li>

                    {/* If user is loggen in, show links */}
                    {user && (
                        <>
                            <li>
                                <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={({ isActive }: { isActive: boolean }) =>
                                    isActive ? "active-link" : ""
                                }>
                                    <img src={profileicon} alt="account icon" width="20" />
                                    Profile
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* If no user is logged in, show login, otherwise show logout*/}
                    {!user ? (
                        <li>
                            <NavLink to="/login" onClick={() => setMenuOpen(false)} className={({ isActive }: { isActive: boolean }) =>
                                isActive ? "active-link" : ""
                            }>
                                Login
                            </NavLink>
                        </li>
                    ) : (
                        <li onClick={() => {
                            logout();
                            setMenuOpen(false);
                        }}
                            className="logout-button"
                        >
                            Logout
                        </li>
                    )}

                </ul>
            </nav>
        </header>
    )
}

export default Header
