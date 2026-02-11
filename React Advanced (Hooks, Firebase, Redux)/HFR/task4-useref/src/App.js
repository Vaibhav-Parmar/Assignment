import React from 'react';
import RenderAvoider from './hooks/RenderAvoider';

function App() {
  return (
    <div className="App">
      <h1>Task 4: Avoiding Re-renders with useRef</h1>
      <RenderAvoider />
    </div>
  );
}

export default App;