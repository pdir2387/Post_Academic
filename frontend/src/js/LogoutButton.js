import React from 'react'

import home from '../css/home.module.css'

function LogoutButton(){
    return(
        <div className={home.NavBarItem}>
            <a href="/api/logout">
                <button>Logout</button>
            </a>
        </div>
    )
}

export default LogoutButton