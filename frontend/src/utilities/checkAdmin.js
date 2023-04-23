async function checkIfUserIsAdmin(userId) {
    try {
        
      const response = await fetch(`http://localhost:8081/user/userIsAdmin/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
}
export default checkIfUserIsAdmin