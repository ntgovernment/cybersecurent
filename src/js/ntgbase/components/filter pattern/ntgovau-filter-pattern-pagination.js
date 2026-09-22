// ------ Fiter pattern - pagination  ------
let currentPage = 1;
let totalPages = 0;

const paginationContainer = document.getElementById("pageNumbers");

function renderItems(
  contentContainer,
  items,
  noResultsContainer,
  paginationCallback
) {
  const visibleItems = items.filter(
    (item) => !item.classList.contains("d-none")
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, visibleItems.length);

  // Hide all items and only show the items for the current page
  visibleItems.forEach((item, index) => {
    item.style.display = index >= startIndex && index < endIndex ? "" : "none";
  });

  // Update total pages and render pagination
  totalPages = Math.ceil(visibleItems.length / ITEMS_PER_PAGE);
  renderPagination(visibleItems.length, paginationCallback);

  // Show/hide the "no results" container
  if (noResultsContainer) {
    noResultsContainer.classList.toggle("d-none", visibleItems.length > 0);
  }
}

function renderPagination(itemCount, paginationCallback) {
  paginationContainer.innerHTML = "";
  totalPages = Math.ceil(itemCount / ITEMS_PER_PAGE);

  // Determine the range of pages to display
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  if (totalPages >= 3) {
    if (currentPage === 1) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage === totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }
  }

  // Update "first" and "prev" buttons
  const firstBtn = document.querySelector('.nav-btn[data-nav="first"]');
  const prevBtn = document.querySelector('.nav-btn[data-nav="prev"]');
  firstBtn.classList.toggle("disabled", currentPage === 1);
  prevBtn.classList.toggle("disabled", currentPage === 1);

  // Update "next" and "last" buttons
  const nextBtn = document.querySelector('.nav-btn[data-nav="next"]');
  const lastBtn = document.querySelector('.nav-btn[data-nav="last"]');
  nextBtn.classList.toggle("disabled", currentPage === totalPages);
  lastBtn.classList.toggle("disabled", currentPage === totalPages);

  // Render the page number buttons within the range
  for (let i = startPage; i <= endPage; i++) {
    // for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item d-inline-block";
    li.innerHTML = `<a class="nav-btn page-link${
      i === currentPage ? " page-link--current" : ""
    }" data-nav="page" data-page="${i}" href="#">${i}</a>`;
    li.addEventListener("click", (event) => {
      event.preventDefault();
      currentPage = i;
      paginationCallback();
    });
    paginationContainer.appendChild(li);
  }
}

function handleNavClick(event, paginationCallback) {
  event.preventDefault();
  const navType = event.target.getAttribute("data-nav");

  switch (navType) {
    case "first":
      currentPage = 1;
      break;
    case "prev":
      if (currentPage > 1) currentPage--;
      break;
    case "next":
      if (currentPage < totalPages) currentPage++;
      break;
    case "last":
      currentPage = totalPages;
      break;
  }

  paginationCallback();
}

function initPagination(
  contentContainer,
  noResultsContainer,
  paginationCallback
) {
  const items = Array.from(contentContainer.children);
  renderItems(contentContainer, items, noResultsContainer, paginationCallback);
}

// Setup the navigation buttons' event listeners
function setupNavButtons(paginationCallback) {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", (event) =>
      handleNavClick(event, paginationCallback)
    );
  });
}
