import m from "mithril";
import ons from "onsenui";
import request from "services/request";
import Footer from "components/homefooter";
import RTCService from "services/rtc";
import PaymentService from "services/payment";
import SocketService from "../services/socket";

const Call = {
  oncreate: vnode => {
    if (vnode.attrs.status === "call") {
      RTCService.call(vnode.attrs.user.email).then(res => {
        // RTCService.call();
      });
    }
  },
  view: vnode => {
    const { hangup, status, user } = vnode.attrs;
    return (
      <section class="">
        {status === "call" ? (
          <div class="callingmessage">
            <p>calling: {user.email || "no user yet"}</p>
          </div>
        ) : (
          ""
        )}
        <div
          id="localVideoContainer"
          class={status === "call" ? "video-full" : "video-small"}
        >
          <video id="localVideo" autoplay playsinline muted>
            <track src="" kind="captions" srclang="en" label="English" />
          </video>
        </div>
        <div
          id="remoteVideoContainer"
          class={status === "call" ? "video-small" : "video-full"}
        >
          <video id="remoteVideo" autoplay playsinline>
            <track src="" kind="captions" srclang="en" label="English" />
          </video>
        </div>
        <ons-fab onclick={hangup} position="bottom right" class="bg-danger">
          <ons-icon icon="md-close" style="color: white;" />
        </ons-fab>
      </section>
    );
  }
};

var Videos = {
  oncreate: vnode => {
    Videos.getUsers();
    RTCService.HandleReply();
    // this means the other person has accepted the call.
    document.addEventListener(
      "accept",
      data => {
        // you made the call that is why you are receiving this event.
        // so the localstream has been created already.
        RTCService.MakePeer();
        Videos.state.page = "accept";
        m.redraw();
      },
      false
    );
    // Run function on `declinecall` event
    document.addEventListener("call", data => {
      const message = data.detail;
      ons.notification
        .confirm({ message: `You have a call from: ${message.owner}` })
        .then(resp => {
          if (resp) {
            console.log("Okay");
            Videos.state.page = "accept";
            m.redraw();
            navigator.mediaDevices
              .getUserMedia({
                audio: true,
                video: true
              })
              .then(stream => {
                RTCService.recipient = message.owner;
                RTCService.InitMedia(stream);
                RTCService.AnswerCall(RTCService.recipient);
                // RTCService.
                // do something here to show that the user has answered the call...
              });
          } else {
            console.log("cancel");
            RTCService.DeclineCall();
          }
          // ons.notification.alert(`Hello ${name}`);
        })
        .catch(err => {
          console.error(err);
        });
    });
  },
  hangup: () => {
    console.log("ending the call...");
    RTCService.hangup();
    Videos.state.page = "list";
  },
  state: {
    page: "list",
    users: [],
    user: {}
  },
  getUsers: () => {
    request({
      url: `${process.env.API_URL}/users`,
      method: "GET"
    })
      .then(resp => {
        // console.log(resp);
        Videos.state.users = resp.data.users;
        m.redraw();
      })
      .catch(err => {
        console.log(err);
      });
  },
  CardTokenAndPay(stripe, user) {
    // Create an instance of Elements.
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

    // Create an instance of the card Element.
    var card = elements.create("card", { style });

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount("#card-element");

    // Handle real-time validation errors from the card Element.
    card.addEventListener("change", event => {
      var displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });

    // Handle form submission.
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", event => {
      event.preventDefault();

      stripe.createToken(card).then(result => {
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement = document.getElementById("card-errors");
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          // Send the token to your server.
          PaymentService.chargeForCall(user, result.token.id)
            .then(res => {
              console.log("Please dont call me yet cause i have not paid");
              Videos.state.page = "call";
              Videos.state.user = user;
              m.redraw();
            })
            .finally(() => {
              Videos.modal.hide();
            });
        }
      });
    });
  },
  call(user) {
    // check if socket is connected.
    if (
      SocketService.conn &&
      SocketService.conn.readyState === WebSocket.OPEN
    ) {
      Videos.modal = document.querySelector("ons-modal");
      Videos.modal.show();
      PaymentService.Setup(stripe => {
        Videos.CardTokenAndPay(stripe, user);
      });
      // Videos.state.page = "call";
      // Videos.state.user = user;
      // m.redraw();
    } else {
      console.log("No connection");
      console.log(SocketService.conn);
      console.log(SocketService.conn.readyState);
    }
  },
  view: vnode => (
    <section>
      {Videos.state.page === "list" ? (
        <section>
          <ons-list
            style="width: 100%; padding: .5rem"
            class="list list--material overflow-auto content-height"
          >
            <ons-list-header>Users</ons-list-header>
            {Videos.state.users.length
              ? Videos.state.users.map(user => (
                  <ons-list-item>
                    <div class="left">
                      <img
                        class="list-item__thumbnail"
                        src="https://placekitten.com/g/40/40"
                      />
                    </div>
                    <div class="center">
                      <span class="list-item__title">
                        {`${user.first_name} ${user.last_name}`}{" "}
                        <span class="notification notification--material">
                          ${user.call_price ? user.call_price / 100 : 0}
                        </span>
                      </span>
                      <span class="list-item__subtitle">{user.email}</span>
                    </div>
                    <div
                      class="right"
                      onclick={() => {
                        Videos.call(user);
                      }}
                    >
                      <span class="fa fa-phone" />
                    </div>
                  </ons-list-item>
                ))
              : ""}
          </ons-list>
        </section>
      ) : Videos.state.page === "call" || Videos.state.page === "accept" ? (
        <Call
          user={Videos.state.user}
          status={Videos.state.page}
          hangup={Videos.hangup}
        />
      ) : (
        ""
      )}
      <ons-modal direction="up">
        <ons-page>
          <div style="padding: 1rem">
            <form id="payment-form">
              <div class="form-row">
                <label for="card-element">Credit or debit card</label>
                <div id="card-element" style="width: 100%">
                  {/* <!-- A Stripe Element will be inserted here. --> */}
                </div>

                {/* <!-- Used to display form errors. --> */}
                <div id="card-errors" role="alert" />
              </div>
              <br />
              <br />
              <button
                class="button--large--cta"
                style="width: 95%; margin: 0 auto;"
              >
                Submit Payment
              </button>
            </form>
            <br />
            <br />
            <ons-button
              type="danger"
              onclick={() => {
                if (Videos.modal) {
                  Videos.modal.hide();
                }
              }}
            >
              Cancel
            </ons-button>
          </div>
        </ons-page>
      </ons-modal>
      <Footer />
    </section>
  )
};

export default Videos;
