export function storeCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }
  
  export function clearCurrentUser() {
    localStorage.removeItem('currentUser');

  }

  export function storeCurrentPost(post) {
    localStorage.setItem('currentPost', JSON.stringify(post));
  }

  export function getCurrentPost() {
    const post = JSON.parse(localStorage.getItem('currentPost'));
    return post;
  }

  export function clearCurrentPost() {
    localStorage.removeItem('currentPost');

  }

  export function storeCurrentToken(token) {
    localStorage.setItem('currentToken', JSON.stringify(token));
  }

  export function getCurrentToken() {
    const token = JSON.parse(localStorage.getItem('currentToken'));
    return token;
  }

  export function clearCurrentToken() {
    localStorage.removeItem('currentToken');

  }