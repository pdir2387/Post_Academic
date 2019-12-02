import React from 'react'
import '../css/home.css'

function LogoutButton(){
    return(
        <div className="NavBarItem">
            <a href="/api/logout">
                <button>Logout</button>
            </a>
        </div>
    )
}

export default LogoutButton