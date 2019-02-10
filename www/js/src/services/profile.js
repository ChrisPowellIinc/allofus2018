import m from "mithril";
import request from "services/request";

var Profile = {
  UploadImage: image => {
    var formData = new FormData();
    formData.append("profile_picture", image);

    request({
      url: `${process.env.API_URL}/user/upload`,
      method: "POST",
      data: formData
    });
  }
}

export default Profile;
