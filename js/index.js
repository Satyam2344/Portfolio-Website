// Initialize EmailJS
(function () {
  emailjs.init({
    publicKey: "4oHE6xhuNH7X5VtNc",
  }); // Replace with your EmailJS User ID
})();

// Attach event listener to the form
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      // Prevent form submission to handle validation
      event.preventDefault();

      // Get all form fields
      const fName = document.getElementById("fName").value;
      const lName = document.getElementById("lName").value;
      const contactNum = document.getElementById("contactNum").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      let isValid = true;

      // Clear any previous error messages
      clearErrors();

      // Validate First Name
      if (!fName || fName.length < 2) {
        isValid = false;
        showError(
          "fName",
          "First name is required and must be at least 2 characters."
        );
      }

      // Validate Last Name
      if (!lName || lName.length < 2) {
        isValid = false;
        showError(
          "lName",
          "Last name is required and must be at least 2 characters."
        );
      }

      // Validate Contact Number (Assume international format)
      const phonePattern = /^\+?[0-9]{10,15}$/; // Simple phone number pattern
      if (!phonePattern.test(contactNum)) {
        isValid = false;
        showError(
          "contactNum",
          "Contact number must be a valid phone number (e.g., +91XXXXXXXXXX)."
        );
      }

      // Validate Email
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        isValid = false;
        showError("email", "Please enter a valid email address.");
      }

      // Validate Subject
      if (!subject || subject.length < 5) {
        isValid = false;
        showError(
          "subject",
          "Subject is required and must be at least 5 characters."
        );
      }

      // Validate Message (Optional but good to have)
      if (message && message.length < 10) {
        isValid = false;
        showError("message", "Message must be at least 10 characters long.");
      }

      // If all fields are valid, send the email
      if (isValid) {
        // Define the custom message content
        const customMessage = `
            You have received a new message from: ${fName} ${lName}
            
            Contact Number: ${contactNum}
            Email: ${email}
            
            Message:
            ${message}
            
            ---
            This message was sent via the contact form on your website.
        `;

        const templateParams = {
          first_name: fName,
          last_name: lName,
          contact_number: contactNum,
          email: email,
          subject: subject,
          message: customMessage, // Custom message added here
        };

        emailjs
          .send("Satyam-xyz234512", "satyamtemplate_ghgdddd", templateParams)
          .then(
            function (response) {
              alert("Email sent successfully!");
              console.log("Success:", response);
              //reload the window after message send successfully!!
              window.location.reload();
            },
            function (error) {
              alert("Failed to send the email. Please try again.");
              console.log("Error:", error);
            }
          );
      }
    });
});

// Show error message next to the field
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.createElement("div");
  error.classList.add("error-message");
  error.textContent = message;
  field.parentElement.appendChild(error);
}

// Clear all error messages
function clearErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((error) => error.remove());
}
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDateTime = now.toLocaleString("en-US", options);
  document.getElementById("datetime").textContent = formattedDateTime;
}

// Update the time immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);
