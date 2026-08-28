/**
 * connectBand.js — builds the closing "Let's make something great!" band.
 *
 * Drop this at the foot of any page, just above the footer:
 *
 *   <section class="section connect" id="connect" data-connect-band>
 *     <div class="container">
 *       <!-- static fallback: see below -->
 *     </div>
 *   </section>
 *
 * The module owns the markup so there is one copy of it rather than fourteen.
 * That is the whole reason it is JS and not hand-written HTML: this is a
 * no-build site, so a shared block either lives in a template here or gets
 * pasted into every page and drifts. Pair it with .site-footer--minimal, or
 * the page makes the same pitch twice running.
 *
 * NO-JS PATH. The placeholder keeps a static pitch and a mailto link inside
 * it, which this replaces wholesale. So without JS a visitor still gets a
 * working way to reach Adam — they just get the link rather than the form.
 * The form is the enhancement; the contact path is not.
 *
 * The submit handling is not here — js/modules/contactForm.js picks the form
 * up afterwards, which is why main.js calls this one first.
 *
 * No-op when the placeholder is absent, so main.js can call it on every page.
 */

const EMAIL = "adam.casey.velazquez@gmail.com";
const RESUME = "/assets/docs/Adam_Velazquez_Resume.pdf";
const LINKEDIN = "https://www.linkedin.com/in/adam-velazquez-b1151494";

/* Web3Forms relays the message to Adam's inbox — a static Pages site cannot
   send mail on its own.

   THE KEY IS PUBLIC BY DESIGN and belongs in the committed source. It names
   the form, not the account: it cannot read submissions, change the delivery
   address, or do anything but post to this one form. Do not treat it as a
   secret, do not move it to a build-time variable (there is no build), and do
   not rotate it on sight — the whole design assumes it ships in client-side
   markup. Supplied by Adam on 2026-08-28, issued against
   adam.casey.velazquez@gmail.com.

   Web3Forms REFUSES non-browser requests on the free plan — curl gets
   403 "This method is not allowed. Use our API in client side". So this path
   cannot be smoke-tested from a shell; it has to be a real submission from a
   real page. contactForm.js still guards against the key going missing and
   warns in the console if it does. */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "938851ba-76d2-4d05-9e30-7c51220b8cbb";

const TITLE = "Let’s make something great!";
const LEDE =
  "Open to commissions, collaborations, and full-time roles. Tell me what " +
  "you are making and I’ll get back to you.";

export function initConnectBand() {
  const host = document.querySelector("[data-connect-band]");
  if (!host) return;

  const inner = el("div", "container connect__inner");
  inner.append(pitch(), form());
  host.replaceChildren(inner);
}

/* --- Left column: the pitch and the direct links -------------------------- */

function pitch() {
  const wrap = el("div", "connect__pitch");

  const heading = el("h2", "connect__title");
  heading.textContent = TITLE;

  const lede = el("p", "connect__lede");
  lede.textContent = LEDE;

  const links = el("ul", "connect__links");
  links.setAttribute("role", "list");

  // Instagram and ArtStation are still missing — they were removed on
  // 2026-08-27 for being href="#", and Adam has not supplied the URLs. Add
  // them to this list when he does; that is now a one-line change covering
  // every page rather than fourteen separate edits.
  links.append(
    linkItem("Email me", "mailto:" + EMAIL),
    linkItem("Resume", RESUME, { icon: RESUME_ICON, download: true, hidden: " (PDF)" }),
    linkItem("LinkedIn", LINKEDIN, { icon: LINKEDIN_ICON, external: true })
  );

  wrap.append(heading, lede, links);
  return wrap;
}

function linkItem(label, href, options = {}) {
  const li = document.createElement("li");
  const a = el("a", "button button--ghost");
  a.href = href;
  if (options.download) a.setAttribute("download", "");
  if (options.external) a.rel = "noopener";
  if (options.icon) a.append(svg(options.icon));
  a.append(document.createTextNode(label));
  if (options.hidden) {
    const note = el("span", "visually-hidden");
    note.textContent = options.hidden;
    a.append(note);
  }
  li.append(a);
  return li;
}

/* --- Right column: the form ----------------------------------------------- */

function form() {
  const node = el("form", "contact-form");
  node.setAttribute("data-contact-form", "");
  node.action = WEB3FORMS_ENDPOINT;
  node.method = "post";

  node.append(
    hidden("access_key", WEB3FORMS_KEY),
    hidden("subject", "New message from adamv.art"),
    hidden("from_name", "adamv.art contact form"),
    botcheck()
  );

  const row = el("div", "contact-form__row");
  row.append(
    field("contact-name", "Name", { type: "text", autocomplete: "name", maxLength: 120 }),
    field("contact-email", "Email", { type: "email", autocomplete: "email", maxLength: 180 })
  );
  node.append(row);

  node.append(field("contact-message", "Message", { area: true, maxLength: 4000 }));

  const foot = el("div", "contact-form__foot");
  const submit = el("button", "button button--primary");
  submit.type = "submit";
  submit.textContent = "Send message";
  // role="status" announces the result without stealing focus. It ships empty
  // so the layout does not jump when a message arrives.
  const status = el("p", "contact-form__status");
  status.setAttribute("data-form-status", "");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  foot.append(submit, status);
  node.append(foot);

  return node;
}

function field(id, label, options) {
  const wrap = el("p", "field");

  const labelEl = el("label", "field__label");
  labelEl.htmlFor = id;
  labelEl.textContent = label;

  const control = options.area
    ? el("textarea", "field__control field__control--area")
    : el("input", "field__control");
  control.id = id;
  control.name = id.replace(/^contact-/, "");
  control.required = true;
  control.maxLength = options.maxLength;
  if (options.area) {
    control.rows = 5;
  } else {
    control.type = options.type;
    control.autocomplete = options.autocomplete;
  }

  wrap.append(labelEl, control);
  return wrap;
}

function hidden(name, value) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  return input;
}

/** Web3Forms' honeypot: a real checkbox only a bot fills in. Hidden from
 *  sight, from the tab order and from assistive tech — see connect.css for
 *  why it must not become a visually-hidden field instead. */
function botcheck() {
  const label = el("label", "contact-form__botcheck");
  label.setAttribute("aria-hidden", "true");
  label.append(document.createTextNode("Leave this field empty"));
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = "botcheck";
  input.tabIndex = -1;
  input.autocomplete = "off";
  label.append(input);
  return label;
}

/* --- Icons ----------------------------------------------------------------
   The same two glyphs the footer uses, as path data rather than markup so the
   wrapper below can build a real SVG element.
   -------------------------------------------------------------------------- */

const RESUME_ICON =
  '<path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" ' +
  'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
  'stroke-linejoin="round"/>';

const LINKEDIN_ICON =
  '<path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 ' +
  "0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 " +
  "2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 " +
  "20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 " +
  '24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>';

/** SVG needs createElementNS. The paths above are literals from this file and
 *  never touch user input, so innerHTML on the wrapper is safe here. */
function svg(paths) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  node.setAttribute("class", "button__icon");
  node.setAttribute("viewBox", "0 0 24 24");
  node.setAttribute("aria-hidden", "true");
  node.innerHTML = paths;
  return node;
}

function el(tag, className) {
  const node = document.createElement(tag);
  node.className = className;
  return node;
}
