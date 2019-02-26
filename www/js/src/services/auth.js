import m from "mithril";
import * as Joi from "joi-browser";
import localForage from "localforage";
import ons from "onsenui";
import { handleResponse, handleValidationError } from "utils";
import { User, UserSchema, LoginSchema } from "models/user";

const Auth = {
  errors: {},
  user: User,
  loading: false,
  /**
   * Sets the value of username.
   * @param {string} username
   */
  setUsername: username => {
    Auth.user.username = username;
  },

  /**
   * Sets the value of password.
   * @param {string} password
   */
  setPassword: password => {
    Auth.user.password = password;
  },

  /**
   * Fetches the user from storage if the user exists
   * @return {Promise<any>}
   */
  getUserFromStorage: async () => {
    try {
      const user = await localForage.getItem("user");
      if (user) {
        Auth.user = user;
      } else {
        Auth.user = User;
      }
      return Promise.resolve(true);
    } catch (err) {
      Auth.logout();
    }
  },

  /**
   * Creates a user account.
   */
  register: user => {
    Auth.errors = {};
    // destructure value as data
    const { error, value: data } = Joi.validate(user, UserSchema, {
      allowUnknown: true
    });
    if (error) {
      handleValidationError(error, Auth.errors);
      //   toast.info("Fill all required fields");
      // Send notification alerts
      ons.notification.alert("Fill all required fields");
      return Promise.reject(new Error("Fill all required fields"));
    }
    Auth.loading = true;
    // API call
    return m
      .request({
        method: "POST",
        url: `${process.env.API_URL}/auth/register`,
        data
      })
      .then(res => {
        handleResponse(res);
        if (res.status === 201) {
          m.route.set("/login");
        }
      })
      .catch(err => {
        // toast.error(err.message);
        // Send notification alerts
        ons.notification.alert(err.message);
        Auth.errors = err.data;
      })
      .finally(() => {
        Auth.loading = false;
        m.redraw();
      });
  },

  /**
   * Login a user and starts a session.
   */
  login: user => {
    Auth.errors = {};
    // destructure value as data
    const { error, value: data } = Joi.validate(user, LoginSchema, {
      allowUnknown: true
    });
    if (error) {
      handleValidationError(error, Auth.errors);
      //   toast.info("Fill all required fields");
      // Create notification alerts
      ons.notification.alert("Fill all required fields");
      return Promise.reject(new Error("Fill all required fields"));
    }
    Auth.loading = true;
    // API call
    return m
      .request({
        method: "POST",
        url: `${process.env.API_URL}/auth/login`,
        data
      })
      .then(res => {
        // handleResponse(res);
        if (res.status === 200) {
          localForage.setItem("user", res.data).then(user => {
            Auth.user = user;
            ons.notification.alert(`Welcome ${user.first_name}`);
            m.route.set("/profile");
          });
        }
      })
      .catch(err => {
        // toast.error(err.message);
        // TODO Send Notification alert
        ons.notification.alert(err.message);
      })
      .finally(() => {
        Auth.loading = false;
        m.redraw();
      });
  },

  /**
   * Checks if a user exists in session
   * @return {Promise<string | boolean>}
   */
  isLoggedIn: async () => {
    try {
      const user = await localForage.getItem("user");
      if (user && user.token) {
        Auth.user = user;
        return Promise.resolve(user.token);
      }
      return Promise.reject(new Error("Invalid access token"));
    } catch (err) {
      return Promise.reject(new Error("Invalid access token"));
    }
  },

  /**
   * Clears the session and redirects to login page
   */
  logout: async () => {
    try {
      await localForage.removeItem("user");
      Auth.user = {};
      m.route.set("/login");
    } catch (e) {
      Auth.user = {};
      m.route.set("/login");
    }
  }
};

export default Auth;
