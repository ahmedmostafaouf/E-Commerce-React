import React, { Component } from "react";
import { getToken } from "../admins/function";
import { additems } from "./function";
import { getCategories } from "../categories/function";
class AddItems extends Component {
    state = {
        name: "",
        description: "",
        price: "",
        status: "",
        category_id: "",
        categories: [],
        photo: "",
        // validation
        validateName: "",
        validateDescription: "",
        validateprice: "",
        validatestatus: "",
        validateCategory: "",

        photoRequire: "",
        photoType: "",
        photoSize: "",
        success: "",
        error: ""
    };
    componentDidMount() {
        /// getCategories ////
        getCategories().then(res => {
            this.setState({
                categories: res.data.Category.data
            });
        });
        /// get token////
        getToken().then(res => {
            this.setState({
                admin_id: res.data.id
            });
        });
    }
    /////////// photo empty after add /////////////////////////////////
    inputRef = React.createRef();
    //////// ///////////////////////// validation ////////////////////////////
    validateName = () => {
        let validateName = "";
        if (this.state.name.length < 4) {
            validateName = "you shold enter at least 4 characters";
        }
        if (validateName) {
            this.setState({
                validateName
            });
        } else {
            this.setState({
                validateName: ""
            });
        }
    };
    validateDescription = () => {
        let validateDescription = "";
        if (this.state.description.length < 4) {
            validateDescription = "you shold enter at least 4 characters";
        }
        if (validateDescription) {
            this.setState({
                validateDescription
            });
        } else {
            this.setState({
                validateDescription: ""
            });
        }
    };
    validateprice = () => {
        let validateprice = "";
        if (!this.state.price) {
            validateprice = "you shold enter price";
        }
        if (validateprice) {
            this.setState({
                validateprice
            });
        } else {
            this.setState({
                validateprice: ""
            });
        }
    };
    validatestatus = () => {
        let validatestatus = "";
        if (!this.state.status) {
            validatestatus = "you shold enter status";
        }
        if (validatestatus) {
            this.setState({
                validatestatus
            });
        } else {
            this.setState({
                validatestatus: ""
            });
        }
    };
    validateCategory = () => {
        let validateCategory = "";
        if (!this.state.category_id) {
            validateCategory = "you shold enter category";
        }
        if (validateCategory) {
            this.setState({
                validateCategory
            });
        } else {
            this.setState({
                validatestatus: ""
            });
        }
    };
    photoRequire = () => {
        let photoRequire = "";
        if (!this.state.photo) {
            photoRequire = "you shold select image";
        }
        if (photoRequire) {
            this.setState({
                photoRequire
            });
        } else {
            this.setState({
                photoRequire: ""
            });
        }
    };
    photoType = () => {
        let photoType = "";
        if (
            this.state.photo.type !== "image/jpeg" &&
            this.state.photo.type !== "image/jpeg" &&
            this.state.photo.type !== "image/jpeg" &&
            this.state.photo.type !== "image/png"
        ) {
            photoType = "You Shold select Image (jpeg or jpg or png)";
        }
        if (photoType) {
            this.setState({
                photoType
            });
        } else {
            this.setState({
                photoType: ""
            });
        }
    };
    photoSize = () => {
        let photoSize = "";
        if (!this.state.photo.size > 14048) {
            photoSize = "You Shold select Image Less Than 14M";
        }
        if (photoSize) {
            this.setState({
                photoSize
            });
        } else {
            this.setState({
                photoSize: ""
            });
        }
    };
    /////////////////////////// ////////////////// End validation ///////////////////////////////////////
    changeState = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    changeStatePhoto = e => {
        this.setState({
            photo: e.target.files[0]
        });
    };
    submitState = e => {
        e.preventDefault();
        // validation
        this.validateName();
        this.validateDescription();
        this.validateprice();
        this.validatestatus();
        this.validateCategory();
        this.photoRequire();
        this.photoSize();
        this.photoType();
        //end validation

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("price", this.state.price);
        formData.append("status", this.state.status);
        formData.append("photo", this.state.photo);
        formData.append("category_id", this.state.category_id);

        const admin_id = this.state.admin_id;

        additems(admin_id, formData).then(res => {
            if (res.data.status == "1") {
                this.inputRef.current.value = "";
                this.setState({
                    success: " Add Successeflly ",
                    name: "",
                    description: "",
                    price: "",
                    status: "",
                    category_id: "",
                    photo: ""
                });
            } else {
                this.setState({
                    error: "Have one error"
                });
            }
        });
    };
    render() {
        const success = (
            <div className="alert alert-success"> {this.state.success} </div>
        );
        const error = (
            <div
                className="alert alert-danger danger"
                style={{ marginTop: "22px" }}
            >
                {this.state.error}
            </div>
        );
        return (
            <div className="container">
                {this.state.success ? success : this.state.error ? error : null}
                <div
                    className="card text-white bg-dark mb-3 card_login"
                    style={{ width: "18rem" }}
                >
                    <div className="card-header text-center">Add Items</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
                            <div className="form-group">
                                <label id="exampleInputEmail1">
                                    Name address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.validateName}
                                </small>
                            </div>
                            <div className="form-group">
                                <label id="exampleInputPassword1">
                                    description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputdescription1"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.validateDescription}
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputdescription1">
                                    status
                                </label>
                                <select
                                    type="text"
                                    className="form-control"
                                    id="exampleInputdescription1"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.changeState}
                                >
                                    <option value="">...</option>
                                    <option value="1">new</option>
                                    <option value="2">used</option>
                                </select>
                                <small style={{ color: "red" }}>
                                    {this.state.validatestatus}
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputdescription1">
                                    Categories
                                </label>
                                <select
                                    type="text"
                                    className="form-control"
                                    id="exampleInputdescription1"
                                    name="category_id"
                                    value={this.state.category_id}
                                    onChange={this.changeState}
                                >
                                    <option value="0">-----</option>
                                    {this.state.categories.map(category => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label id="exampleInputPassword1">price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputdescription1"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.validateprice}
                                </small>
                            </div>
                            <div className="form-group">
                                <label id="exampleInputPassword1">photo</label>
                                <input
                                    ref={this.inputRef}
                                    type="file"
                                    className="form-control"
                                    id="exampleInputdescription1"
                                    name="photo"
                                    onChange={this.changeStatePhoto}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.photoRequire}
                                </small>
                                <br />
                                <small style={{ color: "red" }}>
                                    {this.state.photoType}
                                </small>
                                <br />
                                <small style={{ color: "red" }}>
                                    {this.state.photoSize}
                                </small>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Add Item
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddItems;
