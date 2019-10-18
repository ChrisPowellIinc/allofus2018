import m from "mithril";
import ons from "onsenui";
import request from "services/request";
import Footer from "components/homefooter";
import RTCService from "services/rtc";

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
  oncreate: () => {
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
          console.err(err);
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
        Videos.state.users = resp.data.users;
        m.redraw();
      })
      .catch(err => {
        console.log(err);
      });
  },
  call(user) {
    console.log(user);
    Videos.state.page = "call";
    Videos.state.user = user;
  },
  view: vnode => (
    <section>
      {Videos.state.page === "list" ? (
        <section>
          <ons-list
            style="width: 100%"
            class="list list--material overflow-auto content-height"
          >
            <ons-list-header>Users</ons-list-header>
            {Videos.state.users.length
              ? Videos.state.users.map(user => (
                  <ons-list-item
                    onclick={() => {
                      Videos.call(user);
                    }}
                  >
                    <div class="left">
                      <img
                        class="list-item__thumbnail"
                        src="https://placekitten.com/g/40/40"
                      />
                    </div>
                    <div class="center">
                      <span class="list-item__title">{`${user.first_name} ${user.last_name}`}</span>
                      <span class="list-item__subtitle">On the Internet</span>
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
      <Footer />
    </section>
  )
};

export default Videos;
