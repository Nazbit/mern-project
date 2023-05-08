import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import './formsPage.css'; // Import the CSS file for this component 

const FormsPage = () => {
  return (
    <div className="forms-page container">
      <h1>Forms</h1>
      <table>
        <tbody>
          <tr>
            <td>Course Form</td>
            <td>
              <NavLink to="/courseForm">
                <Button variant="primary">Go</Button>
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>Module Form</td>
            <td>
              <NavLink to="/sectionForm">
                <Button variant="secondary">Go</Button>
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>Quiz Form</td>
            <td>
              <NavLink to="/quizForm">
                <Button variant="success">Go</Button>
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormsPage;
