// main script
(function () {
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

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
