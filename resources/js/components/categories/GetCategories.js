import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCategories, deleteCategories, handelChange } from "./function";
import Pagination from "react-js-pagination";
import "./category.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class GetGategories extends Component {
    state = {
        categories: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 3
    };
    componentDidMount() {
        getCategories().then(res => {
            this.setState({
                categories: res.data.Category.data,
                activePage: res.data.Category.current_page,
                itemsCountPerPage: res.data.Category.per_page,
                totalItemsCount: res.data.Category.total
            });
        });
    }
    //////////////////////////////// Delete Items///////////////////////////////////
    delete = id => {
        deleteCategories(id).then(res => {
            let categories = this.state.categories;
            for (let index = 0; index < categories.length; index++) {
                if (categories[index].id == id) {
                    categories.splice(index, 1);
                    this.setState({
                        categories
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
                categories: res.data.Category.data,
                activePage: res.data.Category.current_page,
                itemsCountPerPage: res.data.Category.per_page,
                totalItemsCount: res.data.Category.total
            });
        });
    }
    render() {
        return (
            <div className="container ">
                <Link className="btn btn-info btnadd" to="/add/category">
                    <FontAwesomeIcon icon="plus" className="icon" />
                    Add Category
                </Link>
                {this.state.categories.length ? (
                    <table className="table table-light">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map(category => {
                                return (
                                    <tr key={category.id}>
                                        <th scope="row">{category.id}</th>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <Link
                                                className="btn btn-info"
                                                to={
                                                    "/edit/category/" +
                                                    category.id
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon="edit"
                                                    className="icon"
                                                />
                                            </Link>
                                            <Link
                                                className="btn btn-info"
                                                to={"/get/items/" + category.id}
                                            >
                                                <FontAwesomeIcon
                                                    icon="edit"
                                                    className="icon"
                                                />
                                            </Link>
                                            <button
                                                className="btn btn-danger delete_btn "
                                                to={
                                                    "/delete/item/" +
                                                    category.id
                                                }
                                                onClick={() =>
                                                    this.delete(category.id)
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
                ) : (
                    <h2 className="text-center">There Is No Data</h2>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={3}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        );
    }
}

export default GetGategories;
