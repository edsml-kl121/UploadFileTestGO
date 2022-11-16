package helper

import (
	"testing"
)


// test the Checkhttp function
func TestCheckhttp(t *testing.T) {
	result := Checkhttp("https://")
	if result != "https://" {
		t.Errorf("some error")
	} else {
		t.Logf("passed!")
	}
}

func TestCheckhttp2(t *testing.T) {
	result := Checkhttp("www.youtube.com")
	if result != "https://www.youtube.com" {
		t.Errorf("error: www.youtube.com is incorrectly translated")
	} else {
		t.Logf("passed!")
	}
}

// test Totalcount function
func TestTotalcount(t *testing.T) {
	records := [][]string{  
		{"one"},   /*  initializers for row indexed by 0 */
		{"two"},
		{"three"},
		{"four"},
	}
	result := Totalcount(records)
	if result != 4 {
		t.Errorf("error: something wrong with totalcount function")
	} else {
		t.Logf("passed!")
	}
}

// test Checklink function
func TestChecklink(t *testing.T) {
	link := "www.google.com"
	result := Checklink(link)
	if result != true {
		t.Errorf("error: something wrong with totalcount function")
	} else {
		t.Logf("passed!")
	}
}

// test Checklink function
func TestChecklink2(t *testing.T) {
	link := "https://www.instag777ram.com"
	result := Checklink(link)
	if result != false {
		t.Errorf("error: something wrong with totalcount function")
	} else {
		t.Logf("passed!")
	}
}