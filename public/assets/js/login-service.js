class LoginService {
  static login(data) {
    return new Promise(( resolve,reject )=> {
      $.ajax({
        url: '/api/auth/login',
        type: 'POST',
        data:   JSON.stringify(data),
        success: function (response) {
          if (response.success) {
            resolve(response.data);
          } else {
            reject(response.message);
          }
        },
        cache: false,
        contentType: 'application/json',
        // processData: false
      });     
    })
  }
}