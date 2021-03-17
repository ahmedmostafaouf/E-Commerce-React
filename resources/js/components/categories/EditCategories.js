import React, { Component } from "react";
import { additems, updatecategories } from "./function";
import { editcategories } from "./function";

class EditCategories extends Component {
    state = {
        id: "",
        name: "",
        description: "",
        photo: "",
        // validation
        validateName: "",
        validateDescription: "",
        photoRequire: "",
        photoType: "",
        photoSize: "",
        success: ""
    };
    componentDidMount() {
        // بعرف ال id
        const id = this.props.match.params.id;
        editcategories(id).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.name,
                description: res.data.description,
                photo: res.data.photo
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
        this.photoRequire();

        //end validation

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("photo", this.state.photo);

        const id = this.props.match.params.id;
        updatecategories(id, formData).then(res => {
            if (res.status == 200) {
                this.inputRef.current.value = "";
                this.setState({
                    success: " update Successeflly ",
                    name: "",
                    description: "",
                    photo: ""
                });
                this.props.history.push("/categories");
            }
        });
    };
    render() {
        const success = (
            <div className="alert alert-success"> {this.state.success} </div>
        );
        return (
            <div className="container">
                {this.state.success ? success : null}
                <div
                    className="card text-white bg-dark mb-3 card_login"
                    style={{ width: "18rem" }}
                >
                    <div className="card-header text-center">Edit Category</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
                            <input
                                type="hidden"
                                name="id"
                                value={this.state.id}
                            />
                            <div className="form-group">
                                <label id="exampleInputEmail1">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputName"
                                    aria-describedby="nameHelp"
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
                                    Description
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
                                <br />
                                <small style={{ color: "red" }}>
                                    {this.state.photoType}
                                </small>
                                <br />
                                <small style={{ color: "red" }}>
                                    {this.state.photoSize}
                                </small>

                                <br />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Edit Category
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditCategories;
