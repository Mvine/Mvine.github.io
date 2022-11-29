

var overlay = document.querySelector(".overlay");
const countryButtons = document.querySelectorAll("img[class=team-country_icon]");

countryButtons.forEach(element => {
    element.addEventListener("click", showTeamOnClick)
    
});

overlay.addEventListener("click", disableTeamOverlay)

function showTeamOnClick(){
    var countryName = this.parentElement.id;

    overlay.innerHTML =
    `
    <img class= "team-image_roster prevent-select" src= "images/roster-${countryName}.png" alt="${countryName} roster">
    <h2>Team ${capitalizeFirstLetter(countryName)} </h2>  
    
    `
    overlay.style.display = "flex";
}

function disableTeamOverlay(){

    overlay.style.display = "none";
    overlay.innerHTML = "";

}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}