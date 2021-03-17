import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./nav.css";
class NavBar extends Component {
    logout = e => {
        e.preventDefault();
        localStorage.removeItem("adminsToken");
        this.props.history.push("/admins_login");
    };
    render() {
        const NavBAr = (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <Link className="nav-link active" to="/home">
                            <FontAwesomeIcon icon="home" className="icon" />
                            Home <span className="sr-only">(current)</span>
                        </Link>
                        <Link className="nav-link" to="/items">
                            <FontAwesomeIcon
                                icon="briefcase"
                                className="icon"
                            />
                            Items
                        </Link>
                        <Link className="nav-link" to="/categories">
                            <FontAwesomeIcon
                                icon="border-all"
                                className="icon"
                            />
                            Categories
                        </Link>
                        <Link className="nav-link" to="/users">
                            <FontAwesomeIcon icon="user" className="icon" />
                            Users
                        </Link>
                        <Link
                            className="nav-link logout"
                            to="/admins_login"
                            onClick={this.logout.bind(this)}
                        >
                            <FontAwesomeIcon
                                icon="angle-double-left"
                                className="icon"
                            />
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>
        );
        return (
            <div>
                {localStorage.adminsToken ? (
                    NavBAr
                ) : (
                    <Redirect to="/admins_login"></Redirect>
                )}
            </div>
        );
    }
}

export default withRouter(NavBar);
