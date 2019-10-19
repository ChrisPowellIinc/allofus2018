import m from "mithril";
import Footer from "components/homefooter";
import Post from "./post";

const PostView = {
  post: {}, // initially the lenght of empty array is zero
  LoadComment(id) {
    m.request({
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
      method: "GET"
    })
      .then(res => {
        console.log(res);
        PostView.post = res;
        m.redraw();
      })
      .catch(err => {
        console.log(err);
      });
  },
  oncreate(vnode) {
    PostView.LoadComment(vnode.attrs.postid);
  },
  view(vnode) {
    console.log(vnode);
    return (
      <section>
        <h1>Sean the Genius!!!</h1>
        <h2>Sean is in connecticut</h2>
        <button onclick={PostView.LoadComment}>click me</button>
        <div style="height: 350px; width: 100%; overflow: auto; border: 1px solid red; padding: 1rem;">
          {PostView.post.id ? <Post post={PostView.post} /> : ""}
        </div>
        <Footer />
      </section>
    );
  }
};

export default PostView;
