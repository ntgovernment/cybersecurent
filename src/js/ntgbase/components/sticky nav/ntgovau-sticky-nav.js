$(document).ready(function () {
  initStickyNav();
  //hide stickynav if section doesn't exist
  var stickyNavItems = $(".ntg-sticky-nav__item");
  for (var i = 0; i < stickyNavItems.length; i++) {
    if ($("#" + stickyNavItems[i].dataset["navItemName"]).length == 0)
      $(stickyNavItems[i]).hide();
  }
});

function initStickyNav() {
  if ($('[data-component="ntg-sticky-nav"]').length) {
    // add class to scroll-point sections
    $("ul.ntg-sticky-nav li a").each(function () {
      var sectionContainerID = $(this).attr("href");

      if (
        sectionContainerID &&
        !sectionContainerID.startsWith("content_container")
      ) {
        $(sectionContainerID).addClass("scroll-point");
      }
    });

    var target_list = $("ul.ntg-sticky-nav");
    $("#content").addClass("no-target-outline");

    $(window)
      .scroll(function () {
        // Fix sticky nav position
        if ($("header").isInViewport()) {
          $("#content").removeClass("ntg-sticky-nav-active");
        } else {
          $("#content").addClass("ntg-sticky-nav-active");
        }

        var position = $(this).scrollTop() + 132; //position scrolled so far

        $(".scroll-point").each(function (i) {
          var target = $(this).closest("div").offset().top;
          var targetBot = target + $(this).closest("div").height();
          var id = $(this).attr("id");
          $(".ntg-sticky-nav__item[data-nav-item-name=" + id + "]").removeClass(
            "active"
          );
          if (position >= target && targetBot >= position) {
            $(".ntg-sticky-nav__item[data-nav-item-name=" + id + "]").addClass(
              "active"
            );
          }
        });
      })
      .scroll();

    // scroll to section based on URL hash
    $(target_list)
      .find('a[href^="#"]')
      .click(function (e) {
        $(target_list).find("li.active").removeClass("active");
        //$(target_list).addClass('page-is-animating');
        $(this).closest("li").addClass("active");
        $("html, body").animate(
          {
            scrollTop:
              $('[id="' + jQuery.attr(this, "href").substr(1) + '"]').offset()
                .top - 110,
          },
          50,
          function () {}
        );
        return;
      });
  }
}

// Check if element is in the required viewport
$.fn.isInViewport = function () {
  let introSection = $(".intro-section").outerHeight();
  let elementTop = $(this).offset().top + introSection;
  let elementBottom = elementTop + $(this).outerHeight();
  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};
