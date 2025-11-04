const WORKER_URL = "https://calm-wood-5b06.clarisa-espinosa01.workers.dev";

const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("prompt");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  chat.innerHTML += `<div class="message user">${userText}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userText })
    });

    const data = await response.json();

    chat.innerHTML += `<div class="message bot">${data.reply}</div>`;
  } catch (error) {
    chat.innerHTML += `<div class="message bot">❌ Error: ${error.message}</div>`;
  }

  chat.scrollTop = chat.scrollHeight;
});





