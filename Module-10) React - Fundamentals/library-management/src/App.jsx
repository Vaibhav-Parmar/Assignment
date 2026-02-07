import React from 'react';
import BooksList from './components/BooksList';
import StudentsList from './components/StudentsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Library Management System</h1>
      <BooksList />
      <StudentsList />
    </div>
  );
}

export default App;