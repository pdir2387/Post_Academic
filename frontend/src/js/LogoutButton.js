import React from 'react'

import home from '../css/home.module.css'

function LogoutButton(){
    return(
        <div>
            <a href="/api/logout">
                <button className={home.NavBarItem}>Logout</button>
            </a>
        </div>
    )
}

export default LogoutButton