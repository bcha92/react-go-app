// Movie Handlers
package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

// Get One Movie by ID
func (app *application) getOneMovie(w http.ResponseWriter, r *http.Request) {
	// Gets movie params by id
	params := httprouter.ParamsFromContext(r.Context())
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id paramter"))
		app.errorJSON(w, err)
		return
	}

	movie, err := app.models.DB.Get(id)
	err = app.writeJSON(w, http.StatusOK, movie, "movie")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) errorJSON(w http.ResponseWriter, err error) {
	type jsonError struct {
		Message string `json:"message"`
	}

	theError := jsonError{
		Message: err.Error(),
	}

	app.writeJSON(w, http.StatusBadRequest, theError, "error")
}

func (app *application) getAllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := app.models.DB.All()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) deleteMovie(w http.ResponseWriter, r *http.Request) {
	//
}

func (app *application) insertMovie(w http.ResponseWriter, r *http.Request) {
	//
}

func (app *application) updateMovie(w http.ResponseWriter, r *http.Request) {
	//
}

func (app *application) searchMovies(w http.ResponseWriter, r *http.Request) {
	//
}
