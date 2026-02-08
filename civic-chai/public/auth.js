// Authentication State Management
// Include this script on all pages that need auth

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Get current user data
function getCurrentUser() {
  const userData = localStorage.getItem("civicChaiUser");
  return userData ? JSON.parse(userData) : null;
}

// Logout function
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("civicChaiUser");
  localStorage.removeItem("token"); // Also remove API token if exists
  window.location.href = "index.html";
}

// Require login for specific actions
function requireLogin(action) {
  if (!isLoggedIn()) {
    showLoginModal(action);
    return false;
  }
  
  // User is logged in, proceed with action
  if (action === "report") {
    window.location.href = "report.html";
  } else if (action === "comment" || action === "upvote" || action === "like") {
    return true; // Allow the action
  }
  
  return true;
}

// Show login required modal
function showLoginModal(action) {
  const modal = document.getElementById("loginModal");
  if (!modal) {
    createLoginModal();
  }
  
  document.getElementById("loginModal").classList.add("active");
}

// Create login modal if it doesn't exist
function createLoginModal() {
  const modal = document.createElement("div");
  modal.id = "loginModal";
  modal.className = "login-modal";
  modal.innerHTML = `
    <div class="login-modal-content">
      <div class="modal-icon">🔐</div>
      <h2>Login Required</h2>
      <p>You need to be logged in to perform this action. Please login or create an account to continue.</p>
      <div>
        <a href="login.html?redirect=${encodeURIComponent(window.location.pathname)}" class="btn">Login Now</a>
        <a href="#" onclick="closeLoginModal()" class="btn btn-secondary">Cancel</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeLoginModal();
    }
  });
}

function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

// Update navigation based on login state
function updateNavigation() {
  const authNavItem = document.getElementById("auth-nav-item");
  
  if (!authNavItem) return;
  
  if (isLoggedIn()) {
    const user = getCurrentUser();
    authNavItem.innerHTML = `
      <div class="user-menu">
        <div class="user-avatar" onclick="toggleUserMenu()">
          <span class="user-name">${user.name}</span>
        </div>
        <div class="dropdown-menu" id="userDropdown">
          <a href="profile.html">👤 My Profile</a>
          <a href="my-issues.html">📝 My Reports</a>
          <a href="settings.html">⚙️ Settings</a>
          <div class="dropdown-divider"></div>
          <a href="#" onclick="logout()" class="logout">🚪 Logout</a>
        </div>
      </div>
    `;
  } else {
    authNavItem.innerHTML = `
      <a href="login.html" class="auth-btn" id="loginBtn">Login</a>
    `;
  }
}

// Toggle user dropdown menu
function toggleUserMenu() {
  const dropdown = document.getElementById("userDropdown");
  if (dropdown) {
    dropdown.classList.toggle("active");
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const userMenu = document.querySelector(".user-menu");
  const dropdown = document.getElementById("userDropdown");
  
  if (userMenu && dropdown && !userMenu.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});

// Initialize auth on page load
document.addEventListener("DOMContentLoaded", () => {
  updateNavigation();
  
  // Update "Report Issue" buttons based on login state
  const reportButtons = document.querySelectorAll('a[href="report.html"]');
  reportButtons.forEach(button => {
    button.onclick = (e) => {
      e.preventDefault();
      requireLogin("report");
    };
  });
});

// Export user data for API calls
function getAuthToken() {
  // For now, we'll use phone number as token
  // In production, this should be a JWT from backend
  const user = getCurrentUser();
  return user ? user.phone : null;
}

// Store backend token if you get one from API
function setAuthToken(token) {
  localStorage.setItem("token", token);
}
