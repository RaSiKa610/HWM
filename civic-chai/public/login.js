// Login & Authentication Logic
const VALID_OTP = "123456"; // Hardcoded OTP for demo
let currentPhoneNumber = "";
let countdownTimer = null;

// DOM Elements
const phoneForm = document.getElementById("phoneForm");
const otpForm = document.getElementById("otpForm");
const phoneInput = document.getElementById("phoneNumber");
const otpInputs = document.querySelectorAll(".otp-input");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const maskedPhone = document.getElementById("maskedPhone");
const timerText = document.getElementById("timerText");
const countdown = document.getElementById("countdown");
const resendLink = document.getElementById("resendLink");
const changeNumberLink = document.getElementById("changeNumberLink");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

// Phone Number Validation & OTP Request
phoneForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const phone = phoneInput.value.trim();
  
  // Validate phone number
  if (!/^[6-9]\d{9}$/.test(phone)) {
    showError("Please enter a valid 10-digit mobile number");
    return;
  }
  
  currentPhoneNumber = phone;
  
  // Show success and move to OTP step
  showSuccess(`OTP sent to ${maskPhone(phone)}`);
  
  setTimeout(() => {
    phoneForm.classList.add("hidden");
    otpForm.classList.remove("hidden");
    step1.classList.remove("active");
    step1.classList.add("completed");
    step2.classList.add("active");
    maskedPhone.textContent = maskPhone(phone);
    
    // Focus first OTP input
    otpInputs[0].focus();
    
    // Start countdown
    startCountdown();
    
    // Log OTP to console for demo
    console.log("📱 OTP sent!");
    console.log("🔑 Your OTP is:", VALID_OTP);
    showSuccess("OTP is: 123456 (Demo Mode)");
  }, 500);
});

// OTP Input Handling
otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      return;
    }
    
    // Move to next input
    if (value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });
  
  input.addEventListener("keydown", (e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !input.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
  
  // Allow paste
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (/^\d+$/.test(pastedData)) {
      pastedData.split("").forEach((char, i) => {
        if (otpInputs[i]) {
          otpInputs[i].value = char;
        }
      });
      otpInputs[Math.min(pastedData.length, 5)].focus();
    }
  });
});

// OTP Verification
otpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const enteredOTP = Array.from(otpInputs).map(input => input.value).join("");
  
  if (enteredOTP.length !== 6) {
    showError("Please enter complete 6-digit OTP");
    return;
  }
  
  if (enteredOTP === VALID_OTP) {
    // OTP is correct - Login successful
    showSuccess("Login successful! Redirecting...");
    
    // Create user session
    const userData = {
      phone: currentPhoneNumber,
      name: `User ${currentPhoneNumber.slice(-4)}`,
      loginTime: new Date().toISOString(),
      isLoggedIn: true
    };
    
    // Store in localStorage
    localStorage.setItem("civicChaiUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    
    // Redirect after 1 second
    setTimeout(() => {
      // Check if there's a redirect URL
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get("redirect") || "index.html";
      window.location.href = redirect;
    }, 1000);
    
  } else {
    showError("Invalid OTP. Please try again.");
    // Clear OTP inputs
    otpInputs.forEach(input => input.value = "");
    otpInputs[0].focus();
  }
});

// Countdown Timer
function startCountdown() {
  let seconds = 30;
  countdown.textContent = seconds;
  resendLink.classList.add("disabled");
  timerText.style.display = "inline";
  resendLink.style.display = "none";
  
  countdownTimer = setInterval(() => {
    seconds--;
    countdown.textContent = seconds;
    
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      timerText.style.display = "none";
      resendLink.style.display = "inline";
      resendLink.classList.remove("disabled");
    }
  }, 1000);
}

// Resend OTP
resendLink.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (resendLink.classList.contains("disabled")) {
    return;
  }
  
  showSuccess("OTP resent successfully!");
  console.log("🔑 Your OTP is:", VALID_OTP);
  startCountdown();
});

// Change Number
changeNumberLink.addEventListener("click", (e) => {
  e.preventDefault();
  
  otpForm.classList.add("hidden");
  phoneForm.classList.remove("hidden");
  step2.classList.remove("active");
  step1.classList.remove("completed");
  step1.classList.add("active");
  
  // Clear OTP inputs
  otpInputs.forEach(input => input.value = "");
  
  // Clear countdown
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  
  hideMessages();
});

// Helper Functions
function maskPhone(phone) {
  return `******${phone.slice(-4)}`;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");
  successMessage.classList.remove("show");
  
  setTimeout(() => {
    errorMessage.classList.remove("show");
  }, 4000);
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.classList.add("show");
  errorMessage.classList.remove("show");
  
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 4000);
}

function hideMessages() {
  errorMessage.classList.remove("show");
  successMessage.classList.remove("show");
}

// Check if already logged in
window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if (isLoggedIn === "true") {
    // Already logged in, redirect to home
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect") || "index.html";
    window.location.href = redirect;
  }
});
