import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

// 1. Data Store
let tasks = [
    { id: "1", title: "Setup Next.js", completed: true },
    { id: "2", title: "Build GraphQL API", completed: false },
];

// 2. Schema
const typeDefs = gql`
  type Task { 
    id: ID!
    title: String!
    completed: Boolean! 
  }

  type Query { 
    getTasks: [Task] 
  }

  type Mutation { 
    addTask(title: String!): Task 
    deleteTask(id: ID!): ID
    toggleTask(id: ID!): Task!
  }
`;

// 3. Resolvers (Logic)
const resolvers = {
    Query: {
        getTasks: () => tasks,
    },
    Mutation: {
        addTask: (_: any, { title }: { title: string }) => {
            const newTask = { id: String(Date.now()), title: title, completed: false };
            tasks.push(newTask);
            return newTask;
        },
        toggleTask: (_: any, { id }: { id: string }) => {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
            }
            return task;
        },
        deleteTask: (_: any, { id }: { id: string }) => {
            tasks = tasks.filter((t) => t.id !== id);
            return id;
        },
    },
};

// 4. Server Initialization
const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };