// module-14/src/reducers/bookReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [], // Array of book objects, e.g., { id: 1, title: 'Book Title', author: 'Author Name' }
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        removeBook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
        updateBook: (state, action) => {
            const { id, updates } = action.payload;
            const book = state.books.find(book => book.id === id);
            if (book) {
                Object.assign(book, updates);
            }
        },
    },
});

export const { addBook, removeBook, updateBook } = bookSlice.actions;
export default bookSlice.reducer;