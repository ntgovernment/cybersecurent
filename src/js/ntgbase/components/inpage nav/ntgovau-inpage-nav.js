//// IN PAGE NAV ////

$(document).ready(function() {
    initInPageNav(); 
});

function initInPageNav() {
    if ($('[data-component="ntg-inpage-nav"]').length) {
        
        //Render H2s (or any heading with ".inpage-nav-item" class) into the list 
        var target_list = $('ul.ntg-inpage-nav');
        
        if ($('h2').length) {
            $(target_list).append('<li class="nav-item heading">On this page</li>');
        }
        
        $("h2:not(.accordion-header)").each(function () {
            
            var anchorName = $(this).text().replace(/\W/gi, "-").toLowerCase();
            
            $(this).attr('id', anchorName);
            $(this).addClass('scroll-point');
            $(target_list).append('<li class="nav-item" data-anchor-name=' + anchorName + '><a class="nav-link ps-0 pb-0" href="#' + anchorName + '">' + $(this).text() + '</a></li>');
        });
        
    }
}
