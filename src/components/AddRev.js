import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import StarRatings from 'react-star-ratings';

const AddRev = () => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const id = window.location.pathname.split('/').pop();
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/rev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({book_id: id, user_id, review_text: reviewText, rating}),
        });
        if (response.status === 200) {
            window.location = '/revs/' + id;
        } else {
            const data = await response.json();
            alert(data.message);
        }
    }

    return (
        <Container fluid style={{backgroundColor: '#000'}}>
            <div style={{backgroundColor: "black"}}>
                <Button variant={"outline-danger"} type={"submit"}
                        style={{margin: "10px"}} onClick={() => {
                    window.location = '/books';
                }
                }>
                    Back to Books
                </Button>
                <br/>
                <Card style={{backgroundColor: '#000', borderColor: '#000', color: 'white', width: '50%', margin: 'auto'}}>
                    <Card.Body>
                        <Card.Title>Add Review</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Review</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter review" name="reviewText"
                                              onChange={(e) => setReviewText(e.target.value)}/>
                            </Form.Group>
                            <br/>
                            <Form.Group className="mb-3">
                                <Form.Label>Rating</Form.Label>
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="blue"
                                    changeRating={setRating}
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}

export default AddRev;
