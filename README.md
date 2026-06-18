**ArchCode: AI-Powered System Design Practice Platform**

ArchCode is an interactive platform for practicing system design problems, building architecture diagrams, and receiving automated feedback through a hybrid evaluation engine powered by Large Language Models,
architecture pattern detection, rule-based analysis, and an architecture linter.
Unlike traditional coding platforms, ArchCode focuses on evaluating architectural thinking. Users can design systems visually, submit solutions, and receive detailed feedback on scalability, reliability,
performance, and architectural correctness.

---

**Why ArchCode Exists:**

System design interviews are fundamentally different from coding interviews.
While platforms exist for Data Structures & Algorithms practice, there is no equivalent experience for system design where engineers can:

- Design architectures visually
- Receive automated feedback
- Learn architecture patterns
- Detect architectural mistakes
- Iterate rapidly

ArchCode aims to become a "LeetCode equivalent for System Design."

---

**Key Features:**

*Interactive Architecture Playground

- Drag-and-drop architecture components
- Visual system design creation
- Dynamic node connections
- Architecture templates
- Real-time editing experience

*AI-Powered Evaluation Engine

- Gemini-based architecture evaluation
- Structured scoring
- Detailed feedback generation
- Strengths and weaknesses analysis
- Improvement recommendations

*Architecture Pattern Detection Engine--Automatically detects common architecture patterns such as:

- API Gateway
- Cache Aside
- Centralized Authentication
- Async Processing
- Microservices

*Architecture Linter Engine--Performs static architecture analysis and identifies:

- Single Points of Failure
- Missing Caching Layers
- Scalability Risks
- Missing Load Balancers
- Reliability Issues

*Real-Time Evaluation Updates

-Server-Sent Events (SSE) stream evaluation progress directly to the frontend.
-Production-Grade Queue Processing
-Architecture evaluations are processed asynchronously through BullMQ and Redis, preventing request blocking and improving system responsiveness.

*Authentication & Security

- JWT Authentication
- Refresh Tokens
- Refresh Token Rotation
- Replay Attack Protection
- Protected Routes
- Secure Session Handling

---

**Architecture Overview:**

                ┌──────────────────┐
                │      Client      │
                │   Next.js App    │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │  Express API     │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ BullMQ Queue     │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Queue Worker     │
                └────────┬─────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼

  Gemini AI      Pattern Engine    Linter Engine

          └──────────────┼──────────────┘
                         ▼
                ┌──────────────────┐
                │ PostgreSQL       │
                │ Prisma ORM       │
                └──────────────────┘

---

**Request Lifecycle:**

User submits architecture ---> Frontend API Request ---> Submission Created ---> Job Added To Queue ---> Worker Picks Job
---> AI Evaluation ---> Pattern Detection ---> Architecture Linting ---> Result Stored ---> SSE Stream Updates UI.

---

**Queue Lifecycle:**

PENDING ---> PROCESSING  --- >COMPLETED

  OR

PROCESSING ---> FAILED ---> RETRY ---> DEAD LETTER QUEUE(DLQ)

---

**Authentication Flow:**

Login ---> Generate Access Token/Generate Refresh Token ---> Protected API Access ---> Access Token Expired --->
Refresh Token Rotation ---> New Access Token.

---

**Tech Stack:**

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Flow

Backend:
- Node.js
- Express
- TypeScript

Database:
- PostgreSQL
- Prisma ORM

Queue Infrastructure:
- Redis
- BullMQ

AI Layer:
- Gemini 2.5

Realtime Communication:
- Server Sent Events (SSE)

Authentication:
- JWT
- Refresh Tokens

---

**Scalability Strategy:**

ArchCode is designed around asynchronous processing.
Instead of evaluating architectures during API requests:

1. Requests are accepted instantly.
2. Evaluation jobs are queued.
3. Workers process jobs independently.
4. Results are streamed asynchronously.

**Benefits:**

- Higher throughput
- Lower API latency
- Better user experience
- Horizontal worker scaling

---

**Engineering Tradeoffs:**

1) Why SSE instead of WebSockets?

Chosen because:

- Simpler infrastructure
- Lower operational complexity
- Perfect fit for one-way evaluation updates

Tradeoff:

- No bidirectional communication

---

2) Why Queue-Based Processing?

Chosen because:

- AI requests are slow
- Prevents API blocking
- Improves responsiveness

Tradeoff:

- Eventual consistency

---

3) Why Hybrid Evaluation?

Chosen because:

- LLMs provide qualitative feedback
- Rule engines provide deterministic validation
- Pattern detection improves explainability

Tradeoff:

- More implementation complexity

---

**Screenshots:**

## Landing Page
![Landing page](./assets/landing-page.png)

## Architecture Playground
![Architecture Playground](./assets/architecture-patterns-and-issues.png)

## Real-Time Evaluation
![Real-Time Evaluation](./assets/ai-evaluation.png)

## Pattern Detection Results
![Pattern Detection Results](./assets/pattern-detection.png)

## Architecture Linter Results
![Architecture Linter Results](./assets/detected-issues.png)

## Signup Page
![ Signup Page](./assets/signup-page.png)

---

**Local Setup:**

*Clone Repository:

-git clone <repository-url>
cd archcode

*Backend:

-cd server
-npm install
-npm run dev

*Frontend:

-cd client
-npm install
-npm run dev

*Environment Variables

Backend-

DATABASE_URL= , 
JWT_ACCESS_SECRET= ,
JWT_REFRESH_SECRET= ,
GEMINI_API_KEY= ,
REDIS_HOST= ,
REDIS_PORT= ,

---

**Future Improvements:**

- Multi-Model AI Evaluation
- Collaborative Architecture Reviews
- Team Design Sessions
- Architecture Versioning
- Analytics Dashboard
- RAG-Based Learning Recommendations
- Kubernetes Deployment
- Distributed Worker Pools

---

**Project Overview:**

*ArchCode demonstrates practical experience with:*

- Distributed Systems
- Queue-Based Architectures
- AI Integration
- Real-Time Streaming
- Authentication Security
- Scalable Backend Design
- Pattern Detection Systems
- Static Analysis Engines
- Production-Oriented Engineering

The project combines system design, backend engineering, frontend architecture, distributed processing, and AI-powered evaluation into a single platform making it significantly more complex
than traditional CRUD applications.
