import LogoutButton from "./LogoutButton.js"
import React from 'react'
import AdminNavBar from "./AdminNavBar.js"
import AdministrateAccounts from "./AdministrateAccounts.js"

import commons from '../css/commons.module.css'

export default function AdminAdministrateAccountsPage() {
    return (
        <div id={commons.page}>
            <div id={commons.left}>
                <AdminNavBar />
                <LogoutButton />
            </div>

            <div id={commons.right}> 
                <AdministrateAccounts />
            </div>
        </div>
    );
}