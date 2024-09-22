import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/userActions'; // Ensure this is correctly implemented
import { useNavigate } from 'react-router-dom';
import { FaSun } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous error

    try {
      // Dispatch the loginUser action and wait for it to complete
      const response = await dispatch(loginUser({ email, password })).unwrap();
      console.log('Login successful:', response);
      
      // Navigate to the profile page on successful login
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      
      // Handle the error and set an appropriate message
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <FaSun className="mr-2" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
