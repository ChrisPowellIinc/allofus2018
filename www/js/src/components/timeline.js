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
    meme: "https://randomuser.me/api/portraits/women/74.jpg",
    description:
      "    Search for them on YouTube –  ID: A36087 👀🤩😍🎊🎉 Youve been VRd, and we cant wait to show the World inside!  in VirtualReality! Use your phone or VR headset to see RealEstate & Business listings virtually at www.LUXVRTOURS.com! How do you use it? 🧐🤔😏 Rotate, tilt, and turn around with your device to change the perspective! Its that simple, welcome to the future! ",
    postimage:
      "https://luxvrtours.com/wp-content/uploads/2018/06/videotogif_2019.05.19_12.26.27.gif"
  },
  {
    id: 2,
    meme: "https://randomuser.me/api/portraits/women/79.jpg",
    description: "Description goes here...",

    postimage:
      "https://luxvrtours.com/wp-content/uploads/2018/06/videotogif_2019.04.02_09.04.48.gif"
  },
  {
    id: 3,
    meme: "https://randomuser.me/api/portraits/women/71.jpg",
    description: "Description goes here...",
    postimage:
      "https://luxvrtours.com/wp-content/uploads/2019/04/47693882_369578260495706_2448362123827963562_n.jpg"
  },
  {
    id: 4,
    meme: "https://randomuser.me/api/portraits/women/77.jpg",
    description: "Description goes here...",
    postimage:
      "https://luxvrtours.com/wp-content/uploads/2019/04/47692144_355813028330488_5537805512013348493_n.jpg"
  }
];

var TimeLine = {
  headerblur: () => {
    document.getElementById(`headertopbar`).className = "applyblur";
  },

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
    //  modal.addEventListener("preshow", () => {
    Modal.content = CreatePost;
    // });
    // modal.addEventListener("posthide", () => {
    //     Modal.content = {};
    //  });

    modal.toggle({ animation: "fade" });
  },
  view: vnode => (
    <Shell>
      <section onclick={TimeLine.headerblur} class="post-displayx">
        <ons-list class="list list--material overflow-auto content-height">
          {vnode.state.posts &&
            vnode.state.posts.map(post => <Post post={post} name="david" />)}
        </ons-list>
        <ons-fab
          data-toggle="modal"
          data-target="#exampleModal"
          class="mb-5"
          style="display: none"
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
