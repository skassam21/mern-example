import Storage from './storage';

const TOKEN = 'JWToken';
const USER = 'User';

class Api {
  static login(username, password) {
    return this.authenticateUserCall('/api/login', {
      username,
      password,
    });
  }

  static signup(username, name, email, password) {
    return this.authenticateUserCall('/api/signup', {
      username,
      name,
      email,
      password,
    });
  }

  static authenticateUserCall(url, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url,
        method: 'post',
        data,
        success(response) {
          if (response.success) {
            Storage.set(TOKEN, response.token);
            Storage.set(USER, response.user);
            resolve(response);
          } else {
            reject(new Error(response.message));
          }
        },
        error(xhr, status, err) {
          reject(new Error(err));
        },
      });
    });
  }

  static authCall(method, url, data) {
    return new Promise((resolve, reject) => {
      const token = Storage.get(TOKEN);
      if (!token) {
        reject(new Error('unauthorized'));
      } else {
        $.ajax({
          url,
          data,
          json: true,
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          success: (response, status) => {
            if (status === 401 || status === 403) {
              reject(new Error('unauthorized'));
            }
            resolve(response);
          },
          error: (xhr, status, err) => {
            reject(new Error(err));
          },
        });
      }
    });
  }
}

export default Api;
