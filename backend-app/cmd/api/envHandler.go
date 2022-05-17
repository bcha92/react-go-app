package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Load Postgres .env variables // godotenv package load
func envVar(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}
