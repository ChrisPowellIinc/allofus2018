import m from "mithril";
import ProfileService from "services/profile.js";
// import handleResponse from "utils";
import Auth from "services/auth";
import Footer from "components/homefooter";
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
          <ons-list>
            <ons-list-header>Profile Information</ons-list-header>
            <ons-list-item tappable>
              Name: {`${Auth.user.first_name} ${Auth.user.last_name}`}
            </ons-list-item>
          </ons-list>
        </ons-page>
      </div>
      <Footer />
    </section>
  )
};

export default Profile;
