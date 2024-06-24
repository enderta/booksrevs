import React, {useState} from 'react';

const AddRev = () => {

        const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const id = window.location.pathname.split('/').pop();
    const token = localStorage.getItem('token');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/rev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({ title, content, rating, book_id: id }),
        });
        if (response.status === 200) {
            window.location = '/books';
        } else {
            const data = await response.json();
            alert(data.message);
        }
    }

    return (

        <div>

        </div>
    );
};

export default AddRev;
