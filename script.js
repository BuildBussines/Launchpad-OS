// ===========================================================================
// EDIT ME — fill in your real details before publishing
// ===========================================================================
const WHATSAPP_NUMBER = "923001234567"; // EDIT ME: WHATSAPP — country code + number, no + or spaces (e.g. Pakistan: 923001234567)
const JAZZCASH_NUMBER = "03XX-XXXXXXX"; // EDIT ME: JAZZCASH — must match the number shown in index.html
const PRICE_LABEL = "Rs. 799";          // EDIT ME: PRICE — must match index.html
// ===========================================================================

function buildWhatsAppLink() {
  const message = `Hi! I just paid ${PRICE_LABEL} for the Career & Content Starter Pack via JazzCash. Here's my payment screenshot:`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openBuyModal() {
  const modal = document.getElementById("buy-modal");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeBuyModal() {
  const modal = document.getElementById("buy-modal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

function closeBuyModalOnOverlay(event) {
  if (event.target.id === "buy-modal") closeBuyModal();
}

function copyNumber() {
  navigator.clipboard.writeText(JAZZCASH_NUMBER).then(() => {
    const btn = document.querySelector(".copy-btn");
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = original), 1500);
  }).catch(() => {
    alert("Couldn't copy automatically — the number is " + JAZZCASH_NUMBER);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("jazzcash-number").textContent = JAZZCASH_NUMBER;
  document.getElementById("whatsapp-link").href = buildWhatsAppLink();
  document.getElementById("footer-whatsapp").href = buildWhatsAppLink();
  document.getElementById("year").textContent = new Date().getFullYear();

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBuyModal();
  });
});
