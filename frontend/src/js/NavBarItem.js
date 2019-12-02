import React from 'react'
import '../css/home.css'

function NavBarItem(props){
    return(
        <div>
            <a href={props.url} >
                <button class="navBarButton">{props.buttonText}</button>
            </a>
        </div>
    )
}

export default NavBarItem