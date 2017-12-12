import Storage from './storage';

const TOKEN = 'JWToken';
const USER = 'User';

var Api = {
  login: function(username, password) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/api/login',
        method: 'post',
        data: {
          username: username, 
          password: password
        }, 
        success: function(data, status) {
          if (data.success) {
            Storage.set(TOKEN, data.token);
            Storage.set(USER, data.user);
            resolve(data);
          } else {
            reject({error: data.message});
          }
        },
        error: function(xhr, status, err) {
          reject({'error': err});
        },
      });
    });
  },
  signup: function(username, name, email, password) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/api/signup',
        method: 'post',
        data: {
          username: username,
          name: name,
          email: email, 
          password: password
        }, 
        success: function(data, status) {
          if (data.success) {
            Storage.set(TOKEN, data.token);
            Storage.set(USER, data.user);
            resolve(data);
          } else {
            reject({error: data.message});
          }
        },
        error: function(xhr, status, err) {
          reject({'error': err});
        },
      });
    });
  },
  authCall: function(method, url, data) {
    return new Promise((resolve, reject) => {
      let token = Storage.get(TOKEN);
      if (!token) {
        reject({'error': 'unauthorized'});
      } else {
        $.ajax({
          url: url, 
          data: data,
          json: true, 
          method: method,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          success: function(data, status) {
            if (status == 401 || status == 403) {
              reject({'error': 'unauthorized'});
            }
            resolve(data);
          },
          error: function(xhr, status, err) {
            reject({'error': err});
          }
        });
      }
    });
  }
}

export default Api;
