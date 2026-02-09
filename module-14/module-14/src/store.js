// module-14/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducers.js'; // We'll define this with createSlice in Step 3

export const store = configureStore({
    reducer: {
        books: bookReducer, // The reducer will manage the 'books' slice of state
    },
});

export default store;