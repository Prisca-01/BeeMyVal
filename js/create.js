
// Navigation functions: Handles switching views within the dashboard
function showSection(sectionId) {
  // Hide the Main Menu Grid and Welcome Banner
  document.getElementById("dashboard-menu").classList.add("hidden");
  document.querySelector(".welcome-banner").classList.add("hidden");

  // Show the requested section (Create or Status)
  document.getElementById(sectionId).classList.remove("hidden");

  // If opening the status section, draw the list of cards
  if (sectionId === "status-section") {
    const messages = JSON.parse(
      localStorage.getItem("beemyval_messages") || "[]"
    );
    const filteredMessages = messages.filter(
      (msg) => msg.userName === localStorage.getItem("beemyval_user")
    );
    renderStatusList(filteredMessages);
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

// Create and Render the HTML for the status cards
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

function submitMessage(event) {
  if (event) event.preventDefault();
  // save message to localStorage
  const recipient = document.getElementById("receiver").value;
  const message = document.getElementById("message").value;
  const music = document.getElementById("music-choice").value;
  const userName = localStorage.getItem("beemyval_user");

  if (!recipient || !message) {
    alert("Please fill in both the recipient and message fields.");
    return;
  }

  const uniqueId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  const newData = {
    id: uniqueId,
    recipient,
    date: new Date().toISOString().split("T")[0],
    status: "pending",
    message,
    music,
    userName: userName || "Anonymous",
  };

  // store in localstorage for now
  const existingMessages = JSON.parse(
    localStorage.getItem("beemyval_messages") || "[]"
  );
  localStorage.setItem(
    "beemyval_messages",
    JSON.stringify([...existingMessages, newData])
  );

  // Generate custom link
  const baseUrl =
    window.location.origin +
    window.location.pathname.replace("create.html", "");
  const customLink = `${baseUrl}valrequest.html?id=${uniqueId}`;

  // Update the link input field
  const linkInput = document.getElementById("generated-link");
  if (linkInput) {
    linkInput.value = customLink;
  }

  alert(
    "Your message has been sent! You can now copy the link from the preview section."
  );

  // Reset form but don't go back to home immediately so they can copy the link
  // document.getElementById("valentine-form").reset();
  // showHome();
}

// Runs when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Personalized Welcome Message
  const userName = localStorage.getItem("beemyval_user");
  const displayElement = document.getElementById("user-display-name");
  if (userName && displayElement) {
    displayElement.textContent = userName;
  }

  // Preview Logic (Two-Card Update)
  const previewBtn = document.getElementById("preview-btn");
  const previewSection = document.getElementById("live-preview");

  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      const recipient = document.getElementById("receiver").value;
      const message = document.getElementById("message").value;
      const music = document.getElementById("music-choice").value;

      // Preview Card 1: The Message
      document.getElementById("preview-recipient-1").textContent = `${
        recipient || "[Name]"
      }`;
      document.getElementById("preview-text").textContent =
        message || "Your message will appear here...";

      const audio1 = document.getElementById("preview-audio-player-1");
      const audio2 = document.getElementById("preview-audio-player-2");

      [audio1, audio2].forEach((player) => {
        if (player) {
          const source = player.querySelector("source");
          source.src = `assets/audio/${music}`;
          player.load();
        }
      });

      previewSection.classList.remove("hidden");
      previewSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  const valentineForm = document.getElementById("valentine-form");
  if (valentineForm) {
    valentineForm.addEventListener("submit", submitMessage);
  }

  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const linkInput = document.getElementById("generated-link");
      if (linkInput) {
        navigator.clipboard
          .writeText(linkInput.value)
          .then(() => {
            alert("Link copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy link: ", err);
          });
      }
    });
  }
});
