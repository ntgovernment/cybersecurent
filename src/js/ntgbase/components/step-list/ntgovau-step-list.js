$(document).ready(function () {
  applyStepPattern();
});

function applyStepPattern() {
  $(".ntg-step-list")
    .find("h3")
    .each(function (i) {
      $(this)
        .nextUntil("h3")
        .addBack()
        .wrapAll($("<div></div>").addClass("step-item"));
    });
  $(".ntg-step-list li").each(function (i) {
    var listitem = $(this).html().toString();
    $(this).html(listitem.trim());
  });
}
