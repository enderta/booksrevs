import React, { useState, useEffect } from 'react';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const { token, role } = localStorage;

    useEffect(() => {
        if (token) {
            fetch('http://localhost:3000/api/books', {
                headers: { Authorization: token },
            })
                .then(response => response.json())
                .then(data => setBooks(data.sort((a, b) => a.id - b.id)));
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location = '/home';
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/api/book/${id}`, {
            method: 'DELETE',
            headers: { Authorization: token },
        });
        if (response.status === 200) {
            setBooks(books.filter(b => b.id !== id));
        }
    };

    return (
        <Container fluid style={{backgroundColor: '#000'}}>
            <br/>
            {token && (
                <>
                    <div style={{backgroundColor: '#000',margin:"10px", display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                        {role === 'admin' && (
                            <Link to="/add">
                                <Button variant="outline-primary">Add Book</Button>
                            </Link>
                        )}
                    </div>
                    <h1 className="text-center" style={{color:"goldenrod"}}>Books</h1>
                    <Row xs={1} md={3} className="g-4">
                        {books.map((book) => (
                            <Col key={book.key}>
                                <Card className="cards" style={{margin:"5px",background:"goldenrod"}}>
                                    {book.pic_url && (
                                        <Card.Img src={book.pic_url} alt={book.title} style={{width: '100%', height: '15vw', objectFit: 'cover'}} />
                                    )}
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        {book.author && (
                                            <Card.Text>{book.author}</Card.Text>
                                        )}
                                        <Link to={`/book/${book.id}`}>
                                            <Button variant="primary">Read Reviews</Button>
                                        </Link>
                                        {role === 'admin' && (
                                            <Button variant="outline-danger" style={{float: 'right'}} onClick={() => handleDelete(book.id)}>Delete</Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
};

export default Books;