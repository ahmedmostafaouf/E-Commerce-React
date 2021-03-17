import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getitems, deleteitems, handelChange } from "./function";
import Pagination from "react-js-pagination";

import "./items.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class GetItems extends Component {
    state = {
        items: [],
        activePage: 1,
        itemsCountPerPage: "1",
        totalItemsCount: 1,
        pageRangeDisplayed: 3
    };
    componentDidMount() {
        getitems().then(res => {
            this.setState({
                items: res.data.data,
                activePage: res.data.current_page,
                itemsCountPerPage: res.data.per_page,
                totalItemsCount: res.data.total
            });
        });
    }
    //////////////////////////////// Delete Items///////////////////////////////////
    delete = id => {
        deleteitems(id).then(res => {
            let items = this.state.items;
            for (let index = 0; index < items.length; index++) {
                if (items[index].id == id) {
                    items.splice(index, 1);
                    this.setState({
                        items
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
                items: res.data.data,
                activePage: res.data.current_page,
                itemsCountPerPage: res.data.per_page,
                totalItemsCount: res.data.total
            });
        });
    }
    render() {
        return (
            <div className="container ">
                <Link className="btn btn-info btnadd" to="/add/item">
                    <FontAwesomeIcon icon="plus" className="icon" />
                    Add Items
                </Link>
                {this.state.items.length ? (
                    <div className="table-responsive">
                        <table className="table table-light">
                            <thead className="table-primary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Photo</th>

                                    <th scope="col">Control</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.items.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                {item.status == 1
                                                    ? "New"
                                                    : "Used"}
                                            </td>
                                            <td>{item.category.name}</td>
                                            <td>
                                                <img
                                                    key={item.id}
                                                    src={`assets/images/items/${item.photo}`}
                                                    style={{
                                                        width: 160,
                                                        hight: 100
                                                    }}
                                                />
                                            </td>

                                            <td>
                                                <Link
                                                    className="btn btn-outline-primary"
                                                    to={"/edit/item/" + item.id}
                                                >
                                                    <FontAwesomeIcon
                                                        icon="edit"
                                                        className="icon"
                                                    />
                                                </Link>
                                                <button
                                                    className="btn btn-outline-danger delete_btn"
                                                    to={
                                                        "/delete/item/" +
                                                        item.id
                                                    }
                                                    onClick={() =>
                                                        this.delete(item.id)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon="trash"
                                                        className="icon"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
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

export default GetItems;
