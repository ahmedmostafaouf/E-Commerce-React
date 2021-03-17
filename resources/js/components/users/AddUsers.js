import React, { Component } from "react";
import { Addusers } from "./function";
class AddUsers extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        photo: "",
        // validation
        validateName: "",
        validateemail: "",
        validatepassword: "",
        photoRequire: "",
        photoType: "",
        photoSize: "",
        success: "",
        error: ""
    };

    /////////// photo empty after add /////////////////////////////////
    inputRef = React.createRef();
    //////// ///////////////////////// validation ////////////////////////////
    validateName = () => {
        let validateName = "";
        if (this.state.name.length < 3) {
            validateName = "you shold enter at least 3 characters";
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
    validateemail = () => {
        let validateemail = "";
        if (!this.state.email) {
            validateemail = "you Should Enter Email";
        }
        if (validateemail) {
            this.setState({
                validateemail
            });
        } else {
            this.setState({
                validateemail: ""
            });
        }
    };
    validatepassword = () => {
        let validatepassword = "";
        if (!this.state.password) {
            validatepassword = "you shold enter password";
        }
        if (validatepassword) {
            this.setState({
                validatepassword
            });
        } else {
            this.setState({
                validatepassword: ""
            });
        }
    };
    photoRequire = () => {
        if (this.state.photo) {
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
        }
    };
    /////////////////////////// ////////////////// End validation ///////////////////////////////////////
    changeState = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    changeStatephoto = e => {
        this.setState({
            photo: e.target.files[0]
        });
    };
    submitState = e => {
        e.preventDefault();
        // validation
        this.validateName();
        this.validateemail();
        this.validatepassword();
        this.photoRequire();

        //end validation

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("photo", this.state.photo);

        Addusers(formData).then(res => {
            console.log(res);
            if (res.data.status == "1") {
                this.inputRef.current.value = "";
                this.setState({
                    success: " Add Successeflly ",
                    name: "",
                    email: "",
                    password: "",
                    photo: ""
                });
            } else {
                this.setState({
                    error: "Email Has been Tooken"
                });
            }
        });
    };
    render() {
        const success = (
            <div
                className="alert alert-success success"
                style={{ marginTop: "22px" }}
            >
                {this.state.success}
            </div>
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
                    className="card text-white bg-info mb-3 card_login"
                    style={{ width: "18rem" }}
                >
                    <div className="card-header text-center">Add Users</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
                            <div className="form-group">
                                <label id="exampleInpuname">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputname"
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
                                <label id="exampleInputemail">email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputemail1"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.validateemail}
                                </small>
                            </div>
                            <div className="form-group">
                                <label id="exampleInputPassword">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputpPassword"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.validatepassword}
                                </small>
                            </div>
                            <div className="form-group">
                                <label id="exampleInputphoto">photo</label>
                                <input
                                    ref={this.inputRef}
                                    type="file"
                                    className="form-control"
                                    id="exampleInputphoto"
                                    name="photo"
                                    onChange={this.changeStatephoto}
                                />
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
                                Add User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddUsers;
