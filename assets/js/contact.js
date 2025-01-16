// main script
(function () {
  "use strict";

  function validateField(field, errorElement) {
    if (!field.value.trim()) {
      field.classList.add('border-red-500');
      errorElement.style.display = 'block';
      return false;
    }
    field.classList.remove('border-red-500');
    errorElement.style.display = 'none';
    return true;
  }

  function createErrorElement(field, errorMessage) {
      const errorElement = document.createElement('p');
      errorElement.classList.add('text-red-500', 'text-sm', 'mt-1');
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'none';
      field.parentNode.appendChild(errorElement);
      return errorElement;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    const emailError = createErrorElement(emailField, form.dataset.emailError || "Email is required.");
    const messageError = createErrorElement(messageField, form.dataset.messageError || "Message is required.");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (![validateField(emailField, emailError), validateField(messageField, messageError)].every(Boolean)) {
          return;
        }

        const formData = new URLSearchParams(new FormData(form)).toString();

        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
          });

          const text = await response.text();

          if (response.ok && text === 'Sent.') {
            submitButton.style.display = 'none';
            successMessage.style.display = 'block';
          } else {
            submitButton.style.display = 'block';
            errorMessage.style.display = 'block';
          }
        } catch (error) {
          submitButton.style.display = 'block';
          errorMessage.style.display = 'block';
        }
    });
  });
})();
