import m from "mithril";
import ProfileService from "services/profile.js";
//import handleResponse from "utils";
import Auth from "services/auth";

var Profile = {
  UploadImage: e => {
    if (e.target.files[0]) {
      ProfileService.UploadImage(e.target.files[0]).then(resp => {
        // handleResponse(resp);
        console.log(resp.data.imageurl);
        Auth.user.image = resp.data.imageurl;
        m.redraw();
      }).catch(err => {
        // handleResponse(err);
        console.log(err);
      });
    }
  },
  view: vnode => (
    <section>
      <div class="p-3">
        <div class="b-2 text-center">
          <img
            src={Auth.user.image || "img/logo.png"}
            class="img image-responsive"
            alt="Profile"
            width="120"
            height="120"
          />
        </div>
        <div class="text-center">
          <input class="d-none" id="uploadimage" type="file" name="profile_image" onchange={e => {
            Profile.UploadImage(e);
          }} />
          <label for="uploadimage" class="btn btn-sm btn-primary">
            <i class="fa fa-trash" />
            Change image
          </label>
        </div>
        My profile page...
      </div>
      <div class="bottom-bar">
        <div class="bottom-bar__line-height" style="text-align:center">
          <span class="toolbar-button text-info">
            <button class="btn btn-sm">
              <i class="fa fa-trash" />
              Settings
            </button>
          </span>
        </div>
      </div>
    </section>
  )
};

export default Profile;
