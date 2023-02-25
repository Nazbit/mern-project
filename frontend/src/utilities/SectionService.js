class SectionService {
  async getAllSections() {
    try {
      const response = await fetch("http://localhost:8081/section/getAllSections");
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error); 
    }
  }

  async printAllSections() {
    try {
      const sectionService = new SectionService();
      const data = await sectionService.getAllSections();
      
      data.forEach(section => {
        console.log(section);
      });
    } catch (error) {
      console.error(error); 
    }
  }
  async getSectionById(sectionId){
    try {
      const response = await fetch(`http://localhost:8081/section/getSectionById/${sectionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error); 
    }
  }
}



const sectionService = new SectionService();
export default sectionService;
