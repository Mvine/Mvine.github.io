// When the user scrolls the page, execute myFunction
window.onscroll = function() {scrollUpdate()};

window.onload = function() {startUp()};

var pageHeader = null;
var pageHeaderText = null;

function startUp() {

}   

function scrollUpdate() {
    
    var scrollTop = $(this).scrollTop();
    
    $('.fadeOnScroll').css({
        opacity: function(buffer = 0.0) {
            var elementHeight = $(this).height(),
            opacity = (((elementHeight - scrollTop) / elementHeight));
            
            return opacity;
        }
    });
    

    var $el = $('.fixedElement'); 

    var isPositionFixed = ($el.css('position') == 'fixed');
    var isVisible = !($el.css('display') == 'contents');

    if (scrollTop > 800 && !isPositionFixed){ 
      $el.css({'display': 'block', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)'}); 
    }
    if (scrollTop < 800 && isPositionFixed){
      $el.css({'display': 'block','position': 'static', 'align': 'center', 'transform': 'translate(0%, 0%)'}); 
    } 
    else if (scrollTop > 3200 && isPositionFixed){
      $el.css({'display': 'contents' });
    }
    else if (scrollTop < 3200 && isPositionFixed && !isVisible){
        $el.css({'display': 'block', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)'}); 
    }

    var $el = $('.heroText'); 

    var scrollMod = scrollTop / 1000;
    var elementHeight = $(this).height();

    if ($(this).scrollTop() > 700){
        $el.css({'background-image': 'url(images/heroBG.png)', 'background-position-y': (scrollMod - scrollTop) + 700});
    }
}