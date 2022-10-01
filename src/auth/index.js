  function storeCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }
  
  function clearCurrentUser() {
    localStorage.removeItem('currentUser');

  }

  function storeCurrentToken(token) {
    localStorage.setItem('currentToken', JSON.stringify(token));
  }

  function getCurrentToken() {
    const token = JSON.parse(localStorage.getItem('currentToken'));
    return token;
  }

  function clearCurrentToken() {
    localStorage.removeItem('currentToken');

  }

  function storeCurrentActivity(activity) {
    localStorage.setItem('currentActivity', JSON.stringify(activity));
  }

  function getCurrentActivity() {
    const activity = JSON.parse(localStorage.getItem('currentActivity'));
    return activity;
  }

  function clearCurrentActivity() {
    localStorage.removeItem('currentActivity');

  }

  function storeCurrentRoutine(routine) {
    localStorage.setItem('currentRoutine', JSON.stringify(routine));
  }

  function getCurrentRoutine() {
    const routine = JSON.parse(localStorage.getItem('currentRoutine'));
    return routine;
  }

  function clearCurrentRoutine() {
    console.log("Inside clearCurrentRoutine");
    localStorage.removeItem('currentRoutine');

  }

  module.exports = {
    storeCurrentToken,
    getCurrentToken,
    clearCurrentToken,
    storeCurrentUser,
    getCurrentUser,
    clearCurrentUser,
    storeCurrentActivity,
    getCurrentActivity,
    clearCurrentActivity,
    storeCurrentRoutine,
    getCurrentRoutine,
    clearCurrentRoutine,
    
  }