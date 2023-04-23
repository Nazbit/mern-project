import React from 'react';
import Card from 'react-bootstrap/Card';
import './landingPage.css'; // Import the CSS file for this component

const Landingpage = () => {
  return (
    <div className="card-container">
      <Card style={{ width: '30rem', border: '2px solid black' }}>
        <Card.Body>
          <Card.Title>Data Structure and Algorithms E-learning Platform</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">A starting point for an application.</Card.Subtitle>
          <Card.Text></Card.Text>
          <Card.Link href="/signup">Sign Up</Card.Link>
          <Card.Link href="/login">Login</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Landingpage;