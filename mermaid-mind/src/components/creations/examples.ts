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
  boundedbuffer: `flowchart TD
    subgraph Bounded_Buffer_Problem
        A[Bounded Buffer Problem] -->|Producer| B[Producer Process]
        A -->|Consumer| C[Consumer Process]
    end

    subgraph Producer_Process
        B -->|Produces Data| D[Data Item]
        D -->|Insert into Buffer| E[Bounded Buffer]
    end

    subgraph Consumer_Process
        C -->|Check for Data| E
        E -->|Remove Data| F[Data Item]
        F -->|Consume Data| C
    end

    %% Styling
    classDef stadium fill:#fc9,stroke:#333,stroke-width:2px;
    classDef subroutine fill:#cf6,stroke:#333,stroke-width:2px;

    class A,B,C,D,F stadium;
    class E subroutine;

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
  hadoop: `graph TD
    subgraph Hadoop_Architecture
        A[Hadoop Ecosystem] -->|Distributed Storage| B{HDFS};
        A -->|Distributed Processing| C{YARN};
        A -->|Data Processing| D{MapReduce};
    end
    B -->|Data Storage| E[Data Nodes];
    B -->|Metadata Storage| F[NameNode];
    C -->|Resource Management| G[ResourceManager];
    C -->|Task Management| H{NodeManagers};
    D -->|Data Processing| I{Map Tasks};
    D -->|Data Aggregation| J{Reduce Tasks};
    H -->|Task Execution| I;
    H -->|Task Execution| J;
    I -->|Shuffle and Sort| J;
    J -->|Output Results| K[Output Data];
    K -->|Processed Data| A;`,
  deadlock: `graph TD;
    subgraph Deadlock_Conditions
        A[Multiple Processes] -->|Requesting Resources| B[Holding Resources];
        B -->|Circular Wait| C[Deadlock];
    end
    subgraph Deadlock_Example
        D{{Process 1}} -->|Requests Resource A| E{{Resource A}};
        E -->|Holding Resource B| F{{Process 2}};
        F -->|Requests Resource C| G{{Resource C}};
        G -->|Holding Resource A| D;
    end
    subgraph Deadlock_Prevention
        H[Prevent Circular Wait] -->|Resource Ordering| I[Assign Unique Order];
        I -->|Request Resources in Order| J[Avoid Deadlock];
    end
    subgraph Deadlock_Detection
        K[Detect Deadlock] -->|Resource Allocation Graph| L[Identify Cycles];
        L -->|Rollback Processes| M[Recover from Deadlock];
    end
    subgraph Deadlock_Recovery
        N[Break Deadlock] -->|Process Termination| O[Kill Processes];
        N -->|Resource Preemption| P[Force Release Resources];
    end`,
  trcp: `graph TD;
    subgraph Client_Request
        A[Client Request] -->|Sends Request| B[Next.js Server];
    end
    subgraph Next.js_Server
      B -->|Receives Request| C[trcp Middleware];
      C -->|Processes Request| D[trcp Function];
      D -->|Handles Request| E[Next.js Router];
      E -->|Renders Response| B;
    end
    B -->|Returns Response| A;`,

  pagingSequence: `sequenceDiagram
    participant User
    participant OS
    participant Memory
    User->>OS: Request page
    OS->>Memory: Check if page is in memory
    alt Page is in memory
        Memory->>OS: Page found
        OS->>User: Return page
    else Page is not in memory
        OS->>Memory: Page fault
        Memory->>OS: Load page from disk
        OS->>Memory: Update page table
        OS->>User: Return page
    end
    OS->>Memory: Update page table
    User->>OS: Continue using page
    OS->>Memory: Use page`,
};

const base = `https://raw.githubusercontent.com/adimail/mermaid-editor/main/mermaid-mind/src/components/creations/media/`;

export const creations = [
  {
    name: "HTTP",
    code: "http",
    imageSrc: `${base}http.png`,
  },
  {
    name: "Water Jug Problem",
    code: "waterjug",
    imageSrc: `${base}waterjug.png`,
  },
  {
    name: "Redis",
    code: "redis",
    imageSrc: `${base}redis.png`,
  },
  {
    name: "GraphQL",
    code: "graphql",
    imageSrc: `${base}graphql.png`,
  },
  {
    name: "Bounded buffer problem",
    code: "boundedbuffer",
    imageSrc: `${base}boundedbuffer.png`,
  },
  {
    name: "how to make Tea",
    code: "tea",
    imageSrc: `${base}tea.png`,
  },
  {
    name: "REST API",
    code: "rest",
    imageSrc: `${base}rest.png`,
  },
  {
    name: "RAGs",
    code: "rag",
    imageSrc: `${base}rag.png`,
  },
  {
    name: "N-Queen Problem",
    code: "nqueen",
    imageSrc: `${base}nqueen.png`,
  },
  {
    name: "Travelling Salseman",
    code: "tsp",
    imageSrc: `${base}tsp.png`,
  },
  {
    name: "Transformers",
    code: "transformer",
    imageSrc: `${base}transformer.png`,
  },
  {
    name: "DevOps",
    code: "devops",
    imageSrc: `${base}devops.png`,
  },
  {
    name: "Hadoop",
    code: "hadoop",
    imageSrc: `${base}hadoop.png`,
  },
  {
    name: "DeadLock",
    code: "deadlock",
    imageSrc: `${base}deadlock.png`,
  },
  {
    name: "TRCP in NextJS",
    code: "trcp",
    imageSrc: `${base}trcp.png`,
  },
  {
    name: "Paging Algorithm",
    code: "pagingSequence",
    imageSrc: `${base}pagingSequence.png`,
  },
];
