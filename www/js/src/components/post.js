import m from "mithril";
import Auth from "services/auth";

const Post = {
  /*
  prev() {
    var carousel = document.getElementById("carousel");
    carousel.prev();
  },

  next() {
    var carousel = document.getElementById("carousel");
    carousel.next();
  },
  oncreate() {
    ons.ready(() => {
      var carousel = document.addEventListener("postchange", event => {
        console.log(`Changed to ${event.activeIndex}`);
      });
    });
  },
  
  changeCarousel() {
    Post.cellCount = Post.cellsRange.value;
    Post.theta = 360 / Post.cellCount;
    var cellSize = Post.isHorizontal ? Post.cellWidth : Post.cellHeight;
    Post.radius = Math.round(cellSize / 2 / Math.tan(Math.PI / Post.cellCount));
    for (var i = 0; i < Post.cells.length; i++) {
      var cell = Post.cells[i];
      if (i < Post.cellCount) {
        // visible cell
        cell.style.opacity = 1;
        var cellAngle = Post.theta * i;
        cell.style.transform = `${Post.rotateFn}(${cellAngle}deg) translateZ(${
          Post.radius
        }px)`;
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = "none";
      }
    }

    Post.rotateCarousel();
  },
  onOrientationChange() {
    var checkedRadio = document.querySelector(
      'input[name="orientation"]:checked'
    );
    Post.isHorizontal = checkedRadio.value === "horizontal";
    Post.rotateFn = Post.isHorizontal ? "rotateY" : "rotateX";
    Post.changeCarousel();
  },
  rotateCarousel() {
    var angle = Post.theta * Post.selectedIndex * -1;
    Post.carousel.style.transform = `translateZ(${-Post.radius}px) ${
      Post.rotateFn
    }(${angle}deg)`;
  },
 

  
  oncreate() {
    console.log("testing on createloop");
    //  Post.card = document.getElementById("xonpost2");
    // Post.carousel = document.querySelector(".carousel");
    // Post.cells = Post.carousel.querySelectorAll(".carousel__cell");
    // Post.cellCount; // cellCount set from cells-range input value
    //    Post.selectedIndex = 0;
    //    Post.cellWidth = Post.carousel.offsetWidth;
    //    Post.cellHeight = Post.carousel.offsetHeight;
    //   Post.isHorizontal = true;
    // // Post.rotateFn = Post.isHorizontal ? "rotateY" : "rotateX";
    // Post.radius, Post.theta;
    // console.log( cellWidth, cellHeight );
    //    Post.prevButton = document.querySelector(".previous-button");
    // /   Post.nextButton = document.querySelector(".next-button");
    //   Post.cellsRange = document.querySelector(".cells-range");
    // Post.orientationRadios = document.querySelectorAll(
    //     'input[name="orientation"]'
    // /  );

    //  Post.card.addEventListener("click", () => {
    //  Post.cardflippost();
    //  });

    //  Post.prevButton.addEventListener("click", () => {
    //    Post.selectedIndex--;
    //    Post.rotateCarousel();
    //  });

    //   Post.nextButton.addEventListener("click", () => {
    //    Post.selectedIndex++;
    //    Post.rotateCarousel();
    // });

    //  Post.cellsRange.addEventListener("change", Post.changeCarousel);
    //   Post.cellsRange.addEventListener("input", Post.changeCarousel);

    //  (function() {
    //   for (var i = 0; i < Post.orientationRadios.length; i++) {
    //     var radio = Post.orientationRadios[i];
    //    radio.addEventListener("change", Post.onOrientationChange);
    //   }
    //    })();

    // set initials
    //  Post.onOrientationChange();
  },
 */
  reactionhighlight(postid) {
    document.getElementById(`reactionscontainerx${postid}`).className =
      "reactionssmaller";
  },
  responsemagni(postid) {
    document.getElementById(`reactionscontainerx${postid}`).className =
      "reactionssmaller";
  },
  reactionexpand(postid) {
    document.getElementById(`reactionscontainerx${postid}`).className =
      "reactionslarger";
  },
  cardflippost(postid) {
    var card = document.getElementById(`xonpost${postid}`);
    var bigmoveslide = document.getElementById(`bigmove${postid}`);
    var minireactionsx = document.getElementById(`commentmini${postid}`);

    bigmoveslide.classList.toggle("bigmovemem5");
    card.classList.toggle("is-flipped");
    minireactionsx.classList.toggle("headerclosed");

    console.log("flipped");
  },
  memeselectortoggle(postid) {
    console.log(postid);

    var element = document.getElementById(`openmembox${postid}`);

    element.classList.toggle("openmemebox");
    document
      .getElementById(`contentbighold${postid}`)
      .classList.toggle("scaleulard");
  },

  descbotogglex(postid) {
    var elementex = document.getElementById(`descbag${postid}`);

    elementex.classList.toggle("contentdescripexpand");
  },
  memecontrolax1(postid) {
    console.log(postid);
    document.getElementById(`memeidx${postid}`).className =
      "memeid memeselected";
    document.getElementById(`memeopt2x${postid}`).className = "memeopt2";
    document.getElementById(`memeopt3x${postid}`).className = "memeopt3";
    document.getElementById(`memeopt4x${postid}`).className = "memeopt4";
    document.getElementById(`memeopt5x${postid}`).className = "memeopt5";
    document.getElementById(`block1x${postid}`).className = "memeytext1";
    document.getElementById(`block2x${postid}`).className = "memeytext2";
    document.getElementById(`bigmove${postid}`).className =
      "bigmovemem1 scene scene--card";
  },

  memecontrolax2(postid) {
    console.log(postid);
    document.getElementById(`memeidx${postid}`).className = "memeid";
    document.getElementById(`memeopt2x${postid}`).className =
      "memeopt2 memeselected";
    document.getElementById(`memeopt3x${postid}`).className = "memeopt3";
    document.getElementById(`memeopt4x${postid}`).className = "memeopt4";
    document.getElementById(`memeopt5x${postid}`).className = "memeopt5";

    document.getElementById(`block1x${postid}`).className = "hiddenelement";
    document.getElementById(`block2x${postid}`).className = "memeytext4";
    document.getElementById(`bigmove${postid}`).className =
      "bigmovemem2 scene scene--card";
  },
  memecontrolax3(postid) {
    console.log(postid);
    document.getElementById(`memeidx${postid}`).className = "memeid";
    document.getElementById(`memeopt2x${postid}`).className = "memeopt2";
    document.getElementById(`memeopt3x${postid}`).className =
      "memeopt3 memeselected";
    document.getElementById(`memeopt4x${postid}`).className = "memeopt4";
    document.getElementById(`memeopt5x${postid}`).className = "memeopt5";
    document.getElementById(`block1x${postid}`).className = "memeytext5";
    document.getElementById(`block2x${postid}`).className = "memeytext4";
    document.getElementById(`bigmove${postid}`).className =
      "bigmovemem2 scene scene--card";
  },
  memecontrolax4(postid) {
    console.log(postid);
    document.getElementById(`memeidx${postid}`).className = "memeid";
    document.getElementById(`memeopt2x${postid}`).className = "memeopt2";
    document.getElementById(`memeopt3x${postid}`).className = "memeopt3";
    document.getElementById(`memeopt4x${postid}`).className =
      "memeopt4 memeselected";
    document.getElementById(`memeopt5x${postid}`).className = "memeopt5";
    document.getElementById(`block1x${postid}`).className = "memeytext7";
    document.getElementById(`block2x${postid}`).className = "memeytext4";
    document.getElementById(`bigmove${postid}`).className =
      "bigmovemem4 scene scene--card";
  },
  memecontrolax5(postid) {
    console.log(postid);
    document.getElementById(`memeidx${postid}`).className = "memeid";
    document.getElementById(`memeopt2x${postid}`).className = "memeopt2";
    document.getElementById(`memeopt3x${postid}`).className = "memeopt3";
    document.getElementById(`memeopt4x${postid}`).className = "memeopt4";
    document.getElementById(`memeopt5x${postid}`).className =
      "memeopt5 memeselected";
    document.getElementById(`block1x${postid}`).className = "memeytext7";
    document.getElementById(`block2x${postid}`).className = "hiddenelement";
    document.getElementById(`bigmove${postid}`).className =
      "bigmovemem4 scene scene--card";
  },

  printMyName() {
    console.log("Hello there, my name is Mr. Chris Powell");
  },

  view: vnode => {
    console.log(vnode.attrs);

    return (
      <li class="list-item list-item--material border-bottom">
        <div id={`headflip${vnode.attrs.post.id}`} class="headerclosed" />
        <div
          id={`posttopsx${vnode.attrs.post.id}`}
          class="list-item__center list-item--material__center"
        >
          <div class="list-item__left list-item--material__left" />
          <div class="list-item__title list-item--material__title">
            <div style="    width: -webkit-fill-available;">
              <div class="col-2" style="    float: left;">
                <img
                  class="list-item__thumbnail list-item--material__thumbnail"
                  src={vnode.attrs.post.meme}
                  alt="Cute kitten"
                />
              </div>
              <div class="col-6" style="    float: left;">
                Post number: 1 {`${Auth.user.username}`}
              </div>
            </div>
          </div>
          <div class="list-item__subtitle list-item--material__subtitle">
            <div id={`bigmove${vnode.attrs.post.id}`} class="scene scene--card">
              <div id={`xonpost${vnode.attrs.post.id}`} class="cardx">
                <div class="card__face card__face--front">
                  <div id={`contentbighold${vnode.attrs.post.id}`}>
                    <textarea
                      id={`block1x${vnode.attrs.post.id}`}
                      contenteditable="true"
                      class="hiddenelement"
                      placeholder="MEME"
                    />
                    <img
                      class="w-100 h-100x"
                      src={vnode.attrs.post.postimage}
                      alt="Cute kitten"
                    />
                    <textarea
                      id={`block2x${vnode.attrs.post.id}`}
                      contenteditable="true"
                      class="hiddenelement"
                      placeholder="MEME"
                    />
                  </div>
                </div>

                <div class="card__face card__face--back">
                  <div
                    id={`responsemagni${vnode.attrs.post.id}`}
                    class=""
                    onclick={() => {
                      Post.responsemagni(vnode.attrs.post.id);
                    }}
                  >
                    <div
                      id={`memecommentchangex${vnode.attrs.post.id}`}
                      class="memecommentchange"
                    >
                      <div id="block1x1" class="memeytext1">
                        When is it coming to YouTube{" "}
                        <span role="img" aria-label="hello">
                          👀
                        </span>
                      </div>
                      <img
                        src={vnode.attrs.post.postimage}
                        alt="Cute kitten"
                        class="w-100 h-100x"
                      />
                      <div id="block2x1" class="memeytext2">
                        Verified Newyork City ft fatjoe video is out now on
                        today go check it out if u fuck wit th song or video
                        drop a Statue of Liberty{" "}
                        <span role="img" aria-label="hello">
                          🗽
                        </span>{" "}
                        in the comments
                      </div>
                    </div>

                    <div
                      id={`memedisplayedpostx${vnode.attrs.post.id}`}
                      class="memedisplayedpost"
                    />
                  </div>
                  <div
                    id={`reactionscontainerx${vnode.attrs.post.id}`}
                    class="reactionscontainer"
                    onclick={() => {
                      Post.reactionexpand(vnode.attrs.post.id);
                    }}
                  >
                    <div class="responseholderx" tappable>
                      <div class="col-2" style="float: left;">
                        <img
                          src="https://randomuser.me/api/portraits/women/74.jpg"
                          alt="Cute kitten"
                          class="list-item__thumbnail list-item--material__thumbnail2"
                        />
                      </div>
                      <div class="col-10 microrepsonsesb1 statcomment4">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                      <div class="col-12 microrepsonsesb1 statcomment4">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                      <div
                        class="col-12 microrepsonsesbstatbar3 statcomment4"
                        style="
                        background-color: #fff;
                        box-shadow: 1px 1px 2px #CCC;
                    "
                      >
                        <iframe
                          src="http://www.all-of.us/stat/stat4.html"
                          width="100%"
                          height="24px"
                          title="Statbar"
                          frameborder="0"
                          style="float: left;margin-top: 1vh;border-bottom-right-radius: 25px;width: 66%;"
                        />
                        <div
                          class="col-2 microrepsonsesb1"
                          style="
                        background-color: #fff0;
                    "
                        >
                          <button
                            class="button mr-2 "
                            style="
                        transform: scale(.7);
                    "
                          >
                            <span class="fa fa-exclamation" />
                          </button>
                        </div>
                        <div
                          class="col-2 microrepsonsesb1"
                          style="
                        background-color: #fff0;
                    "
                        >
                          <button
                            class="button mr-2 "
                            style="
                        transform: scale(.7);
                    "
                          >
                            <div class="responsesx">23</div>
                            <span class="fa fa-comment" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="responseholderx" tappable>
                      <div class="col-2" style="float: left;">
                        <img
                          src="https://randomuser.me/api/portraits/women/74.jpg"
                          alt="Cute kitten"
                          class="list-item__thumbnail list-item--material__thumbnail2"
                        />
                      </div>
                      <div class="col-10 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                      <div class="col-12 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                    </div>

                    <div class="responseholderx" tappable>
                      <div class="col-2" style="float: left;">
                        <img
                          src="https://randomuser.me/api/portraits/women/74.jpg"
                          alt="Cute kitten"
                          class="list-item__thumbnail list-item--material__thumbnail2"
                        />
                      </div>
                      <div class="col-10 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                      <div class="col-12 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                    </div>

                    <div class="responseholderx" tappable>
                      <div class="col-2" style="float: left;">
                        <img
                          src="https://randomuser.me/api/portraits/women/74.jpg"
                          alt="Cute kitten"
                          class="list-item__thumbnail list-item--material__thumbnail2"
                        />
                      </div>
                      <div class="col-10 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                      <div class="col-12 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                    </div>

                    <div class="responseholderx" tappable>
                      <div class="col-2" style="float: left;">
                        <img
                          src="https://randomuser.me/api/portraits/women/74.jpg"
                          alt="Cute kitten"
                          class="list-item__thumbnail list-item--material__thumbnail2"
                        />
                      </div>
                      <div class="col-10 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                      <div class="col-12 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                    </div>

                    <div class="responseholderx" tappable>
                      <div class="col-2" style="float: left;">
                        <img
                          src="https://randomuser.me/api/portraits/women/74.jpg"
                          alt="Cute kitten"
                          class="list-item__thumbnail list-item--material__thumbnail2"
                        />
                      </div>
                      <div class="col-10 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                      <div class="col-12 microrepsonsesb1">
                        OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id={`descbag${vnode.attrs.post.id}`}
              class="contentdescripx"
              onclick={() => {
                Post.descbotogglex(vnode.attrs.post.id);
              }}
            >
              {vnode.attrs.post.description}
            </div>
            <div
              id={`commentmini${vnode.attrs.post.id}`}
              class="commentmini"
              onclick={() => {
                Post.cardflippost(vnode.attrs.post.id);
              }}
            >
              <div class="responseholderx">
                <div class="col-2" style="float: left;">
                  <img
                    src="https://randomuser.me/api/portraits/women/74.jpg"
                    alt="Cute kitten"
                    class="list-item__thumbnail list-item--material__thumbnail2"
                  />
                </div>

                <div class="col-10 microrepsonsesb1">
                  OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                </div>
                <div class="col-12 microrepsonsesb1">
                  OPEN TO TESTING IS ALSO THE NOTHING THAT COMES WITH THE{" "}
                </div>
              </div>

              <div class="responseholderx">
                <div class="col-2" style="float: left;">
                  <img
                    src="https://randomuser.me/api/portraits/women/49.jpg"
                    alt="Cute kitten"
                    class="list-item__thumbnail list-item--material__thumbnail2"
                  />
                </div>

                <div class="col-10 microrepsonsesb2">
                  123 123 All of this to me is a mystery
                </div>
              </div>
            </div>

            <div id={`openmembox${vnode.attrs.post.id}`} class="hiddenelement">
              <span
                id={`memeidx${vnode.attrs.post.id}`}
                onclick={() => {
                  Post.memecontrolax1(vnode.attrs.post.id);
                }}
                class="memeid"
              />
              <span
                id={`memeopt2x${vnode.attrs.post.id}`}
                onclick={() => {
                  Post.memecontrolax2(vnode.attrs.post.id);
                }}
                class="memeopt2"
              />
              <span
                id={`memeopt3x${vnode.attrs.post.id}`}
                onclick={() => {
                  Post.memecontrolax3(vnode.attrs.post.id);
                }}
                class="memeopt3"
              />
              <span
                id={`memeopt4x${vnode.attrs.post.id}`}
                onclick={() => {
                  Post.memecontrolax4(vnode.attrs.post.id);
                }}
                class="memeopt4"
              />
              <span
                id={`memeopt5x${vnode.attrs.post.id}`}
                onclick={() => {
                  Post.memecontrolax5(vnode.attrs.post.id);
                }}
                class="memeopt5"
              />
            </div>

            <div class="py-2">
              <button class="button mr-2 xtrapost-5">
                <span class="fa fa-exclamation" />
              </button>
              <button
                onclick={() => {
                  Post.memeselectortoggle(vnode.attrs.post.id);
                }}
                class="button mr-2"
              >
                <span class="fa fa-text-height" />
              </button>
              <button
                class="button mr-2"
                onclick={() => {
                  Post.cardflippost(vnode.attrs.post.id);
                }}
              >
                <div class="responsesx">23</div>
                <span class="fa fa-comments-o" />
              </button>
              <button class="button mr-2">
                <span class="fa fa-video-camera" />
              </button>
              <button class="button mr-2">
                <span class="fa fa-floppy-o" />
              </button>
              <button class="button mr-3">
                <span class="fa fa-compress-arrows-alt" />
              </button>
              <iframe
                src="http://www.all-of.us/stat/stat4.html"
                width="100%"
                height="24px"
                scroll="noscroll"
                title="Statbar"
                frameborder="0"
                style="float: right;margin-top: 1vh; border-bottom-right-radius: 25px;"
              />
            </div>
          </div>
        </div>
      </li>
    );
  }
};

export default Post;
