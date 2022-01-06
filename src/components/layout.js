import menuItems from "../models/menu";
import {Link} from "react-router-dom";
import React from "react";
import avatar from "../assets/img/avatar.png";

const Layout = (props) => {

    function generateMenuItems() {
        return menuItems.map(item => {
            return <div className={`nav-item ${window.location.pathname === item.url ? 'active' : ''}`}>
                <div className='nav-links'>
                    <Link to={item.url}>
                        {item.icon ? <i className={item.icon}></i> : ''}
                        <span>{item.title}</span>
                    </Link>
                </div>
                <span className="fas fa-circle"></span>
            </div>
        })
    }

    function toggleMenu(e) {
        e.preventDefault();
        let menu = document.getElementsByClassName('left-menu')[0];
        if(menu.classList.length > 1) menu.classList.remove('hide');
        else menu.classList.add('hide');
    }

    return (
        <div className='main'>
            <div className="left-menu">
                <div className="logo-box">
                    <a href="#" onClick={toggleMenu}><h1>LO<br/>GO</h1></a>
                    <h2>Company Name</h2>
                </div>
                <div className="nav">
                    <div className={`nav-item ${window.location.pathname === '/profile' ? 'active' : ''}`}>
                        <div className='nav-links'>
                            <Link to='/profile'>
                                <img src={avatar} alt=""/>
                                <span>John Dorian</span>
                            </Link>
                        </div>
                        <span className="fas fa-circle"></span>
                    </div>
                    {generateMenuItems()}
                </div>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default Layout;