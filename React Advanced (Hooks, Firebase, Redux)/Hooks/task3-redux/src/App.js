import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Task 3: Redux Counter</h1>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())} style={{ margin: '5px' }}>Increment</button>
      <button onClick={() => dispatch(decrement())} style={{ margin: '5px' }}>Decrement</button>
    </div>
  );
}

export default App;