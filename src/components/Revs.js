import React, {useEffect, useState} from 'react';
import {Card, Container, Row, Col, Button} from 'react-bootstrap';

const Revs = () => {
    const [revs, setRevs] = useState([]);
    const token = localStorage.getItem('token');
    const id = window.location.pathname.split('/').pop();
    useEffect(() => {
        fetch('http://localhost:3000/api/rev/'+id, {
            headers: { Authorization: token },
        })
            .then(response => response.json())
            .then(data => {
                if(data.length > 0){
                    setRevs(data.sort((a, b) => a.id - b.id));
                }
                else {
                    setRevs([{title: 'No reviews yet', content: 'Be the first to review this book!', rating: 0}]);
                }
            });
    }, []);
    return (
        <Container fluid style={{backgroundColor: '#000'}}>
            <div style={{backgroundColor: '#000', margin: "10px"}} className="d-flex justify-content-between">
                <Button variant="outline-danger" onClick={() => {
                    window.location = '/books';
                }
                }>Back to Books</Button>
                <Button variant="outline-primary" onClick={() => {
                    window.location = '/addrev/' + id;
                }
                }>Add Review</Button>
            </div>
                <h1 className="text-center" style={{color: "goldenrod"}}>Reviews</h1>
                {revs.length > 0 ? (
                    <Row xs={1} md={3} className="g-4">
                        {revs.map((rev) => (
                            <Col key={rev.id}>
                                <Card className="cards" style={{margin: "5px", background: "goldenrod"}}>
                                    <Card.Body>
                                        <Card.Title>{rev.title}</Card.Title>
                                        <Card.Text>{rev.content}</Card.Text>
                                        <Card.Text>Rating: {rev.rating}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (

                    <h1 className="text-center" style={{color: "goldenrod"}}>
                        {
                            revs
                        }
                    </h1>

                )}
        </Container>
);
};

export default Revs;