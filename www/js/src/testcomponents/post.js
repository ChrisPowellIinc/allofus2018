import m from "mithril";

const Post = {
  view({ attrs: { post } }) {
    // const post = vnode.attrs.post;
    return (
      <div class="">
        <h4>
          <a
            // href={`/sean?comment=true&item=${post.id}`}
            href={`/sean/${post.id}`}
            oncreate={m.route.link}
          >
            <b>{post.id}</b> - {post.title}
          </a>
        </h4>
        <p>{post.body}</p>
      </div>
    );
  }
};

export default Post;
