import { NavLink } from "react-router-dom";
import { BsFillHouseFill, BsFillPersonFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi'; 
import { useState } from "react";

export const SideNav = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    return (
        <div className={`side-nav px-4 ${collapsed ? 'collapsed' : ''}`}>
            <div className="burger" onClick={() => setCollapsed(!collapsed)}>
                <GiHamburgerMenu />
            </div>
            <div className="nav-item mb-3">
                <NavLink 
                    to='/dashboard'
                    className={({isActive}) => (isActive ? 'active' : '')}
                >
                    <BsFillHouseFill className="icon" /> Dashboard
                </NavLink>
            </div>
            <div className="nav-item">
                <NavLink 
                    to='/profile'
                    className={({isActive}) => (isActive ? 'active' : '')}
                >
                    <BsFillPersonFill className="icon" /> Profile
                </NavLink>
            </div>
        </div>
    )
}