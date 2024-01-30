import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import getSidebarItems from '@/constants/sidebarUtils';

const SideNav = ({ setPage, addLeave, staffRole }) => {
    const [sideBarItems, setSideBarItems] = useState([])
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [hoveredItem, setHoveredItem] = useState('')
    const toggleScreens = (item) => {
        setActiveItem(item)
        setPage(item)
    }
    const handleHoveredItem = (item) => {
        setHoveredItem(item)
    }
    useEffect(() => {
        const role = JSON.parse(localStorage.getItem("user")).role
        const dashboardItems = getSidebarItems(role)
        setSideBarItems(dashboardItems)

    }, [])
    return (
        <>
            <div className='d-flex flex-column mt-5 font-monospace' style={{ backgroundColor: "white", position: "fixed", height: "100vh" }}>
                <div>
                    <p className='my-0 p-0 mx-2' style={{ whiteSpace: 'nowrap' }}>Citizen system</p>
                    <hr />
                </div>
                <div className='mt-1'>
                    <ul className="nav nav-pills d-flex flex-column">
                        {sideBarItems.map((item) => {
                            return (
                                <li className="nav-item" key={item.title} style={{ cursor: "pointer" }}>
                                    {/* "nav-link active" */}
                                    <div className={`nav-link mt-1 text-dark  my-2 ${activeItem === `${item.title}` ? 'fw-bold text-white' : 'fw-light'}`}
                                        onClick={() => toggleScreens(`${item.title}`)}
                                        // i want to apply is hovered when and only if active is set to false
                                        style={{
                                            backgroundColor:
                                                activeItem === item.title
                                                    ? 'black'
                                                    : hoveredItem === item.title && activeItem !== item.title
                                                        ? '#f3f3fb'
                                                        : '',
                                        }}
                                        onMouseEnter={() => handleHoveredItem(`${item.title}`)}
                                        onMouseLeave={() => handleHoveredItem('')}
                                    >
                                       {item.icon}
                                        {item.title}
                                    </div>
                                </li>
                            )
                        })}
                    </ ul>
                </div>
                <div className="fixed-bottom mb-4 mx-4">
                    <button className="btn btn-outline-primary"
                        onClick={() => addLeave()}
                    >
                        <div className='d-flex flex-row'>
                            Logout
                            <i className="bi bi-box-arrow-right mx-2" style={{fontSize:"1.3em"}}></i>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SideNav;