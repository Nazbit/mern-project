import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './homePage.css';

const HomePage = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken')
    window.location.reload()
    return navigate('/')
  }

  useEffect(() => {
    const decodedUser = getUserInfo();
    console.log('decoded user:', decodedUser);
    setUser(decodedUser)
  }, [])

  console.log('user:', user);

  if (!user) {
    return (
      <div><h4>Log in to view this page.</h4></div>
    );
  }

  const { id, email, username, password, quizScores, isAdmin, date } = user


  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3>Welcome <span className='username'>@{username}</span></h3>
          <table className='table'>
            <tbody>
              <tr>
                <td>User ID:</td>
                <td>{id}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>{password} ( hashed )</td>
              </tr>
              <tr>
                <td>Quiz Scores:</td>
                <td>{quizScores && quizScores.map((score) => (
                  <div key={score.quizId}>
                    <p>Quiz ID: {score.quizId}</p>
                    <p>Score: {score.score}</p>
                  </div>
                ))}</td>
              </tr>
              <tr>
                <td>Is User Admin:</td>
                <td>{isAdmin ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{date ? new Date(date).toLocaleString() : '-'}</td>
              </tr>


            </tbody>
          </table>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button onClick={(e) => handleClick(e)} variant="primary">Log Out</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage;
