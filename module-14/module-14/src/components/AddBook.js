// module-14/src/components/AddBook.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../reducers/bookReducers';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {  // Functional component
    const [title, setTitle] = useState('');  // Hooks at top level
    const [author, setAuthor] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && author) {
            const newBook = {
                id: Date.now(),
                title,
                author,
            };
            dispatch(addBook(newBook));
            setTitle('');
            setAuthor('');
            navigate('/books');
        }
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;