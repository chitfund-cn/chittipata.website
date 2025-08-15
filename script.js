const loginBtn = document.getElementById("loginBtn");
const otpModal = document.getElementById("otpModal");
const BASE_URL = "https://chittipata-otp.onrender.com";

loginBtn.onclick = () => {
  otpModal.style.display = "flex";
};

async function sendOTP() {
  const email = document.getElementById("emailInput").value;
  const res = await fetch(`${BASE_URL}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  alert(data.message || "OTP sent to " + email);
}

async function verifyOTP() {
  const email = document.getElementById("emailInput").value;
  const otp = document.getElementById("otpInput").value;
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  const data = await res.json();

  if (data.success) {
    alert("Login successful");
    otpModal.style.display = "none";

    // Optional: send login alert to admin
    await fetch(`${BASE_URL}/send-payment-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "charan.chittipata@gmail.com",
        amount: "Login Alert",
        tenure: "N/A",
      }),
    });

    if (email === "admin@chittipata.com") {
      window.location.href = "/admin-dashboard.html";
    } else {
      window.location.href = "/user-dashboard.html";
    }
  } else {
    alert("Invalid OTP");
  }
}
