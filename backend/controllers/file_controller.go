package controllers

import (
	"fmt"
	"net/http"
	"time"
	"log"
	"github.com/gin-gonic/gin"
	"encoding/csv"
	helper "backend/helper"
	models "backend/models"
)

var counter = 0

var links = []models.Link{
	{Total : 0, Up : 0, Down : 0, Elapsed : 0},
}

var loads = []models.Load{
	{Total : 0, Current: 0},
}


// getting list of files
func Getfiles(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, links)
}

// getting loading status
func Getloadstatus(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, loads)
}


// posting file and processing it.
func Uploadfile(c *gin.Context) {
	// Check uploaded file
	file, err := c.FormFile("file")
	if err != nil {
      fmt.Println("the error: ", err)
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"message": "No file is received",
			})
			return
	}
	// printing file name
  log.Println(file.Filename)

	// Open the CSV file
  csvfile, err := file.Open()
  if err != nil {
      log.Println(err.Error())
      c.Status(http.StatusUnprocessableEntity)
      return
  }
  defer csvfile.Close()

	// Reading the CSV file
  records, err := csv.NewReader(csvfile).ReadAll()
  if err != nil {
      log.Println(err.Error())
      c.Status(http.StatusUnprocessableEntity)
      return
  }

	// Parallel computing by breaking down the search into
	// first half and last half of the .csv
	c1_total := make(chan int)
	c1_up := make(chan int)
	c1_down := make(chan int)
	c1_elapsed := make(chan time.Duration)

	c2_total := make(chan int)
	c2_up := make(chan int)
	c2_down := make(chan int)
	c2_elapsed := make(chan time.Duration)

	loads = []models.Load{
		{Total : 0, Current: 0},
	}
	go Recordcounter(records[:len(records)/2], c1_total, c1_up, c1_down, c1_elapsed)
	go Recordcounter(records[len(records)/2:], c2_total, c2_up, c2_down, c2_elapsed)
	x_total, x_up, x_down, x_elapsed, y_total, y_up, y_down, y_elapsed := <-c1_total, <-c1_up, <-c1_down, <-c1_elapsed, <-c2_total, <-c2_up, <-c2_down, <-c2_elapsed // receive from c1 aND C2

	links = []models.Link{
		{Total : x_total + y_total, Up : x_up + y_up, Down: x_down + y_down, Elapsed: x_elapsed.Seconds() + y_elapsed.Seconds()},
	}

	c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
}


// Recording the number of ups and downs server and tracking of progress
func Recordcounter(records [][]string, c_total chan int, c_up chan int, c_down chan int, c_elapsed chan time.Duration){
	up := 0
	down := 0
	start := time.Now()
	counter = 0
	// current := 0
  for _, line := range records {
		if helper.Checklink(line[0]) {
				up += 1
			} else {
				down += 1
		}
		counter += 1
		loads = []models.Load{
			{Total : helper.Totalcount(records) * 2, Current: counter},
		}
		fmt.Println("step: ", counter, "/", helper.Totalcount(records) * 2)
	}
	elapsed := time.Since(start)
	c_total <- helper.Totalcount(records)
	c_up <- up
	c_down <- down
	c_elapsed <- elapsed
}



