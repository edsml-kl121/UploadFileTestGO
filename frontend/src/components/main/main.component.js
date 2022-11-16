import {useState, useEffect, useCallback } from "react";
import {useDropzone} from 'react-dropzone';
import csv from '../../images/csv.png';
import {Container} from 'react-bootstrap'
import axios from "axios";
import "./main.css"
import Result from "./helpercomponent/result.component.js";
import Loadingbar from "./helpercomponent/loadingbar.component.js";
import Orbutton from "./helpercomponent/orAndButton.component.js"
import {reactLocalStorage} from 'reactjs-localstorage';

function Main() {
  const [file, setFile] = useState("");
  const [filestatus, setFilestatus] = useState([{"Total": 0, "up": 0, "down": 0, "Elapsed": 0}])
  const [refreshData, setRefreshData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0);
  const formData = new FormData();
  let pass = false
  let load
  
  const getLoadingstatusHelper = async(url) => {
    return await  axios.get(url, {responseType: 'json'})
                  .then(response => {
                    if(response.status === 200){
                      setProgress(response.data[0]["current"] / response.data[0]["Total"] * 100)
                      console.log("loadingstatus: ", response.data)
                      if (response.data[0]["current"] !== response.data[0]["Total"]) {
                        reactLocalStorage.set('load', true);
                      } else {
                        reactLocalStorage.set('load', false);
                      }
                      console.log(response.data[0]["current"], response.data[0]["Total"])
                      console.log("loadinside", reactLocalStorage.get('load'))
                    }
                  })
    }

  // Get loading status
  const getLoadingstatus = () => {
    var url = "http://localhost:5000/load"
    getLoadingstatusHelper(url)
    .catch(error => {
        console.log(error);
      })
  }

  // calling the load api infinitely until the load is complete
  function infiniteLoad() {
      const loading_ = setInterval(() => {
        getLoadingstatus()
      }, 100);
      return loading_
  }

  // immediately run this when drop file
  const onDrop = useCallback(acceptedFiles => {
    reactLocalStorage.set('pass', false)
    if (loading || load) {
      alert("Please wait until the loading is complete before adding another file")
    } else {
      setFile(acceptedFiles[0])
      reactLocalStorage.set('file', acceptedFiles[0].path)
      if (acceptedFiles[0].path.includes("csv")){
        setLoading(true)
        load = true
        const interval = infiniteLoad()
        handleUpload(acceptedFiles[0], interval)
      } else {
        console.log('err');
        alert(acceptedFiles[0].path + " is not a csv file please upload a .csv file");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop});

  
  // Handles file upload event and updates state
  function handleUpload(event, interval) {
		formData.append('file', event);
    inspectFormData(formData)
    // Upload file to server
    postCSV(formData, interval)
  }

  // refreshes the window
  function refreshPage() {
    window.location.reload(false);
  }

  // Display the key/value pairs for checking
  function inspectFormData(formData) {
    console.log("inspecting form")
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  }

  // helper for the function below to get the file status
  const getFileResultHelper = async(url) => {
    return await axios.get(url, {responseType: 'json'})
                      .then(response => {
                          if(response.status === 200){
                            setFilestatus(response.data)
                          }
                      })
  }

  // Get File status
  const getFileResult = () => {
    var url = "http://localhost:5000/upload"
    getFileResultHelper(url)
    .catch(error => {
        console.log(error);
      })
  }


  // Posting .csv to backend
  function postCSV(formData, interval){
    var url = "http://localhost:5000/upload"
    axios.post(url, formData).then(response => {
        if(response.status === 200){
          console.log('successful')
          setLoading(false)
          load = false
          setRefreshData(true)
          clearInterval(interval)
          reactLocalStorage.set('pass', true)
          refreshPage();
        }
      })
      .catch(error => {
        console.log("upload failed")
        alert("upload failed: There is something wrong with the .csv file")
        console.log(error);
        load = false
        setLoading(false)
        reactLocalStorage.set('pass', true)
        clearInterval(interval)
        refreshPage();
      })
  }


  // gets run at initial loadup
  useEffect(() => {
    // If user decides to refresh page during the loading, redeclare the variable
    getLoadingstatus()
    console.log("smth", reactLocalStorage.get('load'))
    pass = reactLocalStorage.get('pass') === 'true'
    load = reactLocalStorage.get('load') === 'true' && !pass
    // still loading and not passed the post request
    if (!pass) {
      setLoading(load)
    }
    if (load) {
      console.log("loadoutside", load)
      setFile(reactLocalStorage.get('file'))
      setInterval(() => {
          refreshPage()
        }, 8000);
        setInterval(() => {
            getLoadingstatus()
          }, 100);
      setFile({path: reactLocalStorage.get('file')})
    }
    getFileResult();
  }, [])


  // refreshes the page
  if(refreshData){
    setRefreshData(false);
    getFileResult();
  }

  return (
    <Container>
    <div className="font-face-RB" style={{color:"#696D83", fontSize:"32px"}}>


      {/* Title  */}
      <p data-testid="main-1" className="Title">Websites Checker</p>


      {/* Dropzone */}
      <div {...getRootProps({ className: "dropzone" })} style={{marginTop:"0px"}}>
        <input className="input-zone" {...getInputProps()} />
        <img src={csv} alt="csv" width="100px"/>
          <div className="text-center">
            {isDragActive ? (
              <p className="dropzone-content">
                Release to drop the files here
              </p>
            ) : (
              <p data-testid="notdropping-1" className="dropzone-content">
                Drag your .csv file here to start uploading.
              </p>
            )}
          {/* Horizontal Line and Button*/}
          <Orbutton/>
          </div>
      </div>


      {/* Results if loaded */}
      {filestatus[0].Total!== 0 & !loading ? (
        <>
          <Result props={[file,filestatus[0]]}/>
        </>
      ) : (<></>)}


      {/* Loading interface */}
      {console.log(load,"inside bar")}
      {loading === true ? (
      <Loadingbar props={[file.path, progress]}/>
      ): (<></>)}
    </div>
    </Container>
  );
}

export default Main


