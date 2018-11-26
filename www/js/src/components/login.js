import m from "mithril";
// import ons from "onsenui";
import UserModel from "models/user";

var Login = {
  Validate: () => {
    if (!UserModel.User.username || !UserModel.User.password) {
      return vnode.state.errors.push("Please fill out all forms");
    }
  },
  oncreate: vnode => {
    vnode.state.errors = [];
  },
  view: vnode => (
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto my-5 text-center">
          <h1> Login </h1>
          <div class="my-4">
            <input
              class="text-input text-input--material w-100"
              placeholder="Username"
              type="text"
              value={UserModel.User.username}
              oninput={m.withAttr("value", value => {
                UserModel.User.username = value.trim();
              })}
              required
            />
          </div>

          <div class="my-4">
            <input
              class="text-input text-input--material w-100"
              placeholder="Password"
              type="password"
              value={UserModel.User.password}
              oninput={m.withAttr("value", value => {
                UserModel.User.password = value;
              })}
              required
            />
          </div>
          {vnode.state.loading && (
            <ons-progress-circular
              class="white-text"
              style="color: white"
              indeterminate
            />
          )}
          <ons-button
            class="button button--material w-100 mt-3"
            onclick={() => {
              vnode.state.errors = Login.Validate();
              vnode.state.loading = true;
              // ons.notification.alert("Hello people!!");
              UserModel.Login()
                .then(resp => {
                  console.log(resp);
                })
                .catch(err => {
                  console.log(err);
                })
                .finally(() => {
                  vnode.state.loading = false;
                });
            }}
          >
            Login
          </ons-button>
        </div>
      </div>
    </div>
  )
};

export default Login;
