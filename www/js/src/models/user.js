import m from "mithril";
import request from "services/request";

const UserModel = {
  User: {},
  GetUserfromStorage() {
    return localforage
      .getItem("user")
      .then(user => {
        if (!isEmptyObject(user)) {
          UserModel.User = user;

          m.redraw();
          return;
        }
        UserModel.User = {};
        m.redraw();
      })
      .catch(error => error);
  },
  Login: () =>
    request({
      url: "/login",
      method: "POST",
      data: {
        username: UserModel.User.username,
        password: UserModel.User.username
      }
    }),
  Logout() {
    localforage.removeItem("user");
    UserModel.User = {};
    deleteCookie("jwt");
    window.location.assign("/");
  }
};

export default UserModel;
