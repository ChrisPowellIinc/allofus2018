import m from "mithril";
import Shell from "containers/shell";
import RTCservice from "services/rtc";

var Videos = {
  oncreate: () => {
    console.log("Create the user media here");
    const localVideo = document.getElementById("myvideo");
    RTCservice.localVideo = localVideo;
    RTCservice.GetUserMedia();
  },
  onremove: () => {
    console.log("remove this vnode");
    RTCservice.stop();
  },
  view: vnode => (
    <Shell>
      <section class="h-100">
        <div class="" style="height: calc(100% - 44px)">
          <video id="myvideo" class="h-100" autoplay muted playsinline />
          <video id="remotevideo" class="h-100" autoplay muted playsinline />
        </div>
      </section>
    </Shell>
  )
};

export default Videos;
