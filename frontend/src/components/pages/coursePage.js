import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import CourseService from '../../utilities/CourseService';
import SectionService from '../../utilities/SectionService';

const CoursePage = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [sectionDetails, setSectionDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const courseDetails = await CourseService.getCourseById(courseId);
        //console.log('courseDetails:', courseDetails);
        setCourseDetails(courseDetails);
  
        if (courseDetails.section) {
          //console.log('courseDetails.section:', courseDetails.section);
          const sectionDetails = await SectionService.getSectionById(courseDetails.section);
          setSectionDetails(sectionDetails);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, [courseId]);
  

  return (
    <Container>
      {courseDetails ? (
        <Row className="mt-3">
          <Col lg={7}>
            <Card>
              <Card.Img variant="top" src={`data:image/jpeg;base64,${courseDetails.courseImage}`} />
              <Card.Body>
                <Card.Title>{courseDetails.title}</Card.Title>
                <Card.Text>{courseDetails.description}</Card.Text>
                <Card.Text>Module: {sectionDetails ? sectionDetails.title : <Spinner animation="border" size="sm" />}</Card.Text>
                <Card.Text>{courseDetails.content}</Card.Text>
                <Card.Text>Date: {new Date(courseDetails.date).toLocaleString()}</Card.Text>
                {courseDetails.quizzes.length > 0 ? (
                  <ul>
                    {courseDetails.quizzes.map((quiz, index) => (
                      <li key={index}>
                        <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No quizzes for this course</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Spinner animation="border" className="mt-3" />
      )}
      <Link to={`/allCourses`}>
        <button className="btn btn-primary mt-3">Go to back to Courses</button>
      </Link>
    </Container>
  );
};

export default CoursePage;
