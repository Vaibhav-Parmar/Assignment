import React from 'react';
import Counter from './hooks/counter.js';
import DataFetcher from './hooks/DataFetcher';

function App() {
  return (
    <div className="App">
      <h1>Task 1 & 2: Counter and Data Fetcher</h1>
      <Counter />
      <DataFetcher />
    </div>
  );
}

export default App;