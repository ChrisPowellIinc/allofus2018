import m from "mithril";

const Post = {
  printMyName() {
    console.log("Hello there, my name is Mr. Chris Powell");
  },
  view: vnode => {
    console.log(vnode.attrs);
    return (
      <li class="list-item list-item--material border-bottom">
        <div class="list-item__left list-item--material__left">
          <img
            class="list-item__thumbnail list-item--material__thumbnail"
            src={vnode.attrs.post.meme}
            alt="Cute kitten"
          />
        </div>
        <div class="list-item__center list-item--material__center">
          <div class="list-item__title list-item--material__title">
            Post number: {vnode.attrs.post.id}
          </div>
          <div class="list-item__subtitle list-item--material__subtitle">
            {vnode.attrs.post.description}
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
    );
  }
};

export default Post;
