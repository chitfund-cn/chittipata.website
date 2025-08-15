const BASE_URL = "https://chittipata-otp.onrender.com";

function openRegistration(plan) {
  document.getElementById("selectedPlan").textContent = plan;
  document.getElementById("registrationModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("registrationModal").style.display = "none";
}

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
    alert("Registration successful!");

    // Optional: notify admin
    await fetch(`${BASE_URL}/send-payment-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "charan.chittipata@gmail.com",
        amount: document.getElementById("selectedPlan").textContent,
        tenure: "User Registration",
      }),
    });

    window.location.href = "/user-dashboard.html";
  } else {
    alert("Invalid OTP");
  }
}
