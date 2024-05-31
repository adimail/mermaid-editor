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
    - Double-check the Mermaid syntax for errors and parenthesis in title name.

    While creating the diagrams, make sure of following things:
    - avoid including parenthesis
    - Generate code with no syntax errors.
    - Do not include the triple tics. I do not want \`\`\`mermaid at the beginning of the response.
    - using parentheses in node titles can indeed cause syntax errors in Mermaid JS. Parentheses are interpreted by Mermaid as part of its syntax for defining node shapes and types. To avoid such errors, you should either:

      1. Escape Parentheses: Use backslashes to escape the parentheses.
        - Example: A["Node with \(parentheses\)"]

      2. Use Different Characters: Replace parentheses with other characters or symbols that do not conflict with Mermaid's syntax.

      Here is an example of a flowchart node with escaped parentheses:

      graph TD
          A["Node with \(parentheses\)"]
          B["Another node"]
          A --> B

      Here is an example of a good graph:

      <exammple 1>
      RAG explanation

      flowchart TD
        subgraph Input_Data
            A[Input Data] -->|Preprocessed| B[Graph Structure]
        end

        subgraph Graph_Structure
            B -->|Node Features| C[Node Embeddings]
            B -->|Edge Features| D[Edge Embeddings]
        end

        subgraph Model
            C -->|Node Embeddings| E[Node Attention]
            D -->|Edge Embeddings| F[Edge Attention]
            E -->|Aggregated Information| G[Graph Attention]
            G -->|Update Node Representations| H[Node Update]
            H -->|New Node Representations| E
        end

        subgraph Output
            H -->|Final Node Representations| I[Output]
        end

        %% Styling
        classDef stadium fill:#fc9,stroke:#333,stroke-width:2px;
        classDef subroutine fill:#cf6,stroke:#333,stroke-width:2px;

        class A,B,C,D,H stadium;
        class E,F,G,I subroutine;


        <example 2>
        GraphQL

        flowchart TD
          subgraph Client_Application
              A[Client Application] -->|Sends GraphQL Query| B[GraphQL Server]
          end

          subgraph GraphQL_Server
              B -->|Receives Query| C[Schema]
              C -->|Validates and Parses Query| D[Resolver Functions]
              D -->|Fetches Data| E[Data Sources]
              D -->|Formats Response| B
              E -->|Returns Data| D
          end

          B -->|Returns Response| A

          %% Styling
          classDef stadium fill:#f9c,stroke:#333,stroke-width:2px;
          classDef subroutine fill:#6cf,stroke:#333,stroke-width:2px;

          class A,B,E stadium;
          class C,D subroutine;

    Make diagrams following a similar structure and styling pattern to the abouve, with distinct colors and clear subgraphs for better organization and readability.

    Here is the user query, generate a similar mermaid graph for the query:
    `;

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(basePrompt + prompt);
    const response = await result.response;
    console.log("Received response:", response.text);
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
