package models


// the Link model
type Link struct {
	Total    int  	 					 `json:"Total"`
	Up			 int 		 					 `json:"up"`
	Down		 int 		 					 `json:"down"`
	Elapsed  float64     			 `json:"elapsed`
}

// Loading information
type Load struct {
	Total     int  	 `json:"Total"`
	Current		int 	 `json:"current"`
}

