// module-14/src/components/BookDetails.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BookDetails = () => {  // Functional component
    const { id } = useParams();  // Hooks at top
    const books = useSelector(state => state.books.books);
    const book = books.find(b => b.id === parseInt(id));

    if (!book) {
        return <div>Book not found.</div>;
    }

    return (
        <div>
            <h2>Book Details</h2>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ID:</strong> {book.id}</p>
        </div>
    );
};

export default BookDetails;