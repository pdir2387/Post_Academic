import React from 'react'

import home from '../css/home.module.css'

function NavBarItem(props){
    return(
        <div>
            <a href={props.url} >
                <button className={home.navBarButton}>{props.buttonText}</button>
            </a>
        </div>
    )
}

export default NavBarItem