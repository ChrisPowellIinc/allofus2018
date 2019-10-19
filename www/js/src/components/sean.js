import m from "mithril";
import Footer from "components/homefooter";
import Post from "../testcomponents/post";

const Sean = {
  posts: [], // initially the lenght of empty array is zero
  LoadComment() {
    m.request({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET"
    })
      .then(res => {
        console.log(res);
        Sean.posts = res;
        m.redraw();
      })
      .catch(err => {
        console.log(err);
      });
  },
  oncreate(vnode) {
    console.log(vnode);
    if (vnode.attrs.comment) {
      Sean.LoadComment();
    }
  },
  view(vnode) {
    return (
      <div>
        <h1>Sean the Genius!!!</h1>
        <h2>Sean is in connecticut</h2>
        <button onclick={Sean.LoadComment}>click me</button>
        <div style="height: 350px; width: 100%; overflow: auto; border: 1px solid red; padding: 1rem;">
          {Sean.posts.length > 0
            ? Sean.posts.map(post => <Post post={post} />)
            : ""}
        </div>
        <Footer />
      </div>
    );
  }
};

export default Sean;
