import m from "mithril";
import ons from "onsenui";

var Login = {
  view: vnode => (
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <h1> Login here </h1>
          <div>
            <input
              class="text-input text-input--material w-100"
              placeholder="Username"
              type="text"
              required
            />
          </div>
          <br />
          <div>
            <input
              class="text-input text-input--material w-100"
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <ons-button
            class="button button--material w-100"
            onclick={() => {
              ons.notification.alert("Hello people!!");
            }}
          >
            {" "}
            Login{" "}
          </ons-button>
        </div>
      </div>
    </div>
  )
};

export default Login;
