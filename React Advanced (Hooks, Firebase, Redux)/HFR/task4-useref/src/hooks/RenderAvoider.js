import React, { useState, useRef, useEffect } from 'react';

function RenderAvoider() {
  const [count, setCount] = useState(0); // Causes re-render on change
  const renderCount = useRef(0); // Doesn't cause re-render

  useEffect(() => {
    renderCount.current += 1; // Update ref without re-render
  });

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Count (useState): {count}</h2>
      <h3>Renders (useRef): {renderCount.current}</h3>
      <button onClick={() => setCount(count + 1)} style={{ margin: '5px' }}>
        Increment (Triggers Re-render)
      </button>
      <p>Notice: useRef value updates without re-rendering the component.</p>
    </div>
  );
}

export default RenderAvoider;