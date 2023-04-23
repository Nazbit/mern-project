import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";


export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (!user) {
    return (
      <ReactNavbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <div style={{backgroundColor: "#8BC34A", padding: "1px", borderRadius: "4px"}}>
              <Nav.Link href="/" style={{color: "white"}}>Get Started</Nav.Link>
            </div>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
            <Nav.Link href="/allSectionsPage">Sections</Nav.Link>
            <Nav.Link href="/allCourses">Courses</Nav.Link>
            <Nav.Link href="/quizPage">Quizzes</Nav.Link> 
          </Nav>
          <Nav>
            <>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </>
          </Nav>
        </Container >
      </ReactNavbar >
    );
  }

  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
          <Nav.Link href="/allSectionsPage">Sections</Nav.Link>
          <Nav.Link href="/allCourses">Courses</Nav.Link>
          <Nav.Link href="/quizPage">Quizzes</Nav.Link> 
          {user.isAdmin && <NavLink to="/formsPage" className="nav-link">Forms</NavLink>}
        </Nav>
        <Nav>
          <NavDropdown title={`@${user.username}`} id="basic-nav-dropdown">
            <NavDropdown.Item href="/privateUserProfile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/" onClick={() => localStorage.removeItem('accessToken')}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container >
    </ReactNavbar >
  );
}
