import LogoutButton from "./LogoutButton.js"
import React from 'react'
import AdminNavBar from "./AdminNavBar.js"
import AdministrateAccounts from "./AdministrateAccounts"
import '../css/administrate_accounts.css'

export default function AdminAdministrateAccountsPage() {
    return (
        <div id="administratePage">
            <div id="administrateLeft">
                <AdminNavBar />
                <LogoutButton />
            </div>

            <div id="administrateRight"> 
                <AdministrateAccounts />
            </div>
        </div>
    );
}