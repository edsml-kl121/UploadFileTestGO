package routes

import (
	"testing"
	"net/http"
	"net/http/httptest"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestLoadRoutes(t *testing.T) {
	var mockResponse = `[
    {
        "Total": 0,
        "current": 0
    }
]`
	router  := gin.Default()
	LoadRoutes(router)
	w := httptest.NewRecorder()
	
	req, _  := http.NewRequest(http.MethodGet, "/load", nil)
	router.ServeHTTP(w, req)
	// Assertion
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, mockResponse, w.Body.String())
	t.Logf("passed")
}