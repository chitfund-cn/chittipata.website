document.addEventListener("DOMContentLoaded", () => {
  const upiApp = document.getElementById("upiApp");
  const qrCode = document.getElementById("qrCode");

  if (upiApp && qrCode) {
    document.querySelectorAll('input[name="paymentMethod"]').forEach(el => {
      el.addEventListener("change", () => {
        upiApp.style.display = el.value === "upi" ? "block" : "none";
        qrCode.style.display = el.value === "qr" ? "block" : "none";
      });
    });
  }
});
