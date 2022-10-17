// When the user scrolls the page, execute myFunction
window.onscroll = function() {scrollFade()};

window.onload = function() {startUp()};

// Get the offset position of the navbar
//var sticky = header.offsetTop;

var pageHeader = null;

var pageHeaderText = null;

function startUp() {

    pageHeader = document.querySelector('#myHeader');
    pageHeaderText = pageHeader.querySelector('#headerText');

    console.log(pageHeader);
    console.log(pageHeaderText);
}   

function scrollFade() {
    
    var scrollTop = $(this).scrollTop();
    
    $('.fadeOnScroll').css({
        opacity: function() {
            var elementHeight = $(this).height(),
            opacity = (((elementHeight - scrollTop) / elementHeight));
            
            return opacity;
        }
    });
    
    pageHeaderText.innerHTML = "Current Scroll Value From Top: " + (scrollTop);

}

