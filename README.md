# Solution Engineer


## Personal Information

Please provide all information in English..

|  |  |
| --- | --- |
| **⚠️ First Name:** | `Kandanai` |
| **⚠️ Last Name:** | `Leenutaphong` |
| **⚠️ Email:** | `mew.chayutaphong@gmail.com` |
| **⚠️ Phone Number:** | `+66844649944` |

## User Instructions

### Cloning repository
First, clone the repository and cd into it.

```
git clone git@github.com:LINE-TH-Recruitment/solution-engineer-edsml-kl121.git
cd solution-engineer-edsml-kl121
```

### Building with dockers
First, build the docker file through the docker-compose.yml file. This will run the Dockerfile(s) inside the frontend and backend repository. Use the command:

```
docker-compose up --force-recreate --build -d
```

Once, the build is successful turn on the server by doing:

```
docker-compose up
```

When the server is up, access the server at
```
http://localhost:3000/
```
### opening server separately incase docker does not work
**⚠️** if the docker method does not work then you can run the front end and back end locally in two different terminals.
Locate into backend
```
cd backend
```
and do
```
go run main.go
```
Locate to frontend
```
cd frontend
```
then do
```
npm start
```
When the server is up, access the server at
```
http://localhost:3000/
```



## What we are looking for

* Clarity: You can write clear code that any devs could read and understand in one go
* Simplicity: You can write gimmick-free and straightforward code with no ambiguities
* Defensiveness: You can cover edge cases and treat user inputs with care
* Resilience: You can gracefully handle an error and unexpected behavior


## Overview

Implement a website that can upload the list of websites as a CSV file. The service will check all of those websites' availability and show their status in the UI. See the flow & design below.

![c342339565cbdedcf65aa65b74999c11](https://user-images.githubusercontent.com/4660719/182761148-06365bac-41d2-4d0c-b366-ba15076226c0.png)


## General requirements

* Up-and-Running the application with container
* Provide instruction to run your services in README.md file
* Ensure reproducible build and run on a local machine
* Separate backend and frontend
* Can find the example of the CSV file [here](https://gist.github.com/pangaunn/028f99cf5f7e7fcdaf575dfdccba7cd5)


## Frontend requirements

* Implement UI component for uploading a CSV file
* Implement uploading file functionality
* Render the response resulting from API
* Can use any frontend frameworks and any CSS frameworks
* Can find the design in detail on Figma [here](https://www.figma.com/file/b85ivW9iddCv1eV7D0uF2g/Assignment?node-id=0%3A1)


### Frontend Bonus

* If you validate the input
* If your progress bar shows a calculation between uploading time and processing time
* If you can make drag and drop work properly
* If you come up with some frontend tests


## Backend requirements

* Must be written in Golang
* Check website available with net/http package
* Up: only http status code 200
* Down: cannot reach the website (request timeout and not found)
* Handle errors without stopping the entire process
* Write readable code
* Write automated unit tests
* Run program as fast as possible on multi-core CPU


### Backend Bonus

* If you have a good package structure
* If you can handle a vast file

