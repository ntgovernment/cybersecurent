$( document ).ready(function() {
    setTimeout(function() {
        $('.lightbox .lb-data a.lb-close, .lightbox .lb-container a.lb-cancel').removeClass('external');
      }, 200);

    $('.ntg-image-gallery .img-thumbnail').each(function() {
        var $image = $(this);
        var img = new Image();
        img.src = $image.attr('src');
        
        img.onload = function() {
            if (img.height > img.width) {
                $image.addClass('portrait-image');
            }
        };
    });
});