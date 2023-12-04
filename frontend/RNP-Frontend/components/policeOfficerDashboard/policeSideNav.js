import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import getSidebarItems from '@/constants/sidebarUtils';
import Image from 'next/image';

const PoliceSideNav = ({ setPage, logout }) => {
    const buttonStyle = {
        width: "100%",
        backgroundColor:"#1b3261"
    }
    const [sideBarItems, setSideBarItems] = useState([])
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [hoveredItem, setHoveredItem] = useState('')
    const [isHovered, setIsHovered] = useState(false)
    const toggleScreens = (item) => {
        setActiveItem(item)
        setPage(item)
    }
    const handleHoveredItem = (item) => {
        setHoveredItem(item)
    }
    useEffect(() => {
        // const role = JSON.parse(localStorage.getItem("user")).role
        const dashboardItems = getSidebarItems("OFFICER")
        setSideBarItems(dashboardItems)

    }, [])
    return (
        <>
            <div className="font-monospace">
                <div className="d-flex flex-column p-3 text-white fixed-top vh-100" style={{width:"20%", backgroundColor: "#000000" }}>
                    <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <div className='d-flex flex-column'>
                            <span className="fs-4 font-monospace mt-3 d-flex justify-content-center text-hite"><strong>RNP-AIES SYSTEM</strong></span>
                        </div>
                    </div>
                    <hr />
                    {/* list of items */}
                    <ul className="nav nav-pills flex-column">
                        {sideBarItems.map((item) => {
                            return (
                                <li className="nav-item" key={item.title}>
                                    {/* "nav-link active" */}
                                    <Link href="">
                                        <a className={`nav-link mt-2 text-white  my-2 ${activeItem === `${item.title}` ? 'fw-bold text-white' : 'fw-light'}`}
                                            onClick={() => toggleScreens(`${item.title}`)}
                                            // i want to apply is hovered when and only if active is set to false
                                            style={{
                                                backgroundColor:
                                                    activeItem === item.title
                                                        ? '#0d6efd'
                                                        : hoveredItem === item.title && activeItem !== item.title
                                                            ? '#4c97ff'
                                                            : '',
                                                            color:
                                                            activeItem === item.title
                                                            ? 'black':''
                                            }}
                                            onMouseEnter={() => handleHoveredItem(`${item.title}`)}
                                            onMouseLeave={() => handleHoveredItem('')}
                                        >
                                            {item.icon}
                                            {item.title}
                                        </a>
                                    </Link>
                                </li>
                            )
                        })}

                    </ ul>
                    <div className='mt-auto mb-3'>
                        <button className='btn text-white btn btn-outline-light font-monospace'
                            onClick={() => logout()
                            }
                            style={buttonStyle}
                        >
                            <i className="bi bi-box-arrow-right mx-3" ></i>
                            <strong>LOGOUT</strong>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PoliceSideNav;