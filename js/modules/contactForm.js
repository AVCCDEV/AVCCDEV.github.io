/**
 * contactForm.js — submits the connect band's contact form without a reload.
 *
 * js/modules/connectBand.js builds the form; this module binds to it and
 * posts it to Web3Forms with fetch, so the visitor never leaves the site. It
 * reports the outcome in the form's [data-form-status] region.
 *
 * main.js calls connectBand first for that reason — without it there is no
 * form on the page and this is a no-op.
 *
 * No-op when the form is absent, so main.js can call it on every page.
 */

const MAILTO = "adam.casey.velazquez@gmail.com";

const MESSAGES = {
  sending: "Sending…",
  ok: "Thanks — your message is on its way. I’ll get back to you soon.",
  error: `Sorry, that didn’t send. Please email me directly at ${MAILTO}.`,
};

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const key = form.elements.access_key;

  // The form is inert until Adam pastes his Web3Forms key into the markup.
  // Say so loudly in the console rather than letting a visitor's message
  // vanish into a 400 they cannot interpret.
  if (!key || key.value.includes("TODO")) {
    console.warn(
      "[contactForm] No Web3Forms access key set — the contact form cannot " +
        "deliver mail. Replace WEB3FORMS_KEY in js/modules/connectBand.js."
    );
  }

  form.addEventListener("submit", async (event) => {
    // Native validation runs first: this listener only fires once the browser
    // is satisfied, so there is nothing to check here.
    event.preventDefault();

    // CSS parks the submit button while a request is open, but Enter inside a
    // text field bypasses the button entirely — hence the second guard.
    if (form.dataset.state === "sending") return;
    setState(form, status, "sending");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }

      form.reset();
      setState(form, status, "ok");
    } catch (error) {
      console.warn("[contactForm] Submission failed:", error);
      setState(form, status, "error");
    }
  });
}

/**
 * Mirrors one state onto both the form (which styles the button) and the
 * status paragraph (which styles and announces the text).
 */
function setState(form, status, state) {
  form.dataset.state = state;
  if (!status) return;
  status.dataset.state = state;
  status.textContent = MESSAGES[state] || "";
}
