import m from "mithril";
import ProfileService from "services/profile.js";
// import handleResponse from "utils";
import Auth from "services/auth";
import PaymentService from "services/payment";
import Footer from "components/homefooter";
import request from "services/request";
// import Header from "components/homeheader";

import ons from "onsenui";

const Profile = {
  sessionID: "",
  removeLoader: {},
  modal: null,
  // call_price: 0,
  RemovePaymentMethod: id => {
    request({
      method: "DELETE",
      url: `${process.env.API_URL}/auth/cards/${id}`
    })
      .then(res => {
        console.log(res);
        Auth.GetMyCards();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        Profile.removeLoader = {};
        // m.redraw();
      });
  },
  ChangeCallPrice: () => {
    if (!Auth.user.call_price) {
      return ons.notification.alert("Please specify a price.");
    }
    request({
      method: "POST",
      url: `${process.env.API_URL}/users/callprice`,
      data: { call_price: parseInt(Auth.user.call_price, 10) }
    })
      .then(res => {
        console.log(res);
        ons.notification.alert(res.message);
        Auth.GetUser();
      })
      .catch(err => {
        console.log(err);
      });
  },
  pay: () => {
    console.log("pay with a particular selected card: ", Profile.fund_amount);
  },

  oncreate: vnode => {
    Auth.GetMyCards();
    Profile.modal = document.querySelector("ons-modal");
    Auth.getUserFromStorage().then(res => {
      m.redraw();
    });
    // dynamically load the stripe script here...
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
      {/* <Header /> */}
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
            <ons-list-item>
              <p class="pl-3 mb-0">Username: {Auth.user.username}</p>
            </ons-list-item>
            <ons-list-item>
              <p class="pl-3 mb-0">
                Name: {`${Auth.user.first_name} ${Auth.user.last_name}`}
              </p>
            </ons-list-item>
            <ons-list-item>
              <p class="pl-3 mb-0">Email: {Auth.user.email}</p>
            </ons-list-item>
            <ons-list-item>
              <p class="pl-3 mb-0">Phone: {Auth.user.phone}</p>
            </ons-list-item>
            <ons-list-item
              tappable
              onclick={() => {
                Auth.logout();
              }}
            >
              <p class="pl-3 mb-0">
                <i class="fa fa-sign-out-alt" /> Logout
              </p>
            </ons-list-item>
          </ons-list>
          <ons-list>
            <ons-list-header>Call Price</ons-list-header>
            <ons-list-item>
              <p class="pl-3 mb-0">
                <p class="dib v-mid pt-2">Amount: $</p>
                <ons-input
                  id="amount"
                  type="number"
                  modifier="underbar"
                  placeholder="Amount"
                  min="0"
                  max="200"
                  oninput={m.withAttr("value", value => {
                    console.log(value);
                    Auth.user.call_price = value;
                  })}
                  value={Auth.user.call_price ? Auth.user.call_price / 100 : 0}
                  float
                />
              </p>
              <ons-toolbar-button
                class="right pl-3"
                onclick={Profile.ChangeCallPrice}
              >
                {/* <ons-icon icon="md-plus" /> */}
                Update
              </ons-toolbar-button>
            </ons-list-item>
            <ons-list-header>Payment Cards </ons-list-header>
            {Auth.pms.length
              ? Auth.pms.map(pm => (
                  <div>
                    <ons-list-item tappable>
                      <p class="pl-3 mb-0">
                        <ons-icon icon="fa-credit-card" class="blue" /> ****{" "}
                        {pm.card.last4}
                      </p>
                      <ons-toolbar-button
                        class="pl-3 right"
                        onclick={() => {
                          Profile.removeLoader[pm.id] = true;
                          Profile.RemovePaymentMethod(pm.id);
                        }}
                      >
                        {Profile.removeLoader[pm.id] ? (
                          <ons-icon
                            size="15px"
                            spin
                            icon="md-spinner"
                            style="color: red"
                          />
                        ) : (
                          <ons-icon
                            icon="fa-minus"
                            size="15px"
                            style="color: red"
                          />
                        )}
                      </ons-toolbar-button>
                    </ons-list-item>
                  </div>
                ))
              : ""}
            <ons-button
              class="pl-3"
              modifier="large--quiet"
              onclick={PaymentService.Checkout}
            >
              <ons-icon icon="md-plus" /> add card
            </ons-button>
          </ons-list>
          {/* <ons-modal direction="up">
            <ons-page>
              <div style="text-align: center; margin-top: 30px;">
                <p>
                  <ons-input
                    id="amount"
                    type="number"
                    modifier="underbar"
                    placeholder="Amount"
                    min="0"
                    max="200"
                    oninput={m.withAttr("value", value => {
                      console.log(value);
                      Profile.fund_amount = value;
                    })}
                    float
                  />
                </p>
                <p style="margin-top: 30px;">
                  <ons-button
                    onclick={Profile.pay}
                    modifier="outline light quiet material"
                  >
                    Add
                  </ons-button>
                  <ons-button
                    modifier="outline light quiet material"
                    onclick={
                      Profile.modal
                        ? () => {
                            Profile.modal.hide();
                          }
                        : () => {
                            console.log("No modal");
                          }
                    }
                  >
                    Cancel
                  </ons-button>
                </p>
              </div>
            </ons-page>
          </ons-modal> */}
        </ons-page>
      </div>
      <Footer />
    </section>
  )
};

export default Profile;
