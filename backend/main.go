package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    routes "backend/routes"
    "os"
)

func main() {
    port := os.Getenv("PORT")
    if port == "" {
      port = "5000"
    }
    router := gin.New()
    router.Use(gin.Logger())
    router.Use(cors.Default())
    routes.LoadRoutes(router)
    routes.UploadRoutes(router)
    router.Run(":" + port)
}

