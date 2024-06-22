import React, { useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";

const AddBook = () => {
    const [book, setBook] = useState({ title: '', author: '', description: '', pic_url: '' });

    const handleChanges = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify(book),
        });
        if (response.status === 200) {
            await response.json();
            window.location = '/books';
        } else {
            const data = await response.json();
            alert(data.message);
        }
    }

    return (
        <div style={{backgroundColor:"black"}}>
            <Button variant={"primary"} type={"submit"} style={{backgroundColor: 'goldenrod', margin:"10px",border: 'none'}} onClick={() => {
                window.location = '/books';
            }
            }>
                Back to Books
            </Button>

            <br/>
            <Card style={{ backgroundColor: '#000', borderColor: '#000', color: 'white', width: '50%', margin: 'auto' }}>
                <Card.Body>
                    <Card.Title>Add Book</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        {['title', 'author', 'description', 'pic_url'].map(field => (
                            <Form.Group className="mb-3" key={field}>
                                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                                <Form.Control type="text" placeholder={`Enter ${field}`} name={field} onChange={handleChanges} />
                            </Form.Group>
                        ))}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AddBook;