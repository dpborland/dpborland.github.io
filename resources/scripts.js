/*function makeRequest() {
	var request = gapi.client.
}*/

/*function init() {
	gapi.client.setApiKey("AIzaSyATgL3tMkSMO-HyenXy9DV-_zrBda073b0");
	gapi.client.load("civicinfo", "v2").then(makeRequest);
}*/




//Search value
var addressToSearch = document.getElementById("address");

function jsonpCall(data) {
   return console.log(data);
}


var script = document.createElement('script');
script.src = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyATgL3tMkSMO-HyenXy9DV-_zrBda073b0&address=4151%20n%20Ashland%20ave%20chicago%20il?callback=jsonpCall";

document.getElementsByTagName('head')[0].appendChild(script);


//Function that runs on address submission
/*function submitAddress() {
    var urlAdd = addressToSearch.value.replace(/ /g, "%20");

    var repSearch = new XMLHttpRequest();
    repSearch.open("GET", "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyATgL3tMkSMO-HyenXy9DV-_zrBda073b0&address=" + urlAdd, true);
    repSearch.send();
    alert(repSearch);



}*/

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

}

//Event listeners
magGlass[0].addEventListener("click", bgTransition, false);
search.addEventListener("submit", bgTransition, false);


