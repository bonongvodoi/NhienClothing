const TOKEN = 'nhien_token';

class AuthService {
  static getCurrentUser() {
    try {
      let userString = localStorage.getItem(TOKEN);
      if (userString) {
        return JSON.parse(userString);
      }
    } catch(e) {
      return {};
    }
  }

  static logout() {
    $.ajax({
      url: '/api/user/logout',
      type: 'POST',
      success: function (response) {
      },
      cache: false,
      contentType: 'application/json',
      // processData: false
    }); 
    localStorage.setItem(TOKEN, '');
  }

  static saveUser(user) {
    try {
      let userString = JSON.stringify(user);
      localStorage.setItem(TOKEN, userString);
    } catch(e) {
      localStorage.setItem(TOKEN, '');
    }
  }
}