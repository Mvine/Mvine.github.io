// //This is the java script file

var banner = document.querySelector("#header");
banner.addEventListener("mouseenter", ChangeStyleLight);
banner.addEventListener("mouseleave", ChangeStyleTransparent);


const menuItems = document.querySelectorAll("li[class*=header-main_menu_item]");
for (let i = 0; i < menuItems.length; ++i) {
    const element = menuItems[i];
    element.addEventListener("mouseenter", showDecoration);
    element.addEventListener("mouseleave", hideDecoration)
}

const teamIcons = document.querySelectorAll("img[class=team-country_icon]");
for (let i = 0; i < teamIcons.length; ++i) {
    const element = teamIcons[i];
    element.addEventListener("mouseenter", inflateElement);
    element.addEventListener("mouseleave", defalteElement)
    element.addEventListener("click", showTeamOverlay);
}

function ChangeStyleLight() {
    this.classList.add('header-overlay');
}

function ChangeStyleTransparent() {
    this.classList.remove('header-overlay');
}

function showDecoration() {
    this.classList.add('header-active_decoration');

}

function hideDecoration() {
    this.classList.remove('header-active_decoration');
}

function inflateElement() {
    this.classList.add('inflated')
}

function defalteElement() {
    this.classList.remove('inflated')
}

function showTeamOverlay() {

}