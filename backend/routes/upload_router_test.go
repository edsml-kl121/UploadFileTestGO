package routes

import (
	"testing"
	"net/http"
	"net/http/httptest"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestUploadRoutes(t *testing.T) {
	var mockResponse = `[
    {
        "Total": 0,
        "up": 0,
        "down": 0,
        "Elapsed": 0
    }
]`
	router  := gin.Default()
	UploadRoutes(router)
	w := httptest.NewRecorder()
	
	req, _  := http.NewRequest(http.MethodGet, "/upload", nil)
	router.ServeHTTP(w, req)
	// Assertion
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, mockResponse, w.Body.String())
	t.Logf("passed")
}