const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("prompt");

// Tu API key (solo para pruebas locales)
const OPENAI_KEY = "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";

// Envía mensaje
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  // Muestra "typing..." mientras llega la respuesta
  const typingMessage = addMessage("Typing...", "bot", true);

  try {
    const reply = await getBotReply(question);
    typingMessage.textContent = reply;
  } catch {
    typingMessage.textContent = "Oops 😅 — something went wrong!";
  }
});

// Añade mensaje al chat
function addMessage(text, type, isTemp = false) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return isTemp ? div : null;
}

// Llama a OpenAI directamente
async function getBotReply(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
