"use client";
import { useState } from "react";
import { gql, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider, useQuery, useMutation } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "/api/graphql" }),
  cache: new InMemoryCache(),
});

const GET_TASKS = gql`
  query { getTasks { id title completed } }
`;

const ADD_TASK = gql`
  mutation Add($title: String!) {
    addTask(title: $title) { id title completed }
  }
`;

const DELETE_TASK = gql`
  mutation Delete($id: ID!) {
    deleteTask(id: $id)
  }
`;

const TOGGLE_TASK = gql`
  mutation Toggle($id: ID!) {
    toggleTask(id: $id) { id completed }
  }
`;

function TaskApp() {
  const [taskInput, setTaskInput] = useState("");
  const { loading, data, refetch } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [toggleTask] = useMutation(TOGGLE_TASK);

  const handleSave = async () => {
    if (!taskInput) return;
    await addTask({ variables: { title: taskInput } });
    setTaskInput("");
    refetch();
  };

  if (loading) return <p className="text-center mt-20">Loading tasks...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 text-black font-sans">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Task Manager</h1>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border border-gray-300 p-2 rounded outline-blue-400"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a new task..."
          />
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded font-medium">
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {data?.getTasks.map((t: any) => (
            <li key={t.id} className="p-3 bg-white rounded border border-gray-100 shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.completed}
                  className="w-5 h-5 cursor-pointer"
                  onChange={async () => {
                    await toggleTask({ variables: { id: t.id } });
                    refetch();
                  }}
                />
                <span className={t.completed ? "line-through text-gray-400" : "text-gray-800"}>
                  {t.title}
                </span>
              </div>
              <button
                onClick={async () => {
                  await deleteTask({ variables: { id: t.id } });
                  refetch();
                }}
                className="text-red-500 hover:bg-red-50 p-1 rounded"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ApolloProvider client={client}>
      <TaskApp />
    </ApolloProvider>
  );
}