$(document).ready(function () {
  $(
    "img.imagedropshadow, img.imagequarter, img.imagethird, img.imagehalf, img.imagefull"
  ).each(function () {
    dataToLightboxGallery(this);
  });

  function dataToLightboxGallery(el) {
    var altthis = $(el).attr("alt");
    var srcthis = $(el).attr("src");
    $(el).parent("a").attr({
      href: srcthis,
      "data-lightbox": "galery",
      "data-title": altthis,
    });
  }

  // Alert banner handle function
  function handleAlertBanner() {
    //Sitebanner close button on click function
    $(".ntg-sidewide-alert .close").on("click", function () {
      sessionStorage.setItem("site-alert-dismissed", true);
    });

    //Retrive session variable, check user's choice
    var isSiteAlertDismissed = sessionStorage.getItem("site-alert-dismissed");

    if (isSiteAlertDismissed == "true") {
      //Keep the alert dismissed
      $(".ntg-sidewide-alert").addClass("d-none");
    } //Show the alert
    else {
      $(".ntg-sidewide-alert").addClass("d-block");
    }
  }

  // Force external links to open in new window
  function externalLinksInNewWindow() {
    $("a:not(.no-link-check)")
      .not('[href*="mailto:"]')
      .each(function () {
        var isInternalLink = new RegExp("/" + window.location.host + "/");
        if (!isInternalLink.test(this.href)) {
          $(this).addClass("external");
        }
      });
    $("a.external").has("img").removeClass("external");
    $("a[href*='javascript']").removeClass("external");

    // remove external class from telephone number links
    $('a[href*="tel:"]').each(function () {
      $(this).removeClass("external");
    });
  }

  // Initialise sticky header plugin
  function initStickyHeader() {
    const header = document.querySelector(".page-header-container");
    var stickyHeader = new StickyHeader(header);

    stickyHeader.init();
  }

  // Initialise Superfish plugin
  function initSuperfish() {
    $("ul.sf-menu").superfish({
      // options
      delay: 250,
      speed: 250,
      speedOut: 250,
      cssArrows: false,
    });
  }

  function initMmenu() {
    const mmenuWrapper = document.getElementById("mmenu-wrapper");
    const pageHeader = document.getElementsByClassName(
      "page-header-container"
    )[0];

    if (!mmenuWrapper) {
      return false;
    }

    if (pageHeader.getAttribute("data-bs-theme")) {
      mmenuWrapper.setAttribute(
        "data-bs-theme",
        pageHeader.getAttribute("data-bs-theme")
      );
    }

    let btnContent = ``;
    let options = {
      offCanvas: {
        position: "right-front",
      },
    };

    if (
      mmenuWrapper.getAttribute("data-btn-link") &&
      mmenuWrapper.getAttribute("data-btn-text")
    ) {
      btnContent = `<a role="button" class="btn btn-light d-flex btn-mmenu" href="${mmenuWrapper.getAttribute(
        "data-btn-link"
      )}">${mmenuWrapper.getAttribute("data-btn-text")}</a>`;

      mmenuWrapper.removeAttribute("data-btn-link");
      mmenuWrapper.removeAttribute("data-btn-text");

      options["navbars"] = [
        {
          use: true,
          position: "bottom",
          content: btnContent,
        },
      ];
    }

    const mmenu = new Mmenu("#mmenu-wrapper", options);

    const API = mmenu.API;

    // closes the menu automatically if screen is resized above 992px
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 992px)").matches) {
        API.close();
      }
    });

    // inserts close button to navbars
    var panels = document.querySelector(".mm-panels");
    var close = document.createElement("a");
    close.setAttribute("class", "mm-btn mm-btn--close-wrapper mm-navbar__btn");
    close.setAttribute("aria-label", "Close menu");
    close.setAttribute("href", "#");
    close.innerHTML = `<div class="mm-btn--close">
                          <span class="top-line" aria-hidden="true"></span>
                          <span class="bot-line" aria-hidden="true"></span>
                      </div>
                      <span class="mm-btn--close__text">Close</span>`;
    close.addEventListener("click", function (e) {
      e.preventDefault();
      API.close();
    });
    panels.prepend(close);

    // inserts static links on first panel
    if (
      mmenuWrapper.getAttribute("data-link-urls") &&
      mmenuWrapper.getAttribute("data-link-texts")
    ) {
      var linkUrls = mmenuWrapper.getAttribute("data-link-urls").split(",");
      var linkTexts = mmenuWrapper.getAttribute("data-link-texts").split(",");

      var panelOne = document.getElementById("mm-1");
      var staticLinks = document.createElement("div");
      staticLinks.setAttribute("class", "mm-static-links");
      var linkContents = document.createElement("ul");

      if (linkUrls.length == linkTexts.length) {
        for (let i = 0; i < linkUrls.length; i++) {
          var url = linkUrls[i];
          var text = linkTexts[i];
          var item = document.createElement("li");
          item.innerHTML = `<a href="${url}">${text}</a>`;
          linkContents.append(item);
        }
      }

      staticLinks.append(linkContents);
      panelOne.append(staticLinks);

      mmenuWrapper.removeAttribute("data-link-urls");
      mmenuWrapper.removeAttribute("data-link-texts");
    }
  }

  function initSideNav() {
    var sideNavParents = document.querySelectorAll(".ntg-side-nav__collapser");
    if (!sideNavParents) {
      return false;
    }

    for (var i = 0; i < sideNavParents.length; i++) {
      sideNavParents[i].addEventListener("click", function (e) {
        e.preventDefault();

        var thisNext = this.parentElement.getElementsByClassName("collapse")[0];

        if (thisNext.classList.contains("show")) {
          thisNext.classList.remove("show");
          this.classList.add("collapsed");
        } else {
          thisNext.classList.add("show");
          this.classList.remove("collapsed");
        }
      });
    }
  }

  // dynamically add all h2 elements on the page into anchor list
  function initInPageNav() {
    var inPageNav = document.getElementById("in-page-nav");
    if (!inPageNav) {
      return false;
    }

    var list = inPageNav.querySelector("ul");
    document.querySelectorAll("#content h2").forEach(function (element, index) {
      if (index === 0) {
        return false;
      }

      var heading = element;
      if (element.querySelector("a")) {
        element = element.querySelector("a");
        heading = element.parentElement;
      }

      list.insertAdjacentHTML(
        "beforeend",
        '<li><a href="#' +
          element.innerText
            .replace(/&amp;/g, "and")
            .replace(/[^a-z0-9 ]/gi, "")
            .replace(/\s/g, "-")
            .toLowerCase() +
          '">' +
          element.innerText +
          "</a></li>"
      );
      element.setAttribute(
        "id",
        element.innerText
          .replace(/&amp;/g, "and")
          .replace(/[^a-z0-9 ]/gi, "")
          .replace(/\s/g, "-")
          .toLowerCase()
      );
    });
  }

  function initScrollToTop() {
    var backToTop = document.querySelector(".back-to-top");
    if (!backToTop) {
      return false;
    }
    console.log("running");

    var backToTopLink = backToTop.querySelector(".back-to-top button");
    var footer = document.querySelector(".ntg-footer");
    var isGoUpOn = false;
    var scrollHighSensor = 500;

    window.addEventListener("scroll", function () {
      buttonUpService(this);
      checkFooterPosition();
    });

    window.addEventListener("resize", function () {
      checkFooterPosition();
    });

    backToTopLink.addEventListener("click", function (e) {
      e.preventDefault();
      // workaround to ensure the focus is reset to the top of the page when using keyboard
      document.querySelector("header a").focus({ preventScroll: true });
      scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });

    // checks the scroll position of the page and determines whether the back to top button should be visible
    function buttonUpService() {
      if (!isGoUpOn) {
        if (window.pageYOffset > scrollHighSensor) {
          isGoUpOn = true;
          fadeIn(backToTop);
        }
      } else {
        if (window.pageYOffset <= scrollHighSensor) {
          fadeOut(backToTop);
          isGoUpOn = false;
        }
      }
    }

    function checkFooterPosition() {
      const feedbackHeader = document.getElementById("feedbackHeader");

      var scrollBottom =
        document.body.clientHeight -
        document.documentElement.clientHeight -
        document.documentElement.scrollTop;
      if (scrollBottom < footer.offsetHeight) {
        backToTop.style.marginBottom =
          footer.offsetHeight - scrollBottom + "px";
      } else {
        backToTop.style.marginBottom = (feedbackHeader && feedbackHeader.offsetHeight) || "0";
      }
    }
  }

  initStickyHeader(); //call initStickyHeader function
  initSuperfish(); //call initSuperfish function
  initMmenu();
  initSideNav();
  initInPageNav();
  initScrollToTop();
  handleAlertBanner(); //call handleAlretBanner function
  externalLinksInNewWindow(); //call externalLinksInNewWindow function

  // Apply classes to cta-button elements
  $(".cta-button").addClass("btn ntg-btn ntg-btn--primary");
  // console.log("NTGov DS loaded");
});

// scroll to section id on page load
$(window).on("load", function (event) {
  var elId = window.location.hash;

  if (elId.length > 1) {
    var topOfElement = document.getElementById(elId.substr(1));

    if (topOfElement) {
      topOfElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

/**
 * Fades out an element
 *
 * @param {object} el - element that's being faded out
 */
function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) <= 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

/**
 * Fades in an element with an optional display setting
 *
 * @param {object} el - element that's being faded in
 * @param {string} display - display type
 */
function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
