import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class Login extends Component {

    state = {
        credentials: { username: '', password: '' },
        isAuthenticated : false
    }

    login = event => {

        event.preventDefault();

        fetch('http://127.0.0.1:8000/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(data => {
                localStorage.setItem('auth', data["token"]);
                this.setState({isAuthenticated: true})
            })
            .catch(error => {
                console.log(error)
            })
    }

    inputChanged = event => {
        const cred = this.state.credentials
        cred[event.target.name] = event.target.value
        this.setState({ credentials: cred })
    }

    render() {
        if (this.state.isAuthenticated) {
            return <Redirect to='/dashboard'></Redirect>
        }
        return (
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-12 login-form-1">
                        <h3>Login User</h3>
                        <form method="post" onSubmit={this.login}>
                            <div className="form-group">
                                <label >
                                    Username:
                  <input type="text" name="username" value={this.state.credentials.username} onChange={this.inputChanged}></input>
                                </label>

                            </div>


                            <div className="form-group">

                                <label>
                                    Password:
                  <input type="password" name="password" value={this.state.credentials.password} onChange={this.inputChanged}></input>
                                </label>
                            </div>

                            <div className="form-group">
                                <button onClick={this.login} className="btn btn-primary" type="submit" value="Submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;
