const loginBtn = document.getElementById("loginBtn");
const otpModal = document.getElementById("otpModal");

loginBtn.onclick = () => {
  otpModal.style.display = "flex";
};

async function sendOTP() {
  const mobile = document.getElementById("mobileInput").value;
  await fetch("https://your-backend.com/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile }),
  });
  alert("OTP sent to " + mobile);
}

async function verifyOTP() {
  const mobile = document.getElementById("mobileInput").value;
  const otp = document.getElementById("otpInput").value;
  const res = await fetch("https://your-backend.com/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, otp }),
  });
  const data = await res.json();
  if (data.success) {
    alert("Login successful");
    otpModal.style.display = "none";

    await fetch("https://your-backend.com/send-login-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile,
        to: "charan.chittipata@gmail.com",
      }),
    });

    if (mobile === "8688113526") {
      window.location.href = "/admin-dashboard.html";
    } else {
      window.location.href = "/user-dashboard.html";
    }
  } else {
    alert("Invalid OTP");
  }
}
