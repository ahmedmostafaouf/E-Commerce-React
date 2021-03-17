import React, { Component } from "react";
import { addcategory } from "./function";
class AddCategory extends Component {
    state = {
        name: "",
        description: "",
        photo: "",
        // validation
        success: "",
        error: "",
        validateName: "",
        validateDescription: "",
        photoRequire: "",
        photoType: "",
        photoSize: ""
    };
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
        if (this.state.descriptionlength < 4) {
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
    submitState = e => {
        e.preventDefault();
        // validation
        this.validateName();
        this.validateDescription();
        this.photoRequire();
        this.photoSize();
        this.photoType();
        //end validation

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("photo", this.state.photo);
        addcategory(formData).then(res => {
            this.inputRef.current.value = "";
            if (res.data.status == 1) {
                this.setState({
                    success: "Add Successfully",
                    name: "",
                    description: "",
                    photo: ""
                });
            } else {
                this.setState({
                    error: "Somthing Wrong"
                });
            }
        });
    };
    render() {
        const success = (
            <div className="alert alert-success"> {this.state.success} </div>
        );
        const error = (
            <div className="alert alert-danger"> {this.state.error} </div>
        );
        return (
            <div className="container">
                {this.state.success ? success : this.state.error ? error : null}
                <div
                    className="card text-white bg-dark mb-3 card_login"
                    style={{ width: "18rem" }}
                >
                    <div className="card-header text-center">Add Category</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
                            <div className="form-group">
                                <label id="exampleInputName">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="namelHelp"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.changeState}
                                />
                                <small style={{ color: "red" }}>
                                    {this.state.validateName}
                                </small>
                            </div>
                            <div className="form-group">
                                <label id="exampleInputDescription">
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
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddCategory;
