package helper

import (
	"fmt"
	"net/http"
	"strings"
	"time"
)

// check if a link is up or down.
func Checklink(input string) bool{
	link := Checkhttp(input)
	// set 50 second timeout if cannot find the website
	// heroku takes 30-40 second to start.
	client := http.Client{
    Timeout: 50 * time.Second,
	}
	client.Get(link)
  resp, err := client.Get(link)
  if err != nil {
		res:= fmt.Sprintf("The link %s is down with error message: %s", link, err)
		fmt.Println(res)
		return false
  } else {
		res:= fmt.Sprintf("The link %s is up! with status code %d", link, resp.StatusCode)
		fmt.Println(res)
		return true
	}
}

// checking if a link contains http(s) infront, if not return an appended string.
func Checkhttp(input string) string {
	if strings.Index(input, "http://") == 0 || strings.Index(input, "https://") == 0 {
		return input
		} else {
		return "https://" + input
	}
}

// counting the total number of records in the .csv file
func Totalcount(records [][]string) int{
	Total := 0
  for range records {
		Total += 1
	}
	return Total
}