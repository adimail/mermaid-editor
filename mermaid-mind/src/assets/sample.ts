export const samples: Record<string, string> = {
  Flow: `graph TD
    A[Start] --> B[Enter Site]
    B --> C[Dashboard]
    
    subgraph User
        C --> E[Edit Markdown/Mermaid Files]
        C --> G[Download Chart/Markdown]
        C --> H[View Saved Projects]
    end
    
    B --> I[Sign Up/Login]
    
    subgraph Registered User
        I --> J[Use Mermaid Mind AI]
    end

    E --> O[Enter/Edit Markdown or Mermaid Code]
    O --> P[Preview Changes]
    P --> Q[Save Changes]

    G --> R[Select Chart Format PNG/SVG or Markdown .md]
    R --> S[Download File]

    H --> V[Select Project]
    V --> W[View Charts/Markdown in Project]

    J --> X[Get AI-Generated Mermaid Code/Markdown]
    X --> Y[Edit AI-Generated Code]
    Y --> Z[Save AI-Generated Content]`,
  Sequence: `sequenceDiagram
    User->>+MermaidMind: Request AI-Generated Mermaid Diagram
    MermaidMind-->>+User: Provides Mermaid Code
    User->>+MermaidMind: Can you refine this diagram?
    MermaidMind-->>-User: Here is the updated version
    User->>+MermaidMind: Thank you!`,
  Class: `classDiagram
    MermaidMind <|-- AIEngine
    MermaidMind <|-- DiagramEditor
    MermaidMind : +generateDiagram()
    MermaidMind : +editDiagram()
    MermaidMind : +saveDiagram()
    AIEngine : +analyzeText()
    AIEngine : +generateMermaidCode()
    DiagramEditor : +renderDiagram()
    DiagramEditor : +provideEditingTools()`,
  State: `stateDiagram-v2
    [*] --> Idle
    Idle --> Generating
    Generating --> [*]
    Generating --> Reviewing
    Reviewing --> Editing
    Editing --> Saving
    Saving --> [*]`,
  Gantt: `gantt
    title Mermaid Mind Project Timeline
    dateFormat  YYYY-MM-DD
    section Development
    Initial Setup           :done, a1, 2024-01-01, 30d
    AI Integration          :active, after a1, 40d
    Testing and QA          :q1, after a1, 20d
    section Deployment
    User Testing            :2024-04-01, 20d
    Final Release           :2024-05-01, 10d`,
  Pie: `pie title Features Usage in Mermaid Mind
    "Diagram Generation" : 50
    "Code Editing" : 20
    "File Download" : 15
    "User Projects" : 15`,
  ER: `erDiagram
    USER ||--o{ PROJECT : creates
    USER ||--o{ DIAGRAM : "has access to"
    PROJECT ||--o{ DIAGRAM : includes
    DIAGRAM ||--|{ FILE : "can be exported as"
    FILE ||--|{ TYPE : "has format"
    TYPE {
        STRING name
    }`,
  Git: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    branch feature/MermaidMind
    checkout feature/MermaidMind
    commit
    commit
    checkout develop
    merge feature/MermaidMind
    commit
    checkout main
    merge develop
    commit`,
  QuadrantChart: `quadrantChart
    title Mermaid Mind Features Impact
    x-axis Low Impact --> High Impact
    y-axis Low Usage --> High Usage
    quadrant-1 Must Keep
    quadrant-2 Needs Improvement
    quadrant-3 Consider Removal
    quadrant-4 Monitor Usage
    Diagram Generation: [0.9, 0.8]
    AI Integration: [0.85, 0.6]
    Code Editing: [0.7, 0.5]
    File Export: [0.4, 0.7]
    User Projects: [0.6, 0.3]`,
  XYChart: `xychart-beta
    title "Mermaid Mind User Growth"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Number of Users" 0 --> 10000
    bar [200, 400, 800, 1500, 3000, 5000, 7000, 8500, 9500, 10000, 9800, 9500]
    line [200, 400, 800, 1500, 3000, 5000, 7000, 8500, 9500, 10000, 9800, 9500]`,
  Block: `block-beta
    columns 3
    doc>"Mermaid Mind Documentation"]:3
    space down1<[" "]>(down) space

  block:e:3
          l["Introduction"]
          m("Key Features of Mermaid Mind")
          r["How to Use"]
  end
    space down2<[" "]>(down) space
    db[("Database")]:3
    space:3
    D space C
    db --> D
    C --> db
    D --> C
    style m fill:#d6d,stroke:#333,stroke-width:4px`,
  UserJourney: `journey
    title Mermaid Mind User Experience
    section Onboarding
      Visit Site: 5: User
      Sign Up: 3: User
      Tour Features: 4: User
    section Diagram Creation
      Enter Text: 5: User
      Generate Diagram: 4: User, AI
      Edit Diagram: 3: User
    section Final Steps
      Save Project: 4: User
      Download Diagram: 2: User
      Share with Team: 3: User`,
};
