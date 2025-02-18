const translateButton = document.getElementById("translateButton");
const swapButton = document.getElementById("swapButton");
const clearButton = document.getElementById("clearButton");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const charCounter = document.getElementById("charCounter");
const historyList = document.getElementById("history-list");

inputText.addEventListener("input", () => {
  charCounter.textContent = `${inputText.value.length} / 5000`;
});

translateButton.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return;

  const from = fromLang.value;
  const to = toLang.value;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=${from}|${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseData.translatedText) {
      outputText.value = data.responseData.translatedText;
      addToHistory(text, data.responseData.translatedText);
    } else {
      outputText.value = "Error: Could not translate.";
    }
  } catch {
    outputText.value = "Error: Check your connection.";
  }
});

swapButton.addEventListener("click", () => {
  const temp = fromLang.value;
  fromLang.value = toLang.value;
  toLang.value = temp;
});

clearButton.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
  charCounter.textContent = "0 / 5000";
});

function addToHistory(original, translation) {
  const li = document.createElement("li");
  li.textContent = `From "${original}" to "${translation}"`;
  historyList.appendChild(li);
}

