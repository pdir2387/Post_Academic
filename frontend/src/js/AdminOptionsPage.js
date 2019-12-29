import LogoutButton from "./LogoutButton.js"
import React from 'react'
import AdminNavBar from "./AdminNavBar.js"
import AdminOptions from "./AdminOptions.js"

import commons from '../css/commons.module.css'

export default function AdminOptionsPage() {
    return (
        <div id={commons.page}>
            <div id={commons.left}>
                <AdminNavBar />
                <LogoutButton />
            </div>

            <div id={commons.right}> 
                <AdminOptions />
            </div>
        </div>
    );
}