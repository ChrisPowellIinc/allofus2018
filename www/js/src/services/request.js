import m from "mithril";
import UserModel from "models/user.js";

function RequestError(request) {
  var err = new Error();
  err.request = request;
  err.message = request.status_message;
  return err;
}

var request = options =>
  UserModel.GetUserfromStorage().then(() => {
    options.headers = {
      Authorization: `Bearer ${UserModel.User.Authorization}` // Using cookie based auth
    };
    options.extract = (xhr, opt) => {
      if (xhr.status === 401) {
        UserModel.logout();
        return;
      }
      var response;
      if (options.old_extract) {
        response = options.old_extract(xhr, opt);
      } else {
        response = JSON.parse(xhr.responseText);
      }
      console.log(response);
      if (response.code !== 200) {
        throw RequestError(response);
      }
      return response;
    };
    return m
      .request(options)
      .then(response => response.data)
      .catch(err => Promise.reject(err)); // in future, return Promise.reject(err) so it is handled in the catch block of the caller
  });

export default request;
