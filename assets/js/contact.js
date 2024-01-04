// *************************************************************
// Google Apps Script URL for form submission
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzCgoOr6bwJMyjbkiP-7k-gstuDMpu25IjvL6NfpKYeVCZad51cgHnA5bkg35EMS_iT/exec";

// Loader functions for form submission
const loaderContainer = document.getElementById("loader-container");

function showLoader() {
  loaderContainer.style.display = "flex";
}

function hideLoader() {
  loaderContainer.style.display = "none";
}
// Function to submit form data
function submitForm(formData, formId, successMessage) {
  showLoader(); // Show loader when form is being submitted
  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        alert(successMessage);
        window.location.reload();
      } else {
        console.error("Error!", data.error);
      }
    })
    .catch((error) => console.error("Error!", error.message))
    .finally(() => {
      hideLoader(); // Hide loader when submission is complete
    });
}
// Handling form submission for form A
const formA = document.forms["contact-form"];
formA.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formA);
  formData.append("form_id", "form_a");
  submitForm(
    formData,
    "form_a",
    "Thank you! Your data is submitted successfully."
  );
});
