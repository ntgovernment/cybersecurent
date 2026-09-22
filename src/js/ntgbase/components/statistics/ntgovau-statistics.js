(function initCountUp() {
  var values = document.querySelectorAll(".count-up");

  values.forEach(function (value) {
    var target = value.innerHTML.replace(/[^\d.]/g, "");

    // default options
    var decimalPlaces = 0;
    var prefix = "";
    var suffix = "";

    // check for decimal places
    if (target.includes(".")) {
      decimalPlaces = target.split(".")[1].length;
    }

    // check for prefix
    if (value.hasAttribute("data-prefix")) {
      prefix = value.getAttribute("data-prefix");
    }

    // check for suffix
    if (value.hasAttribute("data-suffix")) {
      suffix = value.getAttribute("data-suffix");
    }

    const countUp = new CountUp(value, target, {
      decimalPlaces: decimalPlaces,
      duration: 3,
      prefix: prefix,
      suffix: suffix,
      enableScrollSpy: true,
      scrollSpyOnce: 1,
    });
  });
})();
