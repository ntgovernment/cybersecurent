    $(document).ready(function () {
        const accordionTogglers = document.querySelectorAll(".accordion-toggler");

        if (accordionTogglers.length > 0) {
            $(".open").click(function (event) {
                event.preventDefault(); // Prevent the default behavior of the anchor tag
                // Toggle the "Open All" button's aria-expanded attribute
                $(this).closest(".accordion-toggler").find(".close").attr("aria-expanded", "false");
                $(this).attr("aria-expanded", "true");
                // Open all accordion sections
                $(".accordion-button").attr("aria-expanded", "true");
                $(".accordion-button").removeClass("collapsed");
                $(".accordion-collapse").addClass("show");
            });

            $(".close").click(function (event) {
                event.preventDefault(); // Prevent the default behavior of the anchor tag
                // Toggle the "Close All" button's aria-expanded attribute
                $(this).closest(".accordion-toggler").find(".open").attr("aria-expanded", "false");
                $(this).attr("aria-expanded", "true");
                // Close all accordion sections
                $(".accordion-button").attr("aria-expanded", "false");
                $(".accordion-button").addClass("collapsed");
                $(".accordion-collapse").removeClass("show");
            });
        }
    });