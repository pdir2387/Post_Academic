import LogoutButton from "./LogoutButton.js"

const React = require('react');

function HomePage() {
        return (
            <div>
                <h1>You are now logged in</h1>
                <LogoutButton />
            </div>
        );
}

export default HomePage;