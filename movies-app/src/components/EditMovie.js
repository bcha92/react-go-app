import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./EditMovie.css";

// Boostrap // React-Confirm Alert
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Sub Components
import Input from "./form-components/Input";
import Alert from "./ui-components/Alert";

export default class EditMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                rating: "",
                description: "",
            },
            mpaaOptions: [
                "G", "PG", "PG13", "M17", "R"
            ],
            isLoaded: false,
            error: null,
            errors: [],
            alert: {
                type: "d-none",
                message: "",
            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = evt => {
        evt.preventDefault();

        // client side validation
        let errors = [];
        if (this.state.movie.title === "") {
            errors.push("title");
        }
        this.setState({ errors: errors });
        if (errors.length > 0) {
            return false; // Returns false when errors detected
        }

        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());
        console.log(payload);

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload)
        }

        fetch("http://localhost:4000/v1/admin/editmove", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        alert: { type: "alert-danger", mesasge: data.error.message }
                    })
                } else {
                    this.props.history.push({
                        pathname: "/admin",
                    });
                }
            });
    }

    handleChange = evt => {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState(prevState => ({
            movie: {
                ...prevState.movie,
                [name]: value,
            }
        }))
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id > 0) {
            fetch("http://localhost:4000/v1/movie/" + id)
                .then(response => {
                    if (response.status !== 200) {
                        let err = Error;
                        err.Message = "Invalid response code: " + response.status;
                        this.setState({ error: err });
                    }
                    return response.json();
                })
                .then(json => {
                    const releaseDate = new Date(json.movie.release_date);

                    this.setState({
                        movie: {
                            id: id,
                            title: json.movie.title,
                            release_date: releaseDate.toISOString().split("T")[0],
                            runtime: json.movie.runtime,
                            mpaa_rating: json.movie.mpaa_rating,
                            rating: json.movie.rating,
                            description: json.movie.description,
                        },
                        isLoaded: true
                    },
                    error => {
                        this.setState({
                            isLoaded: true,
                            error,
                        })
                    })
                })
        } else {
            this.setState({ isLoaded: true });
        }
    }

    confirmDelete = e => {
        confirmAlert({
            title: "Delete Movie?",
            message: "Are you sure?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        fetch("http://localhost:4000/v1/admin/deletemovie/" + this.state.movie.id, { method: "GET" })
                            .then(response => response.json())
                            .then(data => {
                                if (data.error) {
                                    this.setState({
                                        alert: { type: "alert-danger", message: data.error.message }
                                    })
                                } else {
                                    this.props.history.push({
                                        pathname: "/admin",
                                    })
                                }
                            })
                    }
                },
                {
                    label: "No",
                    onClick: () => {}
                }
            ]
        });
    }

    render() {
        let { movie, isLoaded, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return(
                <Fragment>
                    <h2>Add/Edit Movie</h2>

                    <Alert
                        alertType={this.state.alert.type}
                        alertMessage={this.state.alert.message}
                    />

                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            type="hidden"
                            title="ID"
                            name="id"
                            value={movie.id}
                            onChange={this.handleChange}
                        />
    
                        <Input
                            type="text"
                            title="Title"
                            // className={this.hasError("title") ? "is-invalid" : ""}
                            name="title"
                            value={movie.title}
                            handleChange={this.handleChange}
                            // errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                            // errorMsg="Please enter a title"
                        />
    
                        <Input
                            type="date"
                            title="Release Date"
                            name="release_date"
                            value={movie.release_date}
                            handleChange={this.handleChange}
                        />
    
                        <Input
                            type="text"
                            title="Runtime"
                            name="runtime"
                            value={movie.runtime}
                            handleChange={this.handleChange}
                        />
    
                        <Input
                            type="select"
                            mpaa={this.state.mpaaOptions}
                            title="MPAA Rating"
                            name="mpaa_rating"
                            value={movie.mpaa_rating}
                            handleChange={this.handleChange}
                        />
    
                        <Input
                            type="text"
                            title="Rating"
                            name="rating"
                            value={movie.rating}
                            handleChange={this.handleChange}
                        />
    
                        <Input
                            type="textarea"
                            title="Description"
                            name="description"
                            value={movie.description}
                            handleChange={this.handleChange}
                        />
    
                        <hr />
                        <button className="btn btn-primary">Save</button>
                        <Link to="/admin" className="btn btn-warning ms1">
                            Cancel
                        </Link>
                        {movie.id > 0 && (
                            <a href="#!" onClick={() => this.confirmDelete()}
                                className="btn btn-danger ms-1"
                            >Delete</a>
                        )}
                    </form>
                </Fragment>
            )
        }
    }
}