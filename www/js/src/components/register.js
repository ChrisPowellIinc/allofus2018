import m from "mithril";
import Auth from "services/auth";

var Register = {
  user: {},
  register: e => {
    e.preventDefault();
    console.log("hello login");
    Auth.register(Register.user).catch(err => {});
  },
  oncreate: vnode => {
    vnode.state.errors = [];
  },
  view: vnode => (
    <div class="">
      <div class="toolbar">
        <div class="toolbar__left">
          <span class="toolbar-button">
            <i
              class="ion-navicon"
              style="font-size:32px; vertical-align:-6px;"
            />
          </span>
        </div>

        <div class="toolbar__center">Register</div>

        <div class="toolbar__right">
          <span class="toolbar-button">Label</span>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <form
            class="w-100"
            onsubmit={Register.register}
            autocomplete="off"
            novalidate
          >
            <div class="col-md-6 mx-auto my-5 text-center">
              <h1> Register </h1>
              <div class="my-4">
                <input
                  class="text-input text-input--material w-100"
                  placeholder="First Name"
                  type="text"
                  value={Register.user.first_name}
                  oninput={m.withAttr("value", value => {
                    Register.user.first_name = value;
                  })}
                  autofocus
                  required
                />
                {Auth.errors.first_name && (
                  <small class="form-text text-danger">
                    {Auth.errors.first_name}
                  </small>
                )}
              </div>
              <div class="my-4">
                <input
                  class="text-input text-input--material w-100"
                  placeholder="Last Name"
                  type="text"
                  value={Register.user.last_name}
                  oninput={m.withAttr("value", value => {
                    Register.user.last_name = value;
                  })}
                  required
                />
                {Auth.errors.last_name && (
                  <small class="form-text text-danger">
                    {Auth.errors.last_name}
                  </small>
                )}
              </div>
              <div class="my-4">
                <input
                  class="text-input text-input--material w-100"
                  placeholder="Email"
                  type="text"
                  value={Register.user.email}
                  oninput={m.withAttr("value", value => {
                    Register.user.email = value;
                  })}
                  required
                />
                {Auth.errors.email && (
                  <small class="form-text text-danger">
                    {Auth.errors.email}
                  </small>
                )}
              </div>
              <div class="my-4">
                <input
                  class="text-input text-input--material w-100"
                  placeholder="Username"
                  type="text"
                  value={Register.user.username}
                  oninput={m.withAttr("value", value => {
                    Register.user.username = value;
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
                  value={Register.user.password}
                  oninput={m.withAttr("value", value => {
                    Register.user.password = value;
                  })}
                  required
                />
                {Auth.errors.password && (
                  <small class="form-text text-danger">
                    {Auth.errors.password}
                  </small>
                )}
              </div>
              <div class="my-4">
                <input
                  class="text-input text-input--material w-100"
                  placeholder="Confirm Password"
                  type="password"
                  value={Register.user.confirm_password}
                  oninput={m.withAttr("value", value => {
                    Register.user.confirm_password = value;
                  })}
                  required
                />
                {Auth.errors.confirm_password && (
                  <small class="form-text text-danger">
                    {Auth.errors.confirm_password}
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="bottom-bar__line-height" style="text-align:center">
          <span class="toolbar-button text-info">
            Already have an account?{" "}
            <a href="/login" oncreate={m.route.link}>
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  )
};

export default Register;
