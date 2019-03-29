import m from "mithril";
import Shell from "containers/shell";

const CreatePost = {
  post_type: "post",
  view: vnode => (
    <Shell>
      <section class="p-2">
        <ons-page>
          <ons-toolbar>
            <div class="center">
              <ons-segment id="segment" tabbar-id="tabbar" style="width: 180px">
                <button>Post</button>
                <button>Meme</button>
              </ons-segment>
            </div>
          </ons-toolbar>
        </ons-page>
        {CreatePost.post_type === "post" ? (
          <section>
            <textarea>Hello</textarea>
            <button>POST</button>
          </section>
        ) : (
          <section>
            <h2>make meme</h2>
          </section>
        )}
        {/* <div style="text-align: center; margin-top: 30px;">
        <h1>make a post</h1>
        <textarea
          class="textarea"
          oninput={m.withAttr("value", value => {
            CreatePost.post.text = value;
          })}
          rows="3"
          placeholder="Textarea"
        >
          hi
        </textarea>
        <button
          class="button"
          onclick={() => {
            console.log(CreatePost.post);
          }}
        >
          POST
        </button>
      </div> */}
      </section>
    </Shell>
  )
};

export default CreatePost;
