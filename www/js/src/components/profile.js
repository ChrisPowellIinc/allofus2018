import m from "mithril";
import ProfileService from "services/profile.js";
// import handleResponse from "utils";
import Auth from "services/auth";
import Footer from "components/homefooter";
import request from "services/request";
// import Header from "components/homeheader";

// import { ons-list-header, ons-list-item } from "onsenui";

const Profile = {
  sessionID: "",
  removeLoader: {},
  modal: null,
  fund_amount: 0,
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
  FundWallet: () => {
    // var modal = document.querySelector("ons-modal");
    if (Profile.modal) {
      Profile.modal.show();
      // setTimeout(() => {
      //   modal.hide();
      // }, 5000);
    } else {
      console.log("no modal");
    }
  },
  pay: () => {
    console.log("pay with a particular selected card: ", Profile.fund_amount);
  },
  GetSessionID: () =>
    request({
      method: "GET",
      url: `${process.env.API_URL}/auth/sessionid`
    })
      .then(res => {
        console.log(res);
        Profile.sessionID = res.data.data.id;
        return res;
      })
      .catch(err => {
        console.log(err);
      }),
  SaveCardDetails: () => {
    Profile.GetSessionID().then(() => {
      var script = document.createElement("script");
      script.onload = () => {
        console.log("stripe here");
        // do stuff with the script
        const stripe = Stripe(process.env.PK_STRIPE);
        stripe
          .redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: Profile.sessionID
          })
          .then(result => {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log(result);
          });
      };

      script.src = "https://js.stripe.com/v3/";
      document.head.appendChild(script); // or something of the likes
    });
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
            <ons-list-item tappable>
              <p class="pl-3 mb-0">Username: {Auth.user.username}</p>
            </ons-list-item>
            <ons-list-item tappable>
              <p class="pl-3 mb-0">
                Name: {`${Auth.user.first_name} ${Auth.user.last_name}`}
              </p>
            </ons-list-item>
            <ons-list-item tappable>
              <p class="pl-3 mb-0">Email: {Auth.user.email}</p>
            </ons-list-item>
            <ons-list-item tappable>
              <p class="pl-3 mb-0">Phone: {Auth.user.phone}</p>
            </ons-list-item>
          </ons-list>
          <ons-list>
            <ons-list-header>Wallet</ons-list-header>
            <ons-list-item tappable>
              <p class="pl-3 mb-0">
                Balance: ${Auth.user.balance ? Auth.user.balance : 0}
              </p>
              <ons-toolbar-button
                class="right pl-3"
                onclick={Profile.FundWallet}
              >
                <ons-icon icon="md-plus" />
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
              onclick={Profile.SaveCardDetails}
            >
              <ons-icon icon="md-plus" /> add card
            </ons-button>
          </ons-list>
          <ons-modal direction="up">
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
          </ons-modal>
        </ons-page>
      </div>
      <Footer />
    </section>
  )
};

export default Profile;
