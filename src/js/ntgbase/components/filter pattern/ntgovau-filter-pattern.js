// ------ Fiter pattern - reusable ------
const totalItems = document.querySelectorAll("#pageContentItem").length;
const filters = {};

// Global variable to hold the unique pill filter
let uniqueFilter = {
  label: "Unique Pill",
  option: "",
  value: "",
  key: "uniquePill",
};

// Function to fetch data from the server and populate page content
async function fetchData() {
  try {
    const response = await fetch(payloadUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json(); // Parse the response as JSON
    populatePageContent(data); // Populate page content with the fetched data
    console.log("Data fetched successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow to handle it further up
  }
}

// Function to populate the page content with data
function populatePageContent(data) {
  const pageContentContainer = document.getElementById("pageContent");
  const viewMode = sessionStorage.getItem("viewMode") || "grid"; // Retrieve the current view mode from sessionStorage or default to 'grid'

  pageContentContainer.innerHTML = ""; // Clear previous content
  toggleViewMode(viewMode, pageContentContainer, data); // Toggle and populate data
  filterContent(); // Reapply existing filters

  console.log(`populatePageContent - Total items: ${data.length}`);
}

// Function to toggle between grid and list views and populate the content
function toggleViewMode(viewMode, container, data) {
  const isGridView = viewMode === "grid";
  document
    .getElementById("list-view")
    .classList.toggle("ntg-active", !isGridView);
  document
    .getElementById("grid-view")
    .classList.toggle("ntg-active", isGridView);

  data.forEach((item) => createPageContentItem(container, item, isGridView));
  console.log(`View mode toggled to ${viewMode}`);
}

// Function to set the view mode and refetch data
function setViewMode(viewMode) {
  sessionStorage.setItem("viewMode", viewMode);
  showThenHideSpinner();
  fetchData();
  console.log(`View mode switched to ${viewMode}`);
}

// Event listeners for swapping between list and grid views
const listViewButton = document.getElementById("list-view");
const gridViewButton = document.getElementById("grid-view");
if (listViewButton) {
  listViewButton.addEventListener("click", () => setViewMode("list"));
}
if (gridViewButton) {
  gridViewButton.addEventListener("click", () => setViewMode("grid"));
}

// Function to toggle the "No Results" message and list view headings
function toggleNoResultsMessage(hasResults) {
  const noResultsDiv = document.getElementById("noResults");
  const listViewHeadings = document.getElementById("listViewHeadings");

  noResultsDiv.style.display = hasResults ? "none" : "block";
  $("#pageContent").toggle(hasResults); // Toggle the visibility of the page content based on whether results exist

  // Show the list-view headings only if there are results and the current view mode is 'list'
  listViewHeadings.style.display =
    hasResults && sessionStorage.getItem("viewMode") == "list"
      ? "block"
      : "none";
  console.log(`No results message toggled, results found: ${hasResults}`);
}

// Extract unique options from items for dropdowns
function extractOptions(items) {
  const optionsSet = new Set(); // Use a Set to ensure uniqueness

  items.forEach((item) => {
    // Remove spans with specified classes
    const spans = item.querySelectorAll("span.d-lg-none, span.d-md-none");
    spans.forEach((span) => span.remove()); // Remove excluded spans

    const trimmedText = item.textContent.trim().replace(/\n/g, ""); // Clean up item text
    trimmedText.split(",").forEach((part) => {
      optionsSet.add(part.trim()); // Add each part to the set
    });
  });

  const extractedOptions = Array.from(optionsSet)
    .sort() // Sort options alphabetically
    .filter((option) => option.trim() !== ""); // Filter out empty options

  console.log("Extracted menu options:", extractedOptions);
  return extractedOptions; // Return the sorted, filtered options
}

// Function to initialize dropdowns and set up event listeners for filtering
function setupDropdown(filterKey, dataSelector, dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  let options = extractOptions(document.querySelectorAll(dataSelector));

  // Populate the dropdown with the extracted options
  populateDropdown(dropdown, options);

  // Add an event listener to handle dropdown selection changes
  dropdown.addEventListener("change", function () {
    showThenHideSpinner();
    createFilterPill(
      dropdownId,
      this.options[this.selectedIndex].text,
      this.value,
      filterKey
    );
    dropdown.selectedIndex = 0; // Reset the dropdown to the default option
  });

  // Initialize the filter array if not already set
  if (!filters[filterKey]) {
    filters[filterKey] = [];
  }
}

// Function to populate the dropdown with options
function populateDropdown(dropdown, options) {
  const defaultOption = dropdown.querySelector('option[value="all"]'); // Get the default option

  dropdown.innerHTML = ""; // Clear existing options in the dropdown
  dropdown.appendChild(defaultOption); // Add the default option back

  // Add each extracted option to the dropdown
  options.forEach((option) => {
    option.split(",").forEach((part) => {
      const newOption = document.createElement("option");
      newOption.value = part.toLowerCase().replace(/\s+/g, " ");
      newOption.textContent = part.trim();
      dropdown.appendChild(newOption);
    });
  });
}

// Function to evaluate whether a content item passes all active filters
function evaluateFilters(item) {
  const dataText = item.querySelector("[data-text]");
  const filterText = document
    .getElementById("textInput")
    .value.toLowerCase()
    .trim(); // Get the value from textInput, convert to lowercase and trim whitespace
  const matchesText =
    !filterText ||
    dataText.textContent.trim().toLowerCase().includes(filterText); // Check if the item matches the text filter criteria

  const matchesFilters = Object.keys(filters).every((filterKey) => {
    const dataElement = item.querySelector(`[data-${filterKey.split("-")[0]}]`); // Select the data element corresponding to the current filter key
    return (
      filters[filterKey].length === 0 ||
      (dataElement &&
        filters[filterKey].some((filter) =>
          dataElement.textContent
            .trim()
            .toLowerCase()
            .includes(filter.value.toLowerCase())
        ))
    );
  });

  // Return true if both text and filter criteria are matched
  return matchesText && matchesFilters;
}

// Function to filter content based on active filters
function filterContent() {
  const contentItems = document.querySelectorAll("#pageContentItem");
  let hasResults = false;

  contentItems.forEach((item) => {
    const shouldDisplay = evaluateFilters(item); // Evaluate if the item should be displayed
    const itemData = item.querySelector("#pageContentItemData");

    // Update item visibility
    item.style.display = shouldDisplay ? "" : "none";
    item.classList.toggle("d-none", !shouldDisplay);
    itemData.classList.toggle("d-block", shouldDisplay);
    itemData.classList.toggle("d-none", !shouldDisplay);

    if (shouldDisplay) hasResults = true;
  });

  currentPage = 1;
  toggleNoResultsMessage(hasResults);
  toggleFilterContainerVisibility();
  renderCardItems();
  console.log("Content filtered.");
}

// Function to create a filter pill and add to the UI
function createFilterPill(labelText, optionText, optionValue, filterKey) {
  const filter = {
    label: labelText,
    option: optionText,
    value: optionValue,
    key: filterKey,
    active: true,
  };

  // Add the filter if it's not already applied and it's not the default "all"
  if (
    optionValue !== "all" &&
    !filters[filterKey].some((filterItem) => filterItem.value === optionValue)
  ) {
    filters[filterKey].push(filter);
    console.log("Filter added:", filter);
    console.log("Current filters:", filters);

    filterContent(); // Apply the filtering logic

    const filterPillsContainer = document.getElementById("filterPills");
    const pill = document.createElement("div");
    pill.classList.add("ntg-pill");
    pill.innerHTML = `
            <div class="btn btn-outline-dark rounded-pill me-2 mb-1 p-0">
                <input class="ntg-pill__checkbox" type="checkbox" name="pill${optionValue}" id="pill${optionValue}" checked>
                <label class="ntg-pill--filter__label py-2 px-3" for="pill${optionValue}">${optionText}</label>
            </div>
        `;

    // Add an event listener to the pill's close button to remove the filter when clicked
    pill.addEventListener("click", function () {
      const index = filters[filterKey].findIndex(
        (f) => f.value === optionValue
      );
      filters[filterKey].splice(index, 1);

      this.remove();
      showThenHideSpinner();
      filterContent();
      console.log(
        `Filter removed, here is the updated filters ${filters[filterKey]}`
      );
    });

    filterPillsContainer.appendChild(pill);
    toggleFilterContainerVisibility();
  }
}

// Toggle the visibility of the active filters container
function toggleFilterContainerVisibility() {
  const activeFilters = document.getElementById("active-filters");
  const hasActiveFilters = Object.values(filters).some(
    (filterArray) => filterArray.length > 0
  );
  const hasUniqueFilter = uniqueFilter && uniqueFilter.value !== "";

  // Show or hide the container based on the presence of filters
  activeFilters.classList.toggle(
    "hidden",
    !(hasActiveFilters || hasUniqueFilter)
  );
}

// Function to update or create the unique pill
function updateUniquePill(optionText, optionValue) {
  uniqueFilter = {
    label: "Unique Pill",
    option: optionText,
    value: optionValue.toLowerCase(),
    key: "uniquePill",
  };

  console.log("Unique pill updated:", uniqueFilter);
  filterContent(); // Apply the filtering logic
  toggleFilterContainerVisibility();
}

// Function to update the UI with the unique pill
function updateUniquePillUI(optionText, optionValue) {
  $("#uniquePill").remove();
  appendPillToUI(optionText, optionValue, "uniquePill");
}

// Function to remove the unique filter pill and update the UI
function removeUniquePill() {
  uniqueFilter = null; // Reset the unique filter
  $("#uniquePill").remove();
  clearFilterPills();

  console.log("Unique pill removed");
  filterContent();
}

// Function to add a unique pill to the UI
function appendPillToUI(optionText, optionValue, filterKey) {
  const filterPillsContainer = document.getElementById("filterPills");
  const pill = document.createElement("div");

  pill.id = filterKey; // Set an ID or class for the unique pill
  pill.classList.add("ntg-pill");
  pill.innerHTML = `
        <div class="btn btn-outline-dark rounded-pill me-2 mb-1 p-0">
            <input class="ntg-pill__checkbox" type="checkbox" name="pill${optionValue}" id="pill${optionValue}" checked>
            <label class="ntg-pill--filter__label py-1 px-2" for="pill${optionValue}">${optionText}</label>
        </div>
    `;

  pill.addEventListener("click", function () {
    showThenHideSpinner();
    $("#uniquePill").remove();
    uniqueFilter = null;
    $("#textInput").val(""); // Clear the input field
    filterContent(); // Apply the filtering logic
    console.log(
      "Unique Pill removed, here is the updated Name input Filter Array",
      uniqueFilter
    );
  });

  filterPillsContainer.appendChild(pill);
}

// Function to handle input changes for the text input
$("#textInput").on("input", function () {
  const inputText = $(this).val();
  const filteredText = inputText.replace(/\s/g, "");

  $("#clearInput").toggle(Boolean($(this).val())); // Toggle clear button visibility based on input

  if (inputText.length >= 3) {
    showThenHideSpinner();
    updateUniquePill(inputText, filteredText); // Update the unique pill with the current input text
    updateUniquePillUI(inputText, filteredText); // Update the UI with the unique pill
  } else {
    $("#uniquePill").remove();
    uniqueFilter = null;
  }

  filterContent(); // Filter the content directl
});

// Check if the clear input button exists before attaching the event listener
if (document.getElementById("clearInput")) {
  document.getElementById("clearInput").addEventListener("click", function () {
    removeUniquePill();
    resetInputFields();
    filterContent();
  });
}


// Function to reset input fields and clear filters
function resetInputFields() {
  $("#textInput").val("");
  $("#clearInput").hide(); // Hide the clear input button
  Object.values(filters).forEach((filterArray) => (filterArray.length = 0)); // Clear all filter arrays
}

// Function to clear all filter pills from the UI and reset filter arrays
function clearFilterPills() {
  const filterPillsContainer = document.getElementById("filterPills");
  filterPillsContainer.innerHTML = "";
  filterNameArray = [];
}

// Function to clear all applied filters and reset the UI
function clearAllFilters(event) {
  event.preventDefault(); // Prevent the default behavior of the link
  showThenHideSpinner();
  resetInputFields();
  clearFilterPills();

  // Hide the active filters container
  const activeFilters = document.getElementById("active-filters");
  activeFilters.classList.add("hidden");

  uniqueFilter = null; // Clear the unique filter if present
  filterContent();
}
