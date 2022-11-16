package routes

import (
	"github.com/gin-gonic/gin"
	controller "backend/controllers"
)

func LoadRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.GET("/load", controller.Getloadstatus)
}