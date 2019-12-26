import LogoutButton from "./LogoutButton.js"
import React from 'react'
import AdminNavBar from "./AdminNavBar.js"
import AdminOptions from "./AdminOptions.js"
import '../css/administrate_options.css'

export default function AdminOptionsPage() {
    return (
        <div id="administrateOptionsPage">
            <div id="administrateOptionsLeft">
                <AdminNavBar />
                <LogoutButton />
            </div>

            <div id="administrateOptionsRight"> 
                <AdminOptions />
            </div>
        </div>
    );
}