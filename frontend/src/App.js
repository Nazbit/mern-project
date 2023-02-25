import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";

//routing components
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import AllCoursesPage from "./components/pages/allCoursesPage";
import CourseForm from "./components/pages/courseForm";
import SectionForm from "./components/pages/sectionForm";
import AllSectionsPage from "./components/pages/allSectionsPage";

import { createContext, useState, useEffect } from "react";

//routing utilities
import getUserInfo from "./utilities/decodeJwt";



export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
    
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/allCourses" element={<AllCoursesPage />} />
          <Route path="/courseForm" element={<CourseForm />} />
          <Route path="/sectionForm" element={<SectionForm />} />
          <Route path="/allSectionsPage" element={<AllSectionsPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
