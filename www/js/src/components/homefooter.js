import m from "mithril";

var Footer = {
  view: vnode => (
    <ons-bottom-toolbar>
      <div class="row h-100">
        <div
          class="col-2 text-center p-3"
          onclick={() => {
            m.route.set("/timeline");
          }}
        >
          {" "}
          <span class="fa fa-home" />
        </div>
        <div
          class="col-2 text-center p-3"
          onclick={() => {
            m.route.set("/post");
          }}
        >
          {" "}
          <span class="fa fa-plus" />
        </div>
        <div
          class="col-2 text-center p-3"
          onclick={() => {
            m.route.set("/videos");
          }}
        >
          {" "}
          <span class="fa fa-music" />
        </div>
        <div
          class="col-2 text-center p-3"
          onclick={() => {
            m.route.set("/videos");
          }}
        >
          {" "}
          <span class="fa fa-video" />
        </div>
        <div
          class="col-2 text-center p-3"
          onclick={() => {
            m.route.set("/messages");
          }}
        >
          {" "}
          <span class="fa fa-envelope" />
        </div>
        <div
          class="col-2 text-center p-3"
          onclick={() => {
            m.route.set("/profile");
          }}
        >
          {" "}
          <span class="fa fa-user" />
        </div>
      </div>
    </ons-bottom-toolbar>
  )
};

export default Footer;
