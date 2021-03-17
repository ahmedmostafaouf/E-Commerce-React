import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";
import {
    getAdminCount,
    getItemCount,
    getCategoriesCount,
    getUsersCount
} from "./function";
class Home extends Component {
    state = {
        getAdminCount: "",
        getCategoriesCount: "",
        getItemCount: "",
        getUsersCount: ""
    };
    componentDidMount() {
        getAdminCount().then(res => {
            this.setState({
                getAdminCount: res.data.count
            });
        });
        getItemCount().then(res => {
            this.setState({
                getItemCount: res.data.count
            });
        });
        getCategoriesCount().then(res => {
            this.setState({
                getCategoriesCount: res.data.count
            });
        });
        getUsersCount().then(res => {
            this.setState({
                getUsersCount: res.data.count
            });
        });
    }
    render() {
        return (
            <div className="container home2">
                <div className="row">
                    <div className="col">
                        <div
                            className="card text-white bg-dark mb-3"
                            style={{ maxWidth: "18rem" }}
                        >
                            <div className="card-header">
                                <Link to={"/admins"} className="Link">
                                    <h4 className="Total">
                                        Admin Count
                                        <FontAwesomeIcon
                                            icon="user-cog"
                                            className="Icon"
                                        />
                                    </h4>
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title number ">
                                    {this.state.getAdminCount}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div
                            className="card text-white bg-dark mb-3"
                            style={{ maxWidth: "18rem" }}
                        >
                            <div className="card-header">
                                <Link to={"/items"} className="Link">
                                    <h4 className="Total">
                                        Items Count
                                        <FontAwesomeIcon
                                            icon="briefcase"
                                            className="Icon"
                                        />
                                    </h4>
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title number">
                                    {this.state.getItemCount}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                        <div
                            className="card text-white bg-dark mb-3"
                            style={{ maxWidth: "18rem" }}
                        >
                            <div className="card-header">
                                <Link to={"/users"} className="Link">
                                    <h4 className="Total">
                                        User Count
                                        <FontAwesomeIcon
                                            icon="user"
                                            className="Icon"
                                        />
                                    </h4>
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title number">
                                    {this.state.getUsersCount}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div
                            className="card text-white bg-dark mb-3"
                            style={{ maxWidth: "18rem" }}
                        >
                            <div className="card-header">
                                <Link to={"/categories"} className="Link">
                                    <h4 className="Total">
                                        Categories Count{" "}
                                        <FontAwesomeIcon
                                            icon="border-all"
                                            className="Icon"
                                        />
                                    </h4>
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title number">
                                    {this.state.getCategoriesCount}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
