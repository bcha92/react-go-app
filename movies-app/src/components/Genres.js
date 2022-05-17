import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Genres extends Component {
    state = {
        genres: [],
        isLoaded: false,
        error: null,
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/v1/genres`) // fetch go backend
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
                    genres: json.genres,
                    isLoaded: true,
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
        const { genres, isLoaded, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (
                <Fragment>
                    <h2>Genres</h2>
    
                    <div>
                        {genres.map(m => (
                            <Link
                                key={m.id}
                                className="list-group-item list-group-item-action"
                                to={{
                                    pathname: `/genre/${m.id}`,
                                    genreName: m.genre_name,
                                }}>{m.genre_name}
                            </Link>
                        ))}
                    </div>
                </Fragment>
            );
        }
    }
}