import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import CourseService from "../utilities/CourseService";

export default function Navbar() {
  const [user, setUser] = useState({})
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setUser(getUserInfo());
    async function fetchCourses() {
      const response = await CourseService.getAllCourses();
      setCourses(response);
    }
    fetchCourses();
  }, []);

  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Start</Nav.Link>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
          <Nav.Link href="/allCourses">Courses</Nav.Link>
          <Nav.Link href="/courseForm">CourseForm</Nav.Link>
          <Nav.Link href="/sectionForm">SectionForm</Nav.Link>
          <Dropdown>
            
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Courses Dropdown
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                SubsectionTest
              </Dropdown.Toggle>
              <Dropdown.Menu>
              {courses.map(course => (
                <Dropdown.Item key={course.id} href={`/course/${course.title}`}>Course In SubsectionTest {course.title}</Dropdown.Item>
              ))}
              </Dropdown.Menu>
              {courses.map(course => (
                <Dropdown.Item key={course.id} href={`/course/${course.title}`}>{course.title}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link href="/allSectionsPage">Sections</Nav.Link>
        </Nav>
      </Container >
    </ReactNavbar >
  );
}
