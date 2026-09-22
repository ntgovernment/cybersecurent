function initFooterFeedbackHandler() {
  const labels = document.querySelectorAll(".feedback-option");
  const footerFeedbackSection = document.getElementById(
    "footerFeedbackSection"
  );
  const toastElement = document.getElementById("feedbackToastSuccess");
  const toastElementError = document.getElementById("feedbackToastError");
  const toastSuccess = new bootstrap.Toast(toastElement);
  const toastError = new bootstrap.Toast(toastElementError);

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      labels.forEach((l) => l.classList.remove("selected"));
      label.classList.add("selected");

      const input = label.querySelector("input");
      input.checked = true;

      const formData = new FormData();
      formData.append(
        `q${footerFeedbackSection.getAttribute("data-feedback-form-id")}:q1`,
        input.value
      );
      formData.append(
        `form_email_${footerFeedbackSection.getAttribute(
          "data-feedback-form-id"
        )}_submit`,
        ""
      );

      fetch(footerFeedbackSection.getAttribute("data-feedback-form-url"), {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            footerFeedbackSection.remove(); // Remove the feedback UI
            toastSuccess.show(); // Show the toast
          } else {
            toastError.show();
            // alert("Submission failed.");
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("There was an error.");
        });
    });
  });
}

initFooterFeedbackHandler();
