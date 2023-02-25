import React, { useState, useEffect } from 'react';
import SectionService from '../../utilities/SectionService';
import CourseService from '../../utilities/CourseService';

const AllSectionsPage = () => {
    const [sections, setSections] = useState([]);
    const [courseDetails, setCourseDetails] = useState(null);

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

    return (
        <div>
            <h2>All Sections</h2>
            <ul>
                {sections.map((section, index) => (
                    <li key={index}>
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                        <ul>
                            {section.courses.map((course, index) => (
                                <li key={index}>
     
                                    <button onClick={() => getCourseDetails(course)}>View Details</button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            {courseDetails && (
                <div>
                    <h2>{courseDetails.title}</h2>
                    <p>{courseDetails.description}</p>
                </div>
            )}
        </div>
    );
};

export default AllSectionsPage;