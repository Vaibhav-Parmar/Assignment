1. Prerequisites
Ensure you have Node.js (v18 or higher) installed on your machine.

2. Installation
Extract the project folder and open it in your terminal.

Install dependencies:
Run the following command to install Next.js, React, Apollo Server, and Apollo Client:

Bash
npm install
(Note: If the node_modules are missing, run npm install @apollo/client @apollo/server @as-integrations/next graphql specifically).

3. Running the Project
Start the development server:

Bash
npm run dev
Once the terminal shows "Ready," open your browser and navigate to:
http://localhost:3000

🛠 Project Features
GraphQL API: Hosted at /api/graphql using Apollo Server.

Querying: Fetches tasks dynamically from a server-side data store.

Mutations:

addTask: Creates a new task.

toggleTask: Updates the completion status (marks as done/undone).

deleteTask: Removes a task from the list.

Reactive UI: Built with React Hooks (useQuery, useMutation) and styled with Tailwind CSS for a modern look.

📂 Project Structure
src/app/api/graphql/route.ts: The Backend. Contains the GraphQL schema (typeDefs) and resolvers.

src/app/page.tsx: The Frontend. Contains the React UI and Apollo Client configuration.