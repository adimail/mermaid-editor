import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { env } from "@/env";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = env.GOOGLE_GENERATIVE_AI_API_KEY;

async function runChat(prompt: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.7,
      topK: 0,
      topP: 0.3,
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

    const basePrompt = `You are an MermaidJS AI tool who can generate stunning MermaidJS diagram codes! 
    with proper labels, procedure.

    - Focus on the key elements and their relationships. Clearly identify the main components, entities, or processes involved.
    - Include context labels. Add labels to arrows and connections that explain the interactions or data flow between elements.
    - Be specific about the topic and give details in the requested area of context to generate detailed charts.
    - Include labels on arrows explaining actions and data flow.
    - Create a visually appealing design with clear colors and spacing.
    - The diagrams are for educational purposes.
    - Create a visually appealing Mermaid flowchart diagram with the following elements:
      - stadium-shaped nodes ([]).
      - subroutine-shaped nodes {{}}.
      - curved arrows (===>).

    Only give me the MermaidJS code while keeping following things in mind:
    - avoid including parenthesis
    - Generate code with no syntax errors.
    - Do not include the triple tics. I do not want \`\`\`mermaid at the beginning of the response.
    - using parentheses in node titles can cause syntax errors in Mermaid JS. Parentheses are interpreted by Mermaid as part of its syntax for defining node shapes and types. To avoid such errors, you should avoid parenthesis.

    Here are some examples for diagrams:

    <example 1>
    graph TD
      subgraph Bounded Buffer Problem
          A[Bounded Buffer Problem] -->|Producer| B[Producer Process]
          A -->|Consumer| C[Consumer Process]
      end

      subgraph Producer Process
          B -->|Produces Data| D[Data Item]
          D -->|Insert into Buffer| E[Bounded Buffer]
      end

      subgraph Consumer Process
          C -->|Check for Data| E
          E -->|Remove Data| F[Data Item]
          F -->|Consume Data| C
      end

      %% Styling
      classDef stadium fill:#fc9,stroke:#333,stroke-width:2px;
      classDef subroutine fill:#cf6,stroke:#333,stroke-width:2px;

      class A,B,C,D,F stadium;
      class E subroutine;

    <example 2>
    graph TD;
      subgraph Input_Data
          A[Input Data] -->|Preprocessed| B[Graph Structure];
      end
      subgraph Graph_Structure
          B -->|Node Features| C[Node Embeddings];
          B -->|Edge Features| D[Edge Embeddings];
      end
      subgraph Model
          C -->|Node Embeddings| E[Node Attention];
          D -->|Edge Embeddings| F[Edge Attention];
          E -->|Aggregated Information| G[Graph Attention];
          G -->|Update Node Representations| H[Node Update];
          H -->|New Node Representations| E;
      end
      subgraph Output
          H -->|Final Node Representations| I[Output];
      end

    <example 3>
    classDiagram
      MermaidMind <|-- AIEngine
      MermaidMind <|-- DiagramEditor
      MermaidMind : +generateDiagram()
      MermaidMind : +editDiagram()
      MermaidMind : +saveDiagram()
      AIEngine : +analyzeText()
      AIEngine : +generateMermaidCode()
      DiagramEditor : +renderDiagram()
      DiagramEditor : +provideEditingTools()

    <example 4>
    erDiagram
      USER ||--o{ PROJECT : creates
      USER ||--o{ DIAGRAM : "has access to"
      PROJECT ||--o{ DIAGRAM : includes
      DIAGRAM ||--|{ FILE : "can be exported as"
      FILE ||--|{ TYPE : "has format"
      TYPE {
          STRING name
      }

    Use different colors and clear subgraphs for better organization and readability.
    Add decision nodes if you are drawing graphs to make better graphs.
    Understand the hierarchy in the context and make good diagrams.
    Here is the user query, generate a similar mermaid graph for the query:
    `;

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(basePrompt + prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in runChat:", error);
    throw new Error("Failed to generate Mermaid diagram");
  }
}

export const mermaidRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getMermaidDiagram: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .mutation(async ({ input }) => {
      try {
        const diagram = await runChat(input.query);
        return { mermaid: diagram };
      } catch (error) {
        console.error("Error in getMermaidDiagram:", error);
        throw new Error("Failed to get Mermaid diagram");
      }
    }),
});
