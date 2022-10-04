// When the user scrolls the page, execute myFunction
window.onscroll = function() {scrollFade()};

// Get the header
var header = document.getElementById("myHeader");

console.log(header);

// Get the offset position of the navbar
//var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position

function scrollFade() {

    var pageHeader = header.getElementById("halpMe");

    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    console.log(scrollTop);
    console.log(pageHeader);
    pageHeader.innerHTML = "hi";

}

