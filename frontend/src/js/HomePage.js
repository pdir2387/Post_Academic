import LogoutButton from "./LogoutButton.js"

const React = require('react');

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>You are now logged in</h1>
                <LogoutButton />
            </div>
        );
    }
}

export default HomePage;