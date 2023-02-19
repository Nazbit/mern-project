class CourseService {
  async getAllCourses() {
    try {
      const response = await fetch("http://localhost:8081/course/getAll");
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error); 
    }
  }


async  printAllCourses() {
  try {
    const courseService = new CourseService();
    const data = await courseService.getAllCourses();
    
    data.forEach(course => {
      console.log(course);
    });
  } catch (error) {
    console.error(error); 
  }
}

}
const courseService = new CourseService();
export default courseService;