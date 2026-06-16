const form = document.querySelector("[data-contact-form]");
const statusEl = document.querySelector("[data-form-status]");

const normalize = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const setStatus = (message, kind = "") => {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.kind = kind;
};

if (form) {
  const topic = new URLSearchParams(window.location.search).get("tema");
  const subject = form.querySelector("select[name='subject']");

  if (topic && subject) {
    const normalizedTopic = normalize(topic);
    const option = Array.from(subject.options).find((item) => normalize(item.value) === normalizedTopic || normalize(item.textContent) === normalizedTopic);
    if (option) subject.value = option.value;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("Enviando mensaje...");
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
      setStatus("Mensaje enviado. Gracias, te contactaré pronto.", "success");
    } catch (error) {
      setStatus(error.message || "No fue posible enviar el mensaje.", "error");
    } finally {
      if (button) button.disabled = false;
    }
  });
}
