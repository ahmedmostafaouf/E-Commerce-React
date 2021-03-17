import React, { Component } from "react";
import { editUsers, UpdateUsers } from "./function";
class EditUsers extends Component {
    state = {
        name: "",
        email: "",
        photo: "",
        // validation
        validateName: "",
        validateemail: "",
        photoRequire: "",
        photoType: "",
        photoSize: "",
        success: "",
        error: ""
    };
    componentDidMount() {
        const id = this.props.match.params.id;
        editUsers(id).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.name,
                email: res.data.email,
                photo: res.data.photo
            });
        });
    }

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
        this.photoRequire();

        //end validation

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("photo", this.state.photo);

        const id = this.props.match.params.id;
        UpdateUsers(id, formData).then(res => {
            if (res.data.status == "1") {
                this.inputRef.current.value = "";
                this.setState({
                    success: " update Successeflly ",
                    name: "",
                    email: "",
                    photo: ""
                });
                this.props.history.push("/users");
            } else {
                this.setState({
                    error: ""
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
                    <div className="card-header text-center">Edit Users</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
                            <div className="form-group">
                                <label id="exampleInpuname">Name</label>
                                <input
                                    type="hidden"
                                    className="form-control"
                                    name="id"
                                    value={this.state.id}
                                />
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
                                Edit User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditUsers;
