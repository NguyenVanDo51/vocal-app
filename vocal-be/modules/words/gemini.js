const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'Nhận một từ tiếng anh, trả về phát âm, ví dụ đơn giản, ý nghĩa tiếng việt theo định dạng:\n{\nmeaning: "xin chào",\npronoun: "[heˈloʊ]",\nexample: "Hello, how are you?"\n}',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function getWordInfo(word) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: "word" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{"meaning": "lời nói", "pronoun": "[wɜːrd]", "example": "The word \\"love\\" has many meanings."}\n\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "school" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{"meaning": "trường học", "pronoun": "[skuːl]", "example": "I go to school every day."}\n\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(word);
  return result.response.text()
}

module.exports = { getWordInfo };
