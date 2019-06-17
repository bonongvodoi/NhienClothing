class OrderService {
  static saveOrder(data) {
    return new Promise(( resolve,reject )=> {
      $.ajax({
        url: '/api/order/save-order',
        type: 'POST',
        data:   JSON.stringify({data}),
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

  static getById(id) {
    return new Promise(( resolve,reject )=> {
      $.ajax({
        url: '/api/order/get-order/' + id,
        type: 'GET',
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

  static getAll(id) {
    return new Promise(( resolve,reject )=> {
      $.ajax({
        url: '/api/order/get-order/' + id,
        type: 'GET',
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