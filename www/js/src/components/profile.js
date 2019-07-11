import m from "mithril";
import ProfileService from "services/profile.js";
// import handleResponse from "utils";
import Auth from "services/auth";
import Footer from "components/homefooter";
import Header from "components/homeheader";

// import { ons-list-header, ons-list-item } from "onsenui";

var Profile = {
  oncreate: () => {
    Auth.getUserFromStorage().then(res => {
      m.redraw();
    });
  },
  UploadImage: e => {
    if (e.target.files[0]) {
      ProfileService.UploadImage(e.target.files[0])
        .then(resp => {
          // handleResponse(resp);
          Auth.user.image = resp.data.imageurl;
          m.redraw();
        })
        .catch(err => {
          // handleResponse(err);
          console.log(err);
        });
    }
  },
  view: vnode => (
    <section>
      <Header />
      <div class="p-3">
        <ons-page>
          <div class="b-2 text-center p-2">
            <img
              src={Auth.user.image || "img/logo.png"}
              class="img image-responsive"
              alt="Profile"
              width="120"
              height="120"
            />
          </div>
          <div class="text-center">
            <input
              class="d-none"
              id="uploadimage"
              type="file"
              name="profile_image"
              onchange={e => {
                Profile.UploadImage(e);
              }}
            />
            <label for="uploadimage" class="btn btn-sm btn-default">
              <i class="fa fa-images" /> Change image
            </label>
          </div>

          <div class="col-md-6 mx-auto my-5 text-center">
            <h1> Posts </h1>
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
          <ons-list>
            <ons-list-header>Profile Information</ons-list-header>
            <ons-list-item tappable>
              Name: {`${Auth.user.first_name} ${Auth.user.last_name}`}
              <h1> {`${Auth.user.username}`}</h1>
            </ons-list-item>
          </ons-list>
        </ons-page>
      </div>
      <Footer />
    </section>
  )
};

export default Profile;
