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
    // dynamically load the stripe script here...
    var script = document.createElement("script");
    script.onload = () => {
      console.log("stripe here");
      // do stuff with the script
      var stripe = Stripe("pk_live_dnUSjxmao34YO0EmPFEbnInd");
      var elements = stripe.elements();
      // Custom styling can be passed to options when creating an Element.
      // (Note that this demo uses a wider set of styles than the guide below.)
      var style = {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };

      var card = elements.create("card", { style });

      // Add an instance of the card Element into the `card-element` <div>.
      card.mount("#card-element");
    };

    script.src = "https://js.stripe.com/v3/";
    document.head.appendChild(script); // or something of the likes
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
          <ons-list>
            <ons-list-header>Profile Information</ons-list-header>
            <ons-list-item tappable>
              Name: {`${Auth.user.first_name} ${Auth.user.last_name}`}
              <div id="card-element" />
              {/* <h1> {`${Auth.user.username}`}</h1> */}
            </ons-list-item>
          </ons-list>
        </ons-page>
      </div>
      <Footer />
    </section>
  )
};

export default Profile;
