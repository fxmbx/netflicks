import React, { useState, useEffect } from 'react'
import './NavBar.css'

function NavBar() {
    const [show, setShow] = useState(false)
    useEffect(() => {

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else setShow(false)
        });

        return () => {
            window.removeEventListener('scroll')
        }
    }, [])
    return (
        <div className={`nav ${show && 'nav-bg-black'}`}>


            <img className='nav-logo' alt='Netflix logo' src='https://www.freepnglogos.com/uploads/netflix-logo-0.png' />
            <img className='nav-avatar' src='https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg' alt='avatar-icon' />
        </div>
    )
}

export default NavBar
