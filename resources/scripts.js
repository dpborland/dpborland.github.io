var addressToSearch = document.getElementById("address");
var queryResponse;

function makeRequest() {
	var request = gapi.client.civicinfo.representatives.representativeInfoByAddress({ 'address': addressToSearch.value});
	request.then(function(response) {
    queryResponse = response;
    console.log(response["offices"]);
	});
}

function init() {
	gapi.client.setApiKey("AIzaSyCQf4AAV6Tmu4dRq7xAIr1lngMQBFvslco");
	gapi.client.load("civicinfo", "v2").then(function() { 
		console.log("loaded"); 
	});
}


//Elements that event listeners will be added to
var magGlass = document.getElementsByClassName("magGlass");
var search = document.getElementById("addressSearch");

//Dom maniputlation on submit query/mag glass click
function bgTransition() {

//Variables
   var html = document.getElementsByTagName("HTML")[0];
   var subTitle = document.getElementsByTagName("H2")[0];
   var title = document.getElementsByClassName("title")[0];
   var searchAddress = document.getElementsByClassName("addressSearch")[0];
   var container = document.getElementById("container");
   var cityIcon = document.getElementsByClassName("cityIcon")[0];
   var space = document.getElementsByClassName("space")[0];
   var nav = document.getElementsByClassName("navWrap")[0];

//Change background
   html.className += "cityBackground";

//Remove elements  
   container.removeChild(title);
   container.removeChild(searchAddress);
   container.removeChild(subTitle);
   container.removeChild(cityIcon);

//Adjusts container div
   container.className = "blueTrans";
   container.style.transition = "background 1.0s ease-in 0s, min-width 1s, min-height 1s";

//Adds nav and space boxes
   nav.style.minHeight = "10%";
   nav.style.transition = "min-height 1s ease-out 0.2s";
   space.style.minHeight = "10%";
   space.style.transition = "min-height 1s ease-in";
//Display Nav elements

//Run submit func
  makeRequest();

}

//Event listeners
magGlass[0].addEventListener("click", bgTransition, false);
search.addEventListener("submit", bgTransition, false);


