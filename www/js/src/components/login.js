import m from "mithril";
// import ons from "onsenui";
import Auth from "services/auth";

var Login = {
  login: e => {
    e.preventDefault();
    console.log("hello login");
    Auth.login(Auth.user).catch(err => {});
  },
  oncreate: vnode => {
    vnode.state.errors = [];
  },
  view: vnode => (
    <div class="container">
      <div class="row">
        <form
          class="w-100"
          onsubmit={Login.login}
          autocomplete="off"
          novalidate
        >
          <div class="col-md-6 mx-auto my-5 text-center">
            <h1> Login </h1>
            <div class="my-4">
              <input
                class="text-input text-input--material w-100"
                placeholder="Username"
                type="text"
                value={Auth.user.username}
                oninput={m.withAttr("value", value => {
                  Auth.setUsername(value);
                })}
                required
              />
              {Auth.errors.username && (
                <small class="form-text text-danger">
                  {Auth.errors.username}
                </small>
              )}
            </div>

            <div class="my-4">
              <input
                class="text-input text-input--material w-100"
                placeholder="Password"
                type="password"
                value={Auth.user.password}
                oninput={m.withAttr("value", value => {
                  Auth.setPassword(value);
                })}
                required
              />
              {Auth.errors.password && (
                <small class="form-text text-danger">
                  {Auth.errors.password}
                </small>
              )}
            </div>
            {vnode.state.loading && (
              <ons-progress-circular
                class="white-text"
                style="color: white"
                indeterminate
              />
            )}
            <button
              class="button button--material w-100 mt-3"
              type="submit"
              disabled={vnode.state.loading}
              onclick={() => {
                console.log("errors");
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
