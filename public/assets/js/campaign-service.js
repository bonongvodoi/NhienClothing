class CampaignService {
  static getAll() {
    return new Promise(resolve => {
      $.ajax({
        url: '/api/campaign/all',
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

  static getCampaignForOrder(minPrice) {
    return new Promise(resolve => {
      $.ajax({
        url: '/api/campaign/all?minPrice=' + minPrice,
        type: 'GET',
        success: function (response) {
          if (response.success) {
            if (response.data && response.data.length > 0)
              resolve(response.data[0]);
            else
              resolve(null);
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

  static getById(id) {
    return new Promise(resolve => {
      $.ajax({
        url: '/api/campaign/get/' + id,
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

  static saveCampaign(data) {
    return new Promise(resolve => {
      $.ajax({
        url: '/api/campaign/save-campaign',
        type: 'POST',
        data: JSON.stringify({ data }),
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

  static addToCampaign(id, data) {
    return new Promise(resolve => {
      let input = {}
      if (data.isAll) {
        input.addAll = true;
      } else
        if (data.category) {
          input.category = data.category
        } else
          if (data.ids) {
            input.ids = data.ids
          } else
            if (data.productId) {
              input.productId = data.productId
            }

      $.ajax({
        url: '/api/campaign/add-to-campaign/' + id,
        type: 'POST',
        data: JSON.stringify(input),
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

  static changeStatus(id, activate) {
    return new Promise(resolve => {
      $.ajax({
        url: '/api/campaign/change-status/' + id,
        type: 'POST',
        data: JSON.stringify({ status: activate ? 'active' : 'inactive' }),
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