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

  function storeCurrentPost(post) {
    localStorage.setItem('currentPost', JSON.stringify(post));
  }

  function getCurrentPost() {
    const post = JSON.parse(localStorage.getItem('currentPost'));
    return post;
  }

  function clearCurrentPost() {
    localStorage.removeItem('currentPost');

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

  module.exports = {
    storeCurrentPost,
    storeCurrentToken,
    getCurrentToken,
  }