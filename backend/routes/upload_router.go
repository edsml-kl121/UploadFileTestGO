package routes

import (
	"github.com/gin-gonic/gin"
	controller "backend/controllers"
)

func UploadRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.GET("/upload", controller.Getfiles)
	incomingRoutes.POST("/upload", controller.Uploadfile)
}