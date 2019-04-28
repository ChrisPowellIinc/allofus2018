import m from "mithril";
import SocketService from "./socket";

const RTC = {
  localStream: null,
  localVideo: document.getElementById("myvideo"),
  remoteVideo: document.getElementById("remotevideo"),
  isInitiator: false,
  gotStream(stream) {
    console.log("Adding local stream.");
    RTC.localStream = stream;
    RTC.localVideo.srcObject = stream;
    SocketService.sendMessage("got user media");
    if (RTC.isInitiator) {
      maybeStart();
    }
  },
  // start the whole process, i should maybe change the name...
  GetUserMedia() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true
      })
      .then(stream => {
        // stream.st
        RTC.gotStream(stream);
      })
      .catch(e => {
        console.log(`getUserMedia() error: ${e.name}`);
      });
  },
  stop() {
    if (RTC.localStream !== null) {
      RTC.localStream.getTracks().forEach(track => track.stop());
    }
  }
};

export default RTC;
