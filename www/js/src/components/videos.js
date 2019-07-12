import m from "mithril";
import request from "services/request";
import Footer from "components/homefooter";
import RTCService from "services/rtc";

const Call = {
  oncreate: vnode => {
    RTCService.start().then(res => {
      RTCService.call();
    });
  },
  view: vnode => (
    <section>
      <h1>Calling...</h1>
      <p> {vnode.attrs.user.email}</p>
      <video id="localVideo" width="100%" autoplay playsinline>
        <track src="" kind="captions" srclang="en" label="English" />
      </video>
      <video id="remoteVideo" width="100%" autoplay playsinline>
        <track src="" kind="captions" srclang="en" label="English" />
      </video>
    </section>
  )
};

var Videos = {
  oncreate: () => {
    Videos.getUsers();
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
        </section>
      ) : Videos.state.page ? (
        <Call user={Videos.state.user} />
      ) : (
        ""
      )}
      <Footer />
    </section>
  )
};

export default Videos;
