const forms = document.querySelectorAll("[data-contact-form]");

const setStatus = (form, message, kind = "") => {
  const statusEl = form.querySelector("[data-form-status]");
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.kind = kind;
};

const getFieldError = (field) => {
  const value = field.value.trim();
  if (field.required && !value) return "Este campo es obligatorio.";
  if (field.type === "email" && value && !field.validity.valid) return "Ingresa un correo válido.";
  if (field.minLength > 0 && value.length < field.minLength) {
    return `Debe tener al menos ${field.minLength} caracteres.`;
  }
  return "";
};

const setFieldState = (field, error = "") => {
  const wrapper = field.closest(".field");
  if (!wrapper) return;
  let errorEl = wrapper.querySelector("[data-field-error]");
  if (!errorEl) {
    errorEl = document.createElement("span");
    errorEl.className = "field-error";
    errorEl.dataset.fieldError = "";
    wrapper.append(errorEl);
  }

  wrapper.classList.toggle("has-error", Boolean(error));
  wrapper.classList.toggle("is-valid", !error && Boolean(field.value.trim()));
  field.setAttribute("aria-invalid", String(Boolean(error)));
  errorEl.textContent = error;
};

const validateForm = (form) => {
  const fields = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));
  const errors = fields.map((field) => {
    const error = getFieldError(field);
    setFieldState(field, error);
    return error;
  });
  return !errors.some(Boolean);
};

forms.forEach((form) => {
  const fields = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));
  fields.forEach((field) => {
    field.addEventListener("input", () => setFieldState(field, getFieldError(field)));
    field.addEventListener("blur", () => setFieldState(field, getFieldError(field)));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");

    if (!validateForm(form)) {
      setStatus(form, "Revisa los campos marcados antes de enviar.", "error");
      return;
    }

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
      fields.forEach((field) => setFieldState(field));
      setStatus(form, "Mensaje enviado. Gracias, te contactaré pronto.", "success");
    } catch (error) {
      setStatus(form, error.message || "No fue posible enviar el mensaje.", "error");
    } finally {
      form.removeAttribute("aria-busy");
      if (button) button.disabled = false;
    }
  });
});
