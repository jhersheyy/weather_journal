/* Global Variables */
let baseURL = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let apiKey = '&units=imperial&appid=b3d41d6f6179531c20798bbcc36b4afd';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    //console.log("perform action: button is ok");
    let newZip =  document.getElementById('zip').value;
    let uContent = document.getElementById('feelings').value;
    getWeather(baseURL,newZip, apiKey) // no semicolon before .then
    .then(function(weatherData){
        //console.log('perform action weatherdata: ', weatherData);
        //console.log(' perform action to add: ', weatherData.main.temp, newDate, uContent); //weird date
        postData('/add', {temp: weatherData.main.temp, date: newDate, content: uContent})
    })
    .then(()=>
        updateUI()
    )
}
/*
// TODO-Chain your async functions to post an animal then GET the resulting data
const function performAction()
    const animalData = document.getElementById('animalData')
    .then(function(animalData){
        //postdata
        postData('/animal', animalData);
    })
    .then(function(){
        const retrievedData = await fetch(retrieveData('/all'))
    })
    ----------VS-----------
function performAction(e){
  const newAnimal =  document.getElementById('animal').value;
  const favFact =  document.getElementById('favorite').value;

  getAnimal('/animalData',)
  // New Syntax!
  .then(function(data){
    // Add data
    console.log(data);
    postData('/addAnimal', {animal:data.animal, fact: data.fact, fav:favFact} );
  })
  .then(
    updateUI()
  )
}
*/

const updateUI = async () => {
  const request = await fetch('/all');
  //console.log("updateUI REQUEST::: ", request.body);
  //retrieve data from our app
  //select the necessary elements on the DOM (index.html), 
  //update their necessary values to reflect the dynamic values for:
  //Temperature
  //Date
  //User input
  try{
    const allData = await request.json();
    //console.log("updateUI TRY allData: ", allData);
    document.getElementById('date').innerHTML = "DATE: " + allData.date;
    document.getElementById('temp').innerHTML = "TEMP: " + allData.temp;
    document.getElementById('content').innerHTML = "NOTE: "+ allData.content;
    //console.log('updateUI: json conversion win: ', allData);
  }catch(error){
    console.log("error", error);
  }
}


/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+key)
    try {
      const data = await res.json();
      //console.log("getWeather in try loop: ", data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

/* Function to POST data */
const postData = async ( url = '/add', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  })
    try {
      const newData = await response.json();
      //console.log("POST DATA IN TRY::: ", newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

/* Function to GET Project Data 
const retrieveData = async (url='/all') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json()
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};*/