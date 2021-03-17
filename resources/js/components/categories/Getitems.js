import React, { Component } from "react";
import { getitem } from "./function";
import "./category.css";
class Getitems extends Component {
    state = {
        items: []
    };
    componentDidMount() {
        const id = this.props.match.params.id;
        getitem(id).then(res => {
            this.setState({
                items: res.data.Items
            });
        });
    }
    render() {
        return (
            <div className="container ">
                <br />
                {this.state.items.length ? (
                    <table className="table table-light">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">price</th>
                                <th scope="col">Photo</th>
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
                                            <img
                                                key={item.id}
                                                src={`assets/images/items/${item.photo}`}
                                                style={{
                                                    width: 160,
                                                    hight: 100
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <h2 className="text-center">There Is No Data</h2>
                )}
            </div>
        );
    }
}

export default Getitems;
