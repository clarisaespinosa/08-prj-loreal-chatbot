const apiKey = "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"; // replace with your key

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

  // Scroll to bottom
  chat.scrollTop = chat.scrollHeight;

  try {
    // Send message to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
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

    if (data.error) {
      chat.innerHTML += `<div class="message bot">⚠️ ${data.error.message}</div>`;
    } else {
      const reply = data.choices[0].message.content;
      chat.innerHTML += `<div class="message bot">${reply}</div>`;
    }
  } catch (error) {
    chat.innerHTML += `<div class="message bot">❌ Error: ${error.message}</div>`;
  }

  // Scroll to bottom again
  chat.scrollTop = chat.scrollHeight;
});


