// Router Handler
package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	// HTTP Routes
	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getOneMovie)
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMoviesByGenre)

	router.HandlerFunc(http.MethodGet, "/v1/genres", app.getAllGenres)

	router.HandlerFunc(http.MethodPost, "/v1/admin/editmove", app.editMovie)
	router.HandlerFunc(http.MethodDelete, "/v1/admin/deletemovie/:id", app.deleteMovie)

	return app.enableCORS(router)
}
