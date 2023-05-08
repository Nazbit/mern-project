import React, { useState, useEffect } from 'react';
import SectionService from '../../utilities/SectionService';
import CourseService from '../../utilities/CourseService';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllSectionsPage = () => {
    const [sections, setSections] = useState([]);
    const [courseDetails, setCourseDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const sectionsData = await SectionService.getAllSections();
            SectionService.printAllSections();
            setSections(sectionsData);
        }
        fetchData();
    }, []);

    const getCourseDetails = async (course_Id) => {
        const courseDetails = await CourseService.getCourseById(course_Id);
        setCourseDetails(courseDetails);
    };

    const goToCourse = (id) => {
        navigate(`/coursePage/${id}`);
    };

    const handleDeleteSection = async (sectionId) => {
        try {
            const res = await axios.delete(`http://localhost:8081/section/deleteSectionById/${sectionId}`);
            console.log(res.data);
            // Update the state of the sections by removing the deleted section
            setSections(prevSections => prevSections.filter(section => section._id !== sectionId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h2>All Modules</h2>
            <Row>
                {sections.map((section, index) => (
                    <Col md={6} key={index}>
                        <div className="my-3 p-3 bg-white rounded shadow-sm">
                            <h3>{section.title}</h3>
                            <p>{section.description}</p>
                            <ul className="list-unstyled">
                                {section.courses.map((course, index) => (
                                    <li key={index} className="my-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button onClick={() => getCourseDetails(course)}>View Details</Button>
                                            <Button onClick={() => goToCourse(course)}>Go to Course</Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Button className="btn btn-danger ml-2" onClick={() => handleDeleteSection(section._id)}>Delete Module</Button>
                        </div>
                    </Col>
                ))}
            </Row>
            {courseDetails && (
                <div>
                    <h2>{courseDetails.title}</h2>
                    <p>{courseDetails.description}</p>
                </div>
            )}
        </Container>
    );
};

export default AllSectionsPage;
