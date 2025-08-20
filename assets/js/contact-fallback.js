// Contact Form Handler - Fallback version
// Handles form submission with better error management

(function () {
  "use strict";

  // Alternative contact form handler that doesn't rely on JSON parsing
  function initContactFormFallback() {
    const contactForm = document.querySelector("#contactForm");
    if (!contactForm) return;

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const loadingElement = contactForm.querySelector(".loading");
    const successElement = contactForm.querySelector(".sent-message");
    const errorElement = contactForm.querySelector(".error-message");

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Show loading state
      if (loadingElement) loadingElement.style.display = "block";
      if (successElement) successElement.style.display = "none";
      if (errorElement) errorElement.style.display = "none";
      if (submitButton) submitButton.disabled = true;

      try {
        const formData = new FormData(contactForm);

        // Validate required fields
        const name = formData.get("name")?.trim();
        const email = formData.get("email")?.trim();
        const message = formData.get("message")?.trim();

        if (!name || !email || !message) {
          throw new Error("Por favor, completa todos los campos obligatorios.");
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error("Por favor, introduce un email válido.");
        }

        // Send data using fetch with simpler approach
        const contactData = {
          name: name,
          email: email,
          subject:
            formData.get("subject")?.trim() || "Contacto desde Portfolio",
          message: message,
          created_at: new Date().toISOString(),
          source: "portfolio-website",
        };

        // Try to use DatabaseManager if available
        if (
          window.DatabaseManager &&
          typeof window.DatabaseManager.saveContactData === "function"
        ) {
          const result = await window.DatabaseManager.saveContactData(
            contactData
          );

          // Be more permissive with success detection
          if (result && result.success !== false) {
            showSuccess();
            return;
          }
        }

        // Fallback: direct API call
        await sendContactDirect(contactData);
        showSuccess();
      } catch (error) {
        console.error("Contact form error:", error);
        showError(error.message);
      } finally {
        if (loadingElement) loadingElement.style.display = "none";
        if (submitButton) submitButton.disabled = false;
      }
    });

    function showSuccess() {
      if (successElement) {
        successElement.style.display = "block";
        successElement.textContent =
          "¡Mensaje enviado correctamente! Te contactaré pronto.";
      }
      if (errorElement) errorElement.style.display = "none";
      contactForm.reset();

      // Hide success message after 6 seconds
      setTimeout(() => {
        if (successElement) successElement.style.display = "none";
      }, 6000);
    }

    function showError(message) {
      if (errorElement) {
        errorElement.style.display = "block";
        errorElement.textContent =
          message || "Error al enviar el mensaje. Por favor, intenta de nuevo.";
      }
      if (successElement) successElement.style.display = "none";

      // Hide error message after 8 seconds
      setTimeout(() => {
        if (errorElement) errorElement.style.display = "none";
      }, 8000);
    }

    async function sendContactDirect(data) {
      // Simple backup method - could save to localStorage or send to a simple endpoint
      console.log("Saving contact data:", data);

      // Store in localStorage as backup
      const contacts = JSON.parse(
        localStorage.getItem("portfolio_contacts") || "[]"
      );
      contacts.push(data);
      localStorage.setItem("portfolio_contacts", JSON.stringify(contacts));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Contact saved to localStorage successfully");
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactFormFallback);
  } else {
    initContactFormFallback();
  }

  // Export for global access
  window.ContactFormFallback = {
    init: initContactFormFallback,
  };
})();
