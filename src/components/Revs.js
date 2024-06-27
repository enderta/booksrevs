import React, {useEffect, useState} from 'react';
import {Card, Container, Row, Col, Button, CardSubtitle} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

const Revs = () => {
    const [revs, setRevs] = useState([]);
    const [userName, setUserName] = useState('');
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
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
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/user/'+user_id, {
            headers: { Authorization: token },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUserName(data.data.username);
            })
    }, [])

    console.log(revs)

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
                                        <Card.Title>{rev.review_text}</Card.Title>
                                        <Card.Text>
                                            <StarRatings
                                                rating={rev.rating}
                                                starRatedColor="red"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="30px"
                                            />
                                            <CardSubtitle>By: {userName}</CardSubtitle>

                                        </Card.Text>
                                        {localStorage.getItem('role')==='admin' && (
                                        <Button variant={"outline-danger"} onClick={() => {
                                            fetch('http://localhost:3000/api/rev/' + rev.id, {
                                                method: 'DELETE',
                                                headers: {Authorization: token},
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    if (data.message) {
                                                        alert(data.message);
                                                    } else {
                                                        setRevs(revs.filter(r => r.id !== rev.id));
                                                    }
                                                });

                                        }
                                        }>Delete</Button>
                                        )}

                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (

                    <h1 className="text-center" style={{color: "goldenrod"}}>
                        {
                           "No reviews available for this book. Be the first to review!"
                        }
                    </h1>

                )}
        </Container>
);
};

export default Revs;