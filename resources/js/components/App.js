import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import Home from "./admins/Home";
import Login from "./admins/Login";
import NavBar from "./admins/NavBar";
import AddItems from "./items/AddItems";
import EditItems from "./items/EditItems";
import GetItems from "./items/GetItems";
import AddUsers from "./users/AddUsers";
import GetUsers from "./users/GetUsers";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import {
    faHome,
    faAngleDoubleLeft,
    faBriefcase,
    faEdit,
    faPlus,
    faTrash,
    faUserCog,
    faBorderAll,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import EditUsers from "./users/EditUsers";
import AddCategory from "./categories/AddCategory";
import GetGategories from "./categories/GetCategories";
import EditCategories from "./categories/EditCategories";
import Getitems from "./categories/Getitems";

library.add(
    fab,
    faHome,
    faAngleDoubleLeft,
    faBriefcase,
    faEdit,
    faPlus,
    faTrash,
    faUserCog,
    faBorderAll,
    faUser
);
class App extends Component {
    render() {
        return (
            <HashRouter>
                <NavBar />
                <div className="container">
                    {/* ///////////// items //////////////////// */}
                    <Route exact path="/edit/item/:id" component={EditItems} />
                    <Route exact path="/items" component={GetItems} />
                    <Route exact path="/add/item" component={AddItems} />

                    {/* //////////// user//////////////////// */}
                    <Route exact path="/users" component={GetUsers} />
                    <Route exact path="/add/user" component={AddUsers} />
                    <Route exact path="/edit/user/:id" component={EditUsers} />
                    {/* //////////// category//////////////////// */}
                    <Route exact path="/add/category" component={AddCategory} />
                    <Route exact path="/categories" component={GetGategories} />
                    <Route exact path="/get/items/:id" component={Getitems} />
                    <Route
                        exact
                        path="/edit/category/:id"
                        component={EditCategories}
                    />

                    {/* ///////////////////////Login//////////////////// */}
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/admins_login" component={Login} />
                </div>
            </HashRouter>
        );
    }
}

export default App;

if (document.getElementById("App")) {
    ReactDOM.render(<App />, document.getElementById("App"));
}
