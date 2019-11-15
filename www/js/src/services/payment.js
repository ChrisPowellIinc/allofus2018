import m from "mithril";
import request from "services/request";
import ons from "onsenui";

const PaymentService = {
  sessionID: "",
  GetSessionID: () =>
    request({
      method: "GET",
      url: `${process.env.API_URL}/auth/sessionid`
    })
      .then(res => {
        console.log(res);
        PaymentService.sessionID = res.data.data.id;
        return res;
      })
      .catch(err => {
        console.log(err);
      }),
  chargeForCall: (user, token) =>
    request({
      url: `${process.env.API_URL}/auth/payforcall`,
      method: "POST",
      data: { email: user.email, token }
    })
      .then(res => {
        console.table(res);
        // https://stripe.com/docs/saving-cards
        return res;
      })
      .catch(err => {
        if (err.message) {
          ons.notification.alert(err.message);
        }
        console.log(err);
        return Promise.reject(err);
      }),
  Checkout: () => {
    PaymentService.GetSessionID().then(() => {
      PaymentService.Setup(stripe => {
        stripe
          .redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: PaymentService.sessionID
          })
          .then(result => {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log(result);
          });
      });
    });
  },
  Setup(callback) {
    const sc = document.querySelector("#stripescript");
    if (!sc) {
      // add id to the element to check if
      // its on the page before appending it again
      var script = document.createElement("script");
      script.onload = () => {
        console.log("stripe here");
        // do stuff with the script
        const stripe = Stripe(process.env.PK_STRIPE);
        callback(stripe);
      };
      script.src = "https://js.stripe.com/v3/";
      script.id = "stripescript";
      document.head.appendChild(script); // or something of the likes
    } else {
      const stripe = Stripe(process.env.PK_STRIPE);
      callback(stripe);
    }
  }
};

export default PaymentService;
