import jwt_decode from 'jwt-decode'

const getUserInfo = () => {
  const accessToken = localStorage.getItem("accessToken")
  if (!accessToken) return undefined
  
  try {
    const userInfo = jwt_decode(accessToken)
    const currentTime = Date.now() / 1000 // Convert to seconds
    
    if (userInfo.exp < currentTime) {
      localStorage.removeItem("accessToken")
      return undefined
    }
    
    return userInfo
  } catch (error) {
    console.error(error)
    return undefined
  }
}   

export default getUserInfo
