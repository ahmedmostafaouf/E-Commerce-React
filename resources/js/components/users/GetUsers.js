import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getusers, handelChange, deleteusers } from "./function";
import Pagination from "react-js-pagination";

import "./users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class GetUsers extends Component {
    state = {
        users: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 3
    };
    componentDidMount() {
        getusers().then(res => {
            this.setState({
                users: res.data.data,
                activePage: res.data.current_page,
                itemsCountPerPage: res.data.per_page,
                totalItemsCount: res.data.total
            });
        });
    }
    //////////////////////////////// Delete Items///////////////////////////////////
    delete = id => {
        deleteusers(id).then(res => {
            let users = this.state.users;
            for (let index = 0; index < users.length; index++) {
                if (users[index].id == id) {
                    users.splice(index, 1);
                    this.setState({
                        users
                    });
                }
            }
        });
    };
    /////////////////////////////////// End DElete /////////////////////////////////////
    ////////////////////////////////////////// pagination /////////////////////////////
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        handelChange(pageNumber).then(res => {
            this.setState({
                users: res.data.data,
                activePage: res.data.current_page,
                itemsCountPerPage: res.data.per_page,
                totalItemsCount: res.data.total
            });
        });
    }
    render() {
        return (
            <div className="container ">
                <Link className="btn btn-info btnadd" to="/add/user">
                    <FontAwesomeIcon icon="plus" className="icon" />
                    Add Users
                </Link>
                {this.state.users.length ? (
                    <table className="table table-light">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">email</th>
                                <th scope="col">date</th>
                                <th scope="col">Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.date}</td>
                                        <td>
                                            <Link
                                                className="btn btn-info"
                                                to={"/edit/user/" + user.id}
                                            >
                                                <FontAwesomeIcon
                                                    icon="edit"
                                                    className="icon"
                                                />
                                                Edit Users
                                            </Link>
                                            <button
                                                className="btn btn-danger delete_btn "
                                                to={"/delete/user/" + user.id}
                                                onClick={() =>
                                                    this.delete(user.id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon="trash"
                                                    className="icon"
                                                />
                                                delete Users
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <h2 className="text-center">There Is No Data</h2>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        );
    }
}

export default GetUsers;
