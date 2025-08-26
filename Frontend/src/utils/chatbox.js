// chatbox.js

const openModal = document.getElementById('openModalChatbox');
const closeModal = document.getElementById('closeModal');
const chatModal = document.getElementById('chatModal');

openModal.addEventListener('click', () => {
  chatModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  chatModal.classList.add('hidden');
});

chatModal.addEventListener('click', (e) => {
  if (e.target === chatModal) {
    chatModal.classList.add('hidden');
  }
});

// Botones dinámicos
document.getElementById("btnHospitals").addEventListener("click", () => searchNearby("hospitals", "🏥 Hospitals"));
document.getElementById("btnFarmacias").addEventListener("click", () => searchNearby("pharmacies", "💊 Pharmacies "));


// Emergencia (solo un mensaje rápido)
document.getElementById("btnEmergencia").addEventListener("click", () => {
  clearChat();
  addMessage("🚨 emergency detected, call 123 immediately.");
});

function searchNearby(type, label) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => success(pos, type, label),
      error
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function success(position, type, label) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  clearChat();
  addMessage(`📍 Location detected, searching ${label.toLowerCase()}...`);

  fetch("http://localhost:3000/places", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lon, type })
  })
    .then(res => res.json())
    .then(data => {
      if (data.places && data.places.length > 0) {
        addMessage(`${label} nearby:`);
        data.places.forEach(p => {
          if (typeof p === "object") {
            addMessage(`- ${p.name} (${p.address || "Address not available"})`);
          } else {
            addMessage(`- ${p}`);
          }
        });
      } else {
        addMessage(`⚠️ I didn't find ${label.toLowerCase()} at the moment.`);
      }
    })
    .catch(err => {
      addMessage(`❌ Error querying ${label.toLowerCase()}.`);
      console.error(err);
    });
}

function error(err) {
  clearChat();
  addMessage("❌ Your location could not be obtained.");
}

function clearChat() {
  const chatBox = document.getElementById("chatMessages");
  chatBox.innerHTML = "";
}

function addMessage(text) {
  const chatBox = document.getElementById("chatMessages");

  const msg = document.createElement("div");
  msg.className = "bg-gray-100 p-2 rounded-lg text-sm max-w-[80%]";
  msg.textContent = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
