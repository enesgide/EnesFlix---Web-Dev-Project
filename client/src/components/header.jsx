import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const navLinks = [
        {id: 1, text: "Movies", url: "/"},
        {id: 2, text: "My list", url: "/mylist"},
        {id: 3, text: "Contact", url: "/contact"},
        {id: 4, text: "Log in", url: "/login", special: true},
    ]
    

    return (
        <div className="nav-bar" style={{display: 'flex', justifyContent: 'center'}}>
            <ul style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                margin: '0 3%', gap: '40px'
            }}>
                <Logo />
                <SearchBar />
                <div>
                    {navLinks.map((navlink) => (
                        <NavButton key={ navlink.id } text={ navlink.text } url={ navlink.url } special={ navlink.special } />
                    ))}
                </div>                
            </ul>
        </div>
    );
}

const Logo = () => {
    return (
        <Link to="/">
            <li className="logo" style={{
                display: 'inline-block',
                fontSize: '1.5rem',
            }}>
                EnesFlix
            </li>
        </Link>        
    );
}

const SearchBar = () => {
    const [search, setSearch] = useState('');

    useEffect(() => {
        console.log("Search state = " + search);
    }, [search]);

    return (
        <li className="search-bar" style={{
            display: 'inline-block',
            height: '30px',
        }}>
            <input className="input" value={ search } onChange={e => setSearch(e.target.value)} placeholder="Search for movies..." />
        </li>
    );
}

const NavButton = (props) => {
    return (
        <Link to={ props.url }>
            <li className={props.special ? "login-btn" : "nav-btn"} style={{
                display: 'inline-block',
                marginRight: '15px',
                padding: props.special ? '7px 15px' : '10px',
            }}>                
                { props.text }  
            </li>
        </Link>  
    );
}

export default Header;