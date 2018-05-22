$(document).ready(function () {
    $(".top_banner").mousemove(function (e) {
        var moveX = (e.pageX * -1 / 25);
        var moveY = (e.pageY * -1 / 25);
        $(this).css("background-position", moveX + "px " + moveY + "px");
    });

    $('.jcarousel').jcarousel();
    $(".slider_el_left").click(function() {
        $('.jcarousel').jcarousel('scroll', '-=1');
    });
    $(".slider_el_right").click(function() {
        $('.jcarousel').jcarousel('scroll', '+=1');
    });
});