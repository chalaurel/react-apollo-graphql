import React from 'react';

class Signup extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Signup</h1>
                <form className="form">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="email" name="email" placeholder="E-mail" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="password" name="passwordConfirmation" placeholder="Password Confirm" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;
