import m from "mithril";
import Shell from "containers/shell";
// import CCapture from "../../../node_modules/ccapture.js/src/CCapture.js";
// import izitoast from "izitoast";
import Modal from "./modal";
import CreatePost from "./createpost";
import Post from "./post";

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
    Post.printMyName();
    // var capturer = new CCapture({ format: "jpg" });
    // capturer.start();
    // setTimeout(() => {
    //   capturer.stop();

    //   // default save, will download automatically a file called {name}.extension (webm/gif/tar)
    //   capturer.save();

    //   // custom save, will get a blob in the callback
    //   capturer.save(blob => {
    //     console.log(blob);
    //   });
    // }, 5000);
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
            vnode.state.posts.map(post => <Post post={post} name="david" />)}
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
