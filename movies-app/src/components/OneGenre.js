import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class OneGenre extends Component {
    state = {
        movies: {},
        isLoaded: false,
        error: null,
        genreName: "",
    }

    componentDidMount() {
        fetch("http://localhost:4000/v1/movies/" + this.props.match.params.id) // fetch go backend
            .then(response => {
                if (response.status !== "200") { // if status is not OK
                    let err = Error;
                    err.message = "Invalid response code: " + response.status;
                    this.setState({ error: err })
                }
                return response.json(); // return json
            })
            .then(json => {
                this.setState({
                    movies: json.movies,
                    isLoaded: true,
                    genreName: this.props.location.genreName,
                },
                error => { // error catch
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
            });
    }

    render() {
        let { movies, isLoaded, error, genreName } = this.state;

        if (!movies) { // Return empty array if none found
            movies = [];
        }

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (
                <Fragment>
                    <h2>Genre: {genreName}</h2>
    
                    <div className="list-group">
                        {movies.map(m => (
                            <Link
                                key={m.id}
                                to={`/movies/${m.id}`}
                                className="list-group-item list-group-item-action"
                            >{m.title}
                            </Link>
                        ))}
                    </div>
                </Fragment>
            );
        }
    }
}