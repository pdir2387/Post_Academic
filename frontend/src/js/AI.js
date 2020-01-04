import React from 'react'
import StudentNavBar from './StudentNavBar'
import TidorPage from './TidorPage'

import commons from '../css/commons.module.css'

export default function AI() {
    return(
        <div id={commons.page}>
            <div id={commons.left}>
                <StudentNavBar />
            </div>
            
            <div id={commons.right}>
                <TidorPage />
            </div>
        </div>
    )
}