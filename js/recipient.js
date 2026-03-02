document.addEventListener("DOMContentLoaded", () => {
  // Get the message ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const messageId = urlParams.get("id");

  // Fetch all messages from storage
  const allMessages = JSON.parse(
    localStorage.getItem("beemyval_messages") || "[]"
  );

  // Find message that matches the ID
  const myMessage = allMessages.find((msg) => msg.id === messageId);

  if (!myMessage) {
    document.querySelector(".valentine").innerHTML = `
        <section class="valentine__card">
        <h2 class="valentine__title">Oops!</h2>
        <p class="valentine__text">We couldn't find this Valentine request. It might have expired or been deleted.</p>
        <a href="index.html" class="valentine__button valentine__button--primary">Create Your Own</a>
      </section>
        `;
    return;
  }

  // Update UI with retrieved data
  const receiverName = document.querySelector(".valentine__name");
  const messageText = document.querySelector(".valentine__text");
  const audioPlayers = document.querySelectorAll(".valentine__audio");

  receiverName.textContent = myMessage.recipient + ",";

  messageText.textContent = myMessage.message;

  audioPlayers.forEach((player) => {
    const source = player.querySelector("source");
    source.src = `assets/audio/${myMessage.music}`;
    player.load();
  });

  // Show Question Card
  const questionBtn = document.querySelector(".valentine__button--primary");
  const messageCard = document.querySelector(".valentine__card--message");
  const questionCard = document.querySelector(".valentine__card--question");

  questionBtn.addEventListener("click", () => {
    messageCard.classList.add("hidden");
    questionCard.classList.remove("hidden");
  });

  // Handle Acceptance/Declined
  const yesBtn = document.querySelector(".valentine__button--yes");
  const noBtn = document.querySelector(".valentine__button--no");

  yesBtn.addEventListener("click", () => updateStatus(messageId, "accepted"));
  noBtn.addEventListener("click", () => updateStatus(messageId, "declined"));
});

// Update the status in localStorage
function updateStatus(id, newStatus) {
  const allMessages = JSON.parse(
    localStorage.getItem("beemyval_messages") || "[]"
  );
  const index = allMessages.findIndex((msg) => msg.id === id);

  if (index !== -1) {
    allMessages[index].status = newStatus;
    localStorage.setItem("beemyval_messages", JSON.stringify(allMessages));
  }

  const container = document.querySelector(".valentine");

  if (newStatus === "accepted") {
    startHearts();

    container.innerHTML = `
      <section class="valentine__card animate__bounceIn">
        <img src="images/bee.png" class="valentine__bee" />
        <h2 class="valentine__title">It's a Date! 💖</h2>
        <p class="valentine__text">Your response has been sent. Get ready for a sweet Valentine's!</p>
      </section>
    `;
  } else {
    startRain();

    container.innerHTML = `
      <section class="valentine__card" style="filter: grayscale(0.8);">
        <img src="images/bee.png" class="valentine__bee" />
        <h2 class="valentine__title">Aww, maybe next time?</h2>
        <p class="valentine__text">Your response has been recorded. Friends are sweet too! 🍯</p>
      </section>
    `;
  }
}

// Heart Effect for the "Yes" button
function startHearts() {
  const heartContainer = document.createElement("div");
  heartContainer.className = "heart-container";
  document.body.appendChild(heartContainer);

  const heartTypes = ["💖", "💗", "💘", "💝", "❤️"];

  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.className = "heart-drop";
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    heart.style.fontSize = Math.random() * 1.5 + 1 + "rem";
    heart.style.opacity = Math.random();
    
    heartContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
  }
}

// Rain effect for "Maybe later" button
function startRain() {
  const rainContainer = document.createElement("div");
  rainContainer.className = "rain-overlay";
  document.body.appendChild(rainContainer);

  for (let i = 0; i < 50; i++) {
    const drop = document.createElement("div");
    drop.className = "raindrop";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = Math.random() * 2 + 1 + "s";
    drop.style.opacity = Math.random();
    rainContainer.appendChild(drop);
  }
}