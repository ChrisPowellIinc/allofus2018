import m from "mithril";
// import izitoast from "izitoast";
import Shell from "containers/shell";
import Modal from "./modal";
import CreatePost from "./createpost";

const posts = [
  {
    id: 1,
    meme: "#!",
    description: "Description goes here..."
  },
  {
    id: 2,
    meme: "#!",
    description: "Description goes here..."
  },
  {
    id: 3,
    meme: "#!",
    description: "Description goes here..."
  },
  {
    id: 4,
    meme: "#!",
    description: "Description goes here..."
  }
];

var TimeLine = {
  oncreate: vnode => {
    vnode.state.posts = posts;
    m.redraw();
    // m.request({
    //   url: "https://jsonplaceholder.typicode.com/posts",
    //   method: "GET"
    // })
    //   .then(resp => {
    //     vnode.state.posts = posts;
    //     m.redraw();
    //   })
    //   .catch(err => {
    //     izitoast.error({
    //       title: "error",
    //       message: err.message
    //     });
    //   });
  },
  openPost: () => {
    var modal = document.querySelector("ons-modal");
    modal.addEventListener("preshow", () => {
      Modal.content = CreatePost;
    });
    modal.addEventListener("posthide", () => {
      Modal.content = {};
    });
    modal.toggle({ animation: "fade" });
  },
  view: vnode => (
    <Shell>
      <section class="p-2">
        <ul class="list list--material overflow-auto content-height">
          {vnode.state.posts &&
            vnode.state.posts.map(post => (
              <li class="list-item list-item--material border-bottom">
                <div class="list-item__left list-item--material__left">
                  <img
                    class="list-item__thumbnail list-item--material__thumbnail"
                    src={post.meme}
                    alt="Cute kitten"
                  />
                </div>

                <div class="list-item__center list-item--material__center">
                  <div class="list-item__title list-item--material__title">
                    Post number: {post.id}
                  </div>
                  <div class="list-item__subtitle list-item--material__subtitle">
                    {post.description}
                    <img
                      class="w-100 rounded mt-2"
                      height="200px"
                      src="https://placekitten.com/g/300/200"
                      alt="Cute kitten"
                    />
                    <div class="py-2">
                      <ons-button modifier="quiet">
                        <span class="fa fa-exclamation" />
                      </ons-button>
                      <button class="button mr-2">
                        <span class="fa fa-share-alt" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <ons-fab
          data-toggle="modal"
          data-target="#exampleModal"
          class="mb-5"
          position="bottom left"
          onclick={TimeLine.openPost}
        >
          <ons-icon icon="md-plus" />
        </ons-fab>
      </section>
    </Shell>
  )
};

export default TimeLine;
