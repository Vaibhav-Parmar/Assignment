// src/hooks/DataFetcher.js
import React, { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data on component mount
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch');
                return response.json();
            })
            .then((json) => {
                setData(json.slice(0, 5)); // Limit to first 5 posts
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []); // Empty dependency array: runs only on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3>Fetched Posts:</h3>
            <ul>
                {data.map((post) => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>: {post.body}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DataFetcher;