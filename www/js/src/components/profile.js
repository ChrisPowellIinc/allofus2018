import m from "mithril";
import ProfileService from "services/profile.js";
//import handleResponse from "utils";
import Auth from "services/auth";
//import { ons-list-header, ons-list-item } from "onsenui";

var Profile = {
  UploadImage: e => {
    if (e.target.files[0]) {
      ProfileService.UploadImage(e.target.files[0]).then(resp => {
        // handleResponse(resp);
        // console.log(resp.data.imageurl);
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

        <ons-page>
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
          <label for="uploadimage" class="btn btn-sm btn-default">
            <i class="fa fa-images" />{" "}
            Change image
          </label>
        </div>
          <ons-list>
            <ons-list-header>Profile Information</ons-list-header>
            <ons-list-item tappable>Name: {Auth.user.firs_name + " " + Auth.user.last_name}</ons-list-item>
        
          </ons-list>
        </ons-page>
      </div>
      <div class="bottom-bar">
        <div class="row h-100">
          <div class="col-3 text-center p-3"> <span class="fa fa-home" /></div>
          <div class="col-3 text-center p-3"> <span class="fa fa-video" /></div>
          <div class="col-3 text-center p-3"> <span class="fa fa-envelope" /></div>
          <div class="col-3 text-center p-3"> <span class="fa fa-user" /></div>
        </div>
        {/*}<div class="bottom-bar__line-height" style="text-align:center">
          <span class="toolbar-button text-info">
            <button class="btn btn-sm">
              <i class="fa fa-trash" />
              Settings
            </button>
          </span>
        </div>*/}
      </div>
    </section>
  )
};

export default Profile;
