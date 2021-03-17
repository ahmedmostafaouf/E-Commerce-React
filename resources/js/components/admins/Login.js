import React, { Component } from "react";
import { login } from "./function";
import "../../../css/login.css";
class Login extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };
    changeState = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    submitState = e => {
        e.preventDefault();
        const adminData = {
            email: this.state.email,
            password: this.state.password
        };
        login(adminData).then(res => {
            if (res) {
                this.props.history.push("/home");
            } else {
                this.setState({
                    error: "email or passoword is wrong"
                });
            }
        });
    };
    render() {
        const error = (
            <small
                id="emailHelp"
                className="form-text "
                style={{ color: "#E14647" }}
            >
                {this.state.error}
            </small>
        );
        return (
            <div className="container">
                <div
                    className="card text-white bg-dark mb-3 card_login"
                    style={{ width: "18rem" }}
                >
                    <div className="card-header text-center">Login</div>
                    <div className="card-body">
                        {this.state.error ? error : null}
                        <form onSubmit={this.submitState}>
                            <div className="form-group">
                                <label id="exampleInputEmail1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.changeState}
                                />
                            </div>
                            <div className="form-group">
                                <label id="exampleInputPassword1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.changeState}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
