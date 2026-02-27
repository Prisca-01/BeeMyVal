function showLogin() {
  // redirect to login page
  window.location.href = "login.html";
}

function showDashboard() {
  // redirect to dashboard page
  window.location.href = "create.html";
}

function signup(event) {
  if (event) event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // if email exist decline
  const existingUsers = JSON.parse(
    localStorage.getItem("beemyval_users") || "[]",
  );
  if (existingUsers.some((user) => user.email === email)) {
    alert("Email already exists. Please log in.");
    return;
  }

  // In a real app, you'd send this to the server. For now, we just save it in localStorage.
  const userData = { name, email, password };
  localStorage.setItem(
    "beemyval_users",
    JSON.stringify([...existingUsers, userData]),
  );
  alert("Signup successful! You can now log in.");
  document.getElementById("signup-form").reset();
  showLogin();
}

function login(event) {
  if (event) event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const existingUsers = JSON.parse(
    localStorage.getItem("beemyval_users") || "[]",
  );
  const user = existingUsers.find(
    (user) => user.email === email && user.password === password,
  );

  if (user) {
    localStorage.setItem("beemyval_user", user.name);
    alert(`Welcome back, ${user.name}!`);
    document.getElementById("login-form").reset();
    showDashboard();
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

function logout() {
  localStorage.removeItem("beemyval_user");
  alert("You have been logged out.");
  showLogin();
}

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", signup);
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
