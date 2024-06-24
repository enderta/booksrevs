import React, {useState} from 'react';
import {Button, Card, Form} from 'react-bootstrap';

function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userName === '' || password === '' || email === '') {
            alert('All fields must be filled out');
            return;
        }
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: userName, password, email}),
        });
        const data = await response.json();
        if (data.status === 'success') {
            window.location = '/login';
        } else {
            alert(data.message);
        }
    };

    const handleChanges = (e) => {
        if(e.target.name === 'username') {
            setUserName(e.target.value);
        }
        else if(e.target.name === 'password') {
            setPassword(e.target.value);
        }
        else if(e.target.name === 'email') {
            setEmail(e.target.value);
        }
    }




    return (
        <div className={'bg-dark text-light'} style={{backgroundColor: 'black', minHeight: '100vh'}}>
            <br/>
            <Button variant="primary" style={{backgroundColor: 'goldenrod', border: 'none'}}
                    onClick={() => window.location = '/home'}>Back to Home</Button>
            <div className="bg-dark container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Card className={'bg-dark text-light'}
                              style={{margin: '10px', padding: '10px', opacity: '0.9'}}>
                            <h1 className="text-center" style={{color: 'goldenrod'}}>Register</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" name={'username'}
                                                  onChange={handleChanges}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" name={'password'}
                                                  onChange={handleChanges}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name={'email'}
                                                  onChange={handleChanges}/>
                                </Form.Group>

                                <br/>
                                <div className="d-flex justify-content-between">
                                    <Button variant={'outline-warning'} type="submit">Register</Button>
                                    <Button variant={'outline-warning'} onClick={() => window.location = '/login'}>Have
                                        an account? Login!</Button>
                                </div>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register