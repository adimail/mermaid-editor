import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { env } from "@/env";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;

async function runChat(prompt: string) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 0,
    topP: 1,
    maxOutputTokens: 2048,
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

  const basePrompt = `You are a Mermaid JS expert. I will give you a situation 
  and you have to create mermaid js diagrams for that situation or a task.

  Only and only give me the mermaid code, nothing else. 
  No markdown or plain text, I am passing this code to an compiler that will 
  generate charts from your response so I dont want any syntax errors. 
  
  Create a visually appealing Mermaid flowchart diagram with the following elements:
  - stadium-shaped nodes ([]).
  - subroutine-shaped nodes {{}}.
  - curved arrows (===>).
  - Use meaningful variable names for nodes and format arrow labels with breaks and spacing.
  - Organize and explain sections of the flowchart using comments %%.
  - Double-check the Mermaid syntax for errors and parenthesis in title name.

  While creating the diagrams, make sure of following things:
  - avoid including parenthesis
  - Generate code with no syntax errors.
  - Do not include the triple tics. I do not want \`\`\`mermaid at the beginning of the response.
  - Just give plain mermaid code without backtics and dont use () parenthesis.
  - We are creating flowcharts to explain processes, so please add proper steps and instructions.

  Here is the user query:
  `;

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(basePrompt + prompt);
  const response = result.response;
  return response.text;
}

export default runChat;
