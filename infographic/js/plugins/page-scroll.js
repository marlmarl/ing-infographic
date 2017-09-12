    /*PAGE SCROLL from Agency Start Bootstrap Template - modified*/

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 1)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });