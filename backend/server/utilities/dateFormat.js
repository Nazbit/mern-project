function getUserTimeZone() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
  }
  
  function formatDate(mongoDate) {
    const userTimeZone = getUserTimeZone();
    const date = new Date(mongoDate); // convert MongoDB date to JavaScript date
    const userDate = new Date(date.toLocaleString('en-US', { timeZone: userTimeZone }));
    const year = userDate.getFullYear();
    const month = String(userDate.getMonth() + 1).padStart(2, '0');
    const day = String(userDate.getDate()).padStart(2, '0');
    const hours = String(userDate.getHours()).padStart(2, '0');
    const minutes = String(userDate.getMinutes()).padStart(2, '0');
    const seconds = String(userDate.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  