// ------ Fiter pattern - spinner ------
function showThenHideSpinner(timeout = 200, dataLength = 0) {
  // Show the spinner
  $(".ntg-spinner").show();
  $("#paginationSection").hide();
  $("#noResults").hide();

  // Hide the spinner after the specified timeout
  setTimeout(function () {
    $(".ntg-spinner").hide();

    console.log("dataLength: " + dataLength);
    console.log("ITEMS_PER_PAGE: " + ITEMS_PER_PAGE);
    console.log("totalPages: " + totalPages);

    // Control the visibility of the pagination based on the data length
    if (totalPages > 1) {
      $("#paginationSection").show();
    } else {
      $("#paginationSection").hide();
    }

    // Show no-results message if there are no data and it was hidden previously
    if (dataLength === 0) {
      $("#noResults").show();
    }
  }, timeout);
}
