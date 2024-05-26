/*
 * Install the Generative AI SDK
 *
 * $ pnpm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "Explain what is Mermaid JS and tell its use cases?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Mermaid.js: Visualizing Information with Code\n\nMermaid.js is a JavaScript library that allows you to create **diagrams and flowcharts** directly from text descriptions. It's a powerful tool for visualizing data and processes in a clear and concise manner, and it integrates seamlessly with various platforms like Markdown, HTML, and other web applications.\n\n**How it works:**\n\n* **Text-based input:** You define your diagram using a simple and intuitive grammar similar to Markdown.\n* **Code execution:** Mermaid.js interprets your text code and renders it into an interactive diagram.\n* **Customization:** You can easily customize the appearance of your diagrams with various styling options.\n\n**Use cases of Mermaid.js:**\n\nMermaid.js is a versatile tool with numerous applications. Here are some common use cases:\n\n* **Flowcharts:** Visualize the steps in a process, algorithm, or workflow.\n* **Sequence diagrams:** Represent interactions between different components or actors in a system.\n* **State diagrams:** Illustrate the possible states of a system and transitions between them.\n* **Gantt charts:** Track project timelines, dependencies, and progress.\n* **Class diagrams:**  Depict the relationships between different classes in an object-oriented system.\n* **Entity Relationship Diagrams (ERD):** Visualize the relationships between different entities in a database.\n* **User journey maps:**  Illustrate the steps a user takes when interacting with a product or service.\n* **Technical documentation:** Enhance documentation with clear and informative diagrams.\n* **Presentations and reports:**  Present information visually in a more engaging way.\n\n**Benefits of using Mermaid.js:**\n\n* **Easy to use:** Its simple syntax makes it accessible even to non-technical users.\n* **Highly customizable:** Offers a wide range of styling options for tailoring diagrams to your needs.\n* **Lightweight and performant:** Doesn't require any external dependencies and integrates seamlessly with existing projects.\n* **Interactive diagrams:**  Users can interact with the diagrams by zooming, panning, and hovering for more information.\n* **Versatile:** Can be used in various contexts, from documentation to presentations and technical discussions.\n\n**Examples:**\n\n```mermaid\ngraph LR\n    A[Start] --> B{Decision}\n    B -- Yes --> C[Process]\n    B -- No --> D[End]\n```\n\nThis code will render a simple flowchart with decision point and two possible paths.\n\n**Integration:**\n\nMermaid.js can be easily integrated into your web projects using:\n\n* **Directly in HTML:** Include the library script and define your diagrams in `<div>` tags.\n* **Markdown integration:** Use plugins for popular Markdown editors to render Mermaid diagrams directly within your Markdown files.\n* **Server-side frameworks:** Utilize libraries like `mermaid-cli` for generating diagrams from server-side code.\n\n**In conclusion, Mermaid.js offers a convenient and powerful way to create professional-looking diagrams and flowcharts directly from your text code, enhancing your communication, documentation, and visualization efforts.**",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();
