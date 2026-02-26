// 1. Mock data
const mockRequests = [
  { recipient: "Rose", date: "2026-02-14", status: "accepted" },
  { recipient: "Amaka", date: "2026-02-12", status: "pending" },
  { recipient: "My love", date: "2026-02-10", status: "declined" },
];

// 2. Runs when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Personalized Welcome Message
  const userName = localStorage.getItem("beemyval_user");
  const displayElement = document.getElementById("user-display-name");
  if (userName && displayElement) {
    displayElement.textContent = userName;
  }

  // Preview Logic
  const previewBtn = document.getElementById("preview-btn");
  const previewSection = document.getElementById("live-preview");

  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      const recipient = document.getElementById("receiver").value;
      const message = document.getElementById("message").value;

      document.getElementById("preview-recipient").textContent = `Dear ${
        recipient || "[Name]"
      }`;
      document.getElementById("preview-text").textContent =
        message || "Your message will appear here...";

      previewSection.classList.remove("hidden");
      previewSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// 3. Navigation functions: Handles switching views within the dashboard
function showSection(sectionId) {
  // Hide the Main Menu Grid and Welcome Banner
  document.getElementById("dashboard-menu").classList.add("hidden");
  document.querySelector(".welcome-banner").classList.add("hidden");

  // Show the requested section (Create or Status)
  document.getElementById(sectionId).classList.remove("hidden");

  // If opening the status section, draw the list of cards
  if (sectionId === "status-section") {
    renderStatusList(mockRequests);
  }
}

function showHome() {
  // Hide all content sections (Create and Status)
  document
    .querySelectorAll(".content-section")
    .forEach((sec) => sec.classList.add("hidden"));

  // Show the Menu and Welcome Banner again
  document.getElementById("dashboard-menu").classList.remove("hidden");
  document.querySelector(".welcome-banner").classList.remove("hidden");
}

// 4. Create and Render the HTML for the status cards
function renderStatusList(requests) {
  const messageList = document.getElementById("messageList");
  const emptyState = document.getElementById("emptyState");

  if (!messageList || !emptyState) return;

  if (requests.length === 0) {
    emptyState.style.display = "block";
    messageList.innerHTML = "";
    return;
  }

  emptyState.style.display = "none";
  messageList.innerHTML = requests
    .map(
      (req) => `
    <div class="message-card">
      <div class="card-info">
        <h3>To: ${req.recipient}</h3>
        <small>Sent on: ${req.date}</small>
      </div>
      <span class="status status-${req.status}">${req.status}</span>
    </div>
  `
    )
    .join("");
}
