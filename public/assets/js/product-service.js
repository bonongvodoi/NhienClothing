class ProductService {
  static getAll() {
    return new Promise(resolve => {
      $.ajax({
        url: '/api/product/all',
        type: 'GET',
        success: function (response) {
          if (response.success) {
            resolve(response.data);
          } else {
            resolve(null);
          }
        },
        cache: false,
        contentType: 'application/json',
        processData: false
      });     
    })
  }

  static saveProduct(data) {
    return new Promise(resolve => {
      $.ajax({
        url: '/api/product/save-product',
        type: 'POST',
        data:   JSON.stringify({data}),
        success: function (response) {
          if (response.success) {
            resolve(response.data);
          } else {
            resolve(null);
          }
        },
        cache: false,
        contentType: 'application/json',
        // processData: false
      });     
    })
  }

  static getCategories() {
    return new Promise(resolve => {
      $.ajax({
        url: '/api/product/get-categories',
        type: 'GET',
        success: function (response) {
          if (response.success) {
            resolve(response.data);
          } else {
            resolve(null);
          }
        },
        cache: false,
        contentType: 'application/json',
        // processData: false
      });     
    })
  }
}