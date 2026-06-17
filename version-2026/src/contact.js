const forms = document.querySelectorAll("[data-contact-form]");

const setStatus = (form, message, kind = "") => {
  const statusEl = form.querySelector("[data-form-status]");
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.kind = kind;
};

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus(form, "Enviando mensaje...");
    form.setAttribute("aria-busy", "true");
    if (button) button.disabled = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "No fue posible enviar el mensaje.");
      form.reset();
      setStatus(form, "Mensaje enviado. Gracias, te contactare pronto.", "success");
    } catch (error) {
      setStatus(form, error.message || "No fue posible enviar el mensaje.", "error");
    } finally {
      form.removeAttribute("aria-busy");
      if (button) button.disabled = false;
    }
  });
});
