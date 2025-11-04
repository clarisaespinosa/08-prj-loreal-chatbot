// Get references to DOM elements
const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("prompt");

// Listen for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  const userText = input.value.trim();
  if (!userText) return;

  // Show user message
  chat.innerHTML += `<div class="message user">${userText}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    // 🔗 Send message to your Cloudflare Worker (not directly to OpenAI)
    const response = await fetch("https://calm-wood-5b06.clarisa-espinosa01.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a friendly, confident assistant representing L’Oréal. Speak elegantly and provide helpful advice about beauty and skincare.",
          },
          { role: "user", content: userText },
        ],
      }),
    });

    const data = await response.json();

    // Show response
    if (data.error) {
      chat.innerHTML += `<div class="message bot">⚠️ ${data.error.message}</div>`;
    } else if (data.choices && data.choices[0]?.message?.content) {
      const reply = data.choices[0].message.content;
      chat.innerHTML += `<div class="message bot">${reply}</div>`;
    } else {
      chat.innerHTML += `<div class="message bot">⚠️ Unexpected response format.</div>`;
    }
  } catch (error) {
    chat.innerHTML += `<div class="message bot">❌ Error: ${error.message}</div>`;
  }

  // Scroll to bottom again
  chat.scrollTop = chat.scrollHeight;
});





