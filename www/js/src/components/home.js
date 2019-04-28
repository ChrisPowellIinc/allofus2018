import m from "mithril";

var Home = {
  view: vnode => (
    <div class="d-flex w-100 h-100 p-3 mx-auto flex-column">
      <main role="main" class="inner cover align-middle">
        {/* <div class="col-md-6 mx-auto text-center"> */}
        <div class="my-3 text-center">
          <img
            src="img/logo.png"
            class="img image-responsive"
            alt="All Of Us"
            width="120"
            height="120"
          />
        </div>
        <div class="mt-4 text-center">
          <h3> Welcome to</h3>
          <h1>All of Us </h1>
          <a
            href="/login"
            oncreate={m.route.link}
            class="button button--material w-100 mt-4 pointer"
          >
            LOGIN
          </a>
          <br />
          <a
            href="/signup"
            oncreate={m.route.link}
            class="button button--material w-100 mt-4 pointer"
          >
            SIGNUP
          </a>
          <a
            href="/profile"
            oncreate={m.route.link}
            class="button button--material w-100 mt-4 pointer"
          >
            PROFILE
          </a>
        </div>
        {/* </div> */}
      </main>
    </div>
  )
};

export default Home;
