package controllers

import (
	"testing"
	"net/http"
	"net/http/httptest"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// Testing Get controller for load status
func TestGetloadstatus(t *testing.T) {
	var mockResponse = `[
    {
        "Total": 0,
        "current": 0
    }
]`
	router  := gin.Default()
	router.GET("/healthcheck", Getloadstatus)
	w := httptest.NewRecorder()
	
	req, _  := http.NewRequest(http.MethodGet, "/healthcheck", nil)
	router.ServeHTTP(w, req)
	// Assertion
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, mockResponse, w.Body.String())
	t.Logf("passed")
}

// Testing Get controller for load status
func TestGetfiles(t *testing.T) {
	var mockResponse = `[
    {
        "Total": 0,
        "up": 0,
        "down": 0,
        "Elapsed": 0
    }
]`
	router  := gin.Default()
	router.GET("/healthcheck2", Getfiles)
	w := httptest.NewRecorder()
	
	req, _  := http.NewRequest(http.MethodGet, "/healthcheck2", nil)
	router.ServeHTTP(w, req)
	// Assertion
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, mockResponse, w.Body.String())
	t.Logf("passed")
}
