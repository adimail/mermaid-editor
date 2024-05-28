export const samples: Record<string, string> = {
  http: `graph TD
    A[Client Browser] -->|1. DNS Lookup| F[DNS Server]
    F -->|2. IP Address| A
    A -->|3. TCP Connection| B[Server]
    B -->|4. TCP Handshake| A
    A -->|5. Send HTTP Request| B
    B -->|6. Process Request| C[Server Application]
    C -->|7. Query/Access| D[Database/Resources]
    D -->|8. Return Data| C
    C -->|9. Generate HTTP Response| B
    B -->|10. Send HTTP Response| A
    A -->|11. Render Content| E[Client Browser]

    subgraph HTTP Request
        direction TB
        G[Request Line] --> H[Headers]
        H --> I[Body]
    end

    subgraph HTTP Response
        direction TB
        J[Status Line] --> K[Headers]
        K --> L[Body]
    end`,
  redis: `graph TD;
    subgraph Client
        A[Client] -->|Sends command| B[Redis Server];
    end
    subgraph Redis_Server
        B -->|Processes command| C{Data};
        C -->|Returns result| B;
    end
    subgraph Data
        C -->|Stores and retrieves data| D[Database];
    end
    B -->|Returns result| A;
`,
  waterjug: `graph TD
    A[Start] --> B[Initialize visited set and queue]
    B --> C[Add 0,0 to visited and queue]
    C --> D{Is queue empty?}
    D -->|No| E[Pop the first state from queue]
    E --> F{Is target achieved?}
    F -->|Yes| G[Construct and return path]
    F -->|No| H[Generate next possible states]
    H --> I{Is state already visited?}
    I -->|No| J[Add state to queue and visited]
    J --> K[Add current state as parent]
    K --> D
    I -->|Yes| D
    D -->|Yes| L[Return None]`,
  tsp: `graph TD;
    A[Cities] --> B(Start);
    B --> C{Unvisited cities exist?};
    C -- Yes --> D(Find nearest city);
    D --> E{Set visited};
    E -- Yes --> F[Add to tour];
    F --> G{All cities visited?};
    G -- No --> D;
    G -- Yes --> H[Add starting city to tour];
    H --> I(End);
    C -- No --> I;`,
  nqueen: `graph TD;
    A(Start) --> B(Initialize board);
    B --> C{All rows placed?};
    C -->|No| D{Try placing queen};
    D --> E{Safe placement?};
    E -->|Yes| F(Move to next row);
    F --> G{Solution found?};
    G -->|Yes| H(Print solution);
    G -->|No| D;
    E -->|No| I(Backtrack);
    I --> J{All columns tried?};
    J -->|Yes| K(Backtrack to previous row);
    J -->|No| D;
    C -->|Yes| L(No solution exists);
    H --> M(End);
    L --> M;
    K --> D;`,
  biryani: `graph TD

Start((Start)) --> Prepare[Prepare Ingredients]
Prepare --> Marinate[Marinate Meat\nand Soak Rice]
Marinate --> Cook[<span style="color:green">Cook Meat\nand Rice Separately</span>]
Cook --> Spices[<span style="color:green">Cook Spices</span>]
Spices --> Layer[<span style="color:green">Layer Cooked Meat\nand Rice</span>]
Layer --> Flavorings[<span style="color:green">Add Flavorings\nand Herbs</span>]
Flavorings --> CookLow[<span style="color:green">Cook on Low Heat</span>]
CookLow --> Rest[<span style="color:green">Let Biryani Rest</span>]
Rest --> End((End))
Cook -.-> Spices
Spices -.-> Layer
Layer -.-> Flavorings
Flavorings -.-> CookLow
CookLow -.-> Rest
`,
  tea: `graph TD

Start((Start)) --> Boil[Boil Water]
Boil -->|Is the water boiled?| BoiledWater{Boiled Water?}
BoiledWater -->|Yes| AddTea[Add Tea Leaves or Tea Bags]
BoiledWater -->|No| BoilAgain[Boil Water Again]
BoilAgain --> Boil

AddTea --> Steep[Steep for a Few Minutes]
Steep --> RemoveTea[Remove Tea Leaves or Tea Bags]
RemoveTea -->|Is the tea removed?| RemovedTea{Tea Removed?}
RemovedTea -->|Yes| AddMilk[Add Milk]
RemovedTea -->|No| Steep

AddMilk -->|Do you like milk?| MilkDecision{Like Milk?}
MilkDecision -->|Yes| AddSugar[Add Sugar]
MilkDecision -->|No| End

AddSugar --> End((End))

%% Add a pun
style Start, Boil, AddTea, Steep, RemoveTea, AddMilk, AddSugar, End fill:#f9f,stroke:#333,stroke-width:4px;
style BoiledWater, RemovedTea, MilkDecision fill:#fff,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
`,
  graphql: `graph TD;
    subgraph Client_Application
        A[Client Application] -->|Sends GraphQL Query| B[GraphQL Server];
    end
    subgraph GraphQL_Server
        B -->|Receives Query| C[Schema];
        C -->|Validates and Parses Query| D[Resolver Functions];
        D -->|Fetches Data| E[Data Sources];
        D -->|Formats Response| B;
        E -->|Returns Data| D;
    end
    B -->|Returns Response| A;
`,
  rag: `graph TD;
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
`,
  rest: `graph TD;
    subgraph Client_Application
        A[Client Application] -->|Sends HTTP Request| B[REST API];
    end
    subgraph REST_API
        B -->|Processes Request| C[Database / External Service];
        C -->|Retrieves or Manipulates Data| B;
        C -->|Returns Response| B;
    end
    B -->|Returns HTTP Response| A;
`,
  transformer: `graph TD;
    subgraph Input_Data
        A[Input Tokens] -->|Embedding| B[Token Embeddings];
    end
    subgraph Self_Attention
        B -->|Attention Mechanism| C[Attention Scores];
        C -->|Weighted Sum| D[Context Vectors];
    end
    subgraph Feed_Forward_Network
        D -->|Feed-Forward Layers| E[Transformed Vectors];
    end
    subgraph Output
        E -->|Softmax| F[Output Probabilities];
    end
`,
  devops: `graph TD;
    subgraph Development
        A[Developers] -->|Code| B[Version Control];
        B -->|Commits| C[Source Code Management];
    end
    subgraph Testing
        C -->|Triggers| D[Automated Testing];
        D -->|Reports| E[Test Results];
    end
    subgraph Deployment
        E -->|Triggers| F[Continuous Integration];
        F -->|Builds| G[Artifacts];
        G -->|Deploys| H[Testing / Staging];
    end
    subgraph Monitoring
        H -->|Monitors| I[Continuous Monitoring];
        I -->|Feedback| A;
    end
`,
};

export const creations = [
  {
    id: 1,
    name: "HTTP",
    code: "http",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/http.png",
  },
  {
    id: 2,
    name: "Water Jug Problem",
    code: "waterjug",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/waterjug.png",
  },
  {
    id: 3,
    name: "Redis",
    code: "redis",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/redis.png",
  },
  {
    id: 4,
    name: "GraphQL",
    code: "graphql",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/graphql.png",
  },
  {
    id: 5,
    name: "How to make Biryani",
    code: "biryani",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/biryani.png",
  },
  {
    id: 6,
    name: "how to make Tea",
    code: "tea",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/tea.png",
  },
  {
    id: 7,
    name: "REST API",
    code: "rest",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/rest.png",
  },
  {
    id: 8,
    name: "RAGs",
    code: "rag",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/rag.png",
  },
  {
    id: 9,
    name: "N-Queen Problem",
    code: "nqueen",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/nqueen.png",
  },
  {
    id: 9,
    name: "Travelling Salseman",
    code: "tsp",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/tsp.png",
  },
  {
    id: 10,
    name: "Transformers",
    code: "transformer",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/transformer.png",
  },
  {
    id: 11,
    name: "DevOps",
    code: "devops",
    imageSrc:
      "https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/devops.png",
  },
];
