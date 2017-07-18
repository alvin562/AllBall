//TODO
//  -- CREATE MORE FUNCTIONS

$(document).ready(function(){

    $("#arrow").click(function(){

        $('#home-content').addClass('animated slideOutUp');
        $('#chat-page').css('display', 'block');
        $('#chat-page').addClass('animated slideInUp');
        $('.home-page').removeClass('home-page')
    });

    $("#chat-page").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {

        $("#chat-header").css('box-shadow', '0 0 15px rgba(0,0,0,0.8)');

        $("#masthead").addClass("animated slideInDown");
        $("#masthead").css('visibility', 'visible');

        $("h3").addClass("animated slideInDown");
        $("h3").css('visibility', 'visible');

        $("h4").addClass("animated slideInDown");
        $("h4").css('visibility', 'visible');
    });


    $('button').hover(function() {
        $(this).css('background-color', 'white');
        $(this).css('border', '1px solid white');
        $('.fa-paper-plane').css('color', 'black');
    }, function() {
        $(this).css('background-color', '#B9461A');
        $(this).css('border', '1px solid #B9461A');
        $('.fa-paper-plane').css('color', 'white');
    });
});
