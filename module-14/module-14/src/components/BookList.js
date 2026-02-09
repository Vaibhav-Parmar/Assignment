// module-14/src/components/BookList.js
import React from 'react'; // Add this if missing
import { useSelector, useDispatch } from 'react-redux';
import { removeBook } from '../reducers/bookReducers';

const BookList = () => {  // Ensure this is a functional component (arrow function)
    const books = useSelector(state => state.books.books);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeBook(id));
    };

    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    {book.title} by {book.author}
                    <button onClick={() => handleRemove(book.id)}>Remove</button>
                </li>
            ))}
        </ul>
    );
};

export default BookList;