import m from "mithril";
import Peer from "simple-peer";
import SocketService from "./socket";

var RTCService = {
  localVideo: document.getElementById("localVideo"),
  remoteVideo: document.getElementById("remoteVideo"),
  client: {},
  localStream: {},
  peer: {},
  recipient: "",
  // used to initialize a peer
  InitPeer(type) {
    console.log("localstream-3: ", RTCService.localStream);
    RTCService.client.peer = new Peer({
      initiator: type === "init",
      stream: RTCService.localStream,
      trickle: false,
      reconnectTimer: 100,
      iceTransportPolicy: "relay",
      config: {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302"
            // username: "pasaseh@ether123.net",
            // credential: "12345678"
          },
          {
            url: "turn:numb.viagenie.ca",
            username: "webrtc@live.com",
            credential: "muazkh"
          }
        ]
      }
    });
    RTCService.client.peer.on("error", err => console.log("error", err));
    RTCService.client.peer.on("stream", stream => {
      console.log("got stream");
      RTCService.CreateVideo(stream);
    });
    RTCService.client.peer.on("data", data => {
      console.log("got data...");
      const decodedData = new TextDecoder("utf-8").decode(data);
      // const peervideo = document.querySelector("#peerVideo");
      RTCService.remoteVideo.style.filter = decodedData;
    });
    return RTCService.client.peer;
  },
  // for peer of type init
  MakePeer() {
    RTCService.client.gotAnswer = false;
    console.log("localstream-2: ", RTCService.localStream);
    // RTCService.client.peer =
    RTCService.InitPeer("init");
    RTCService.client.peer.on("signal", data => {
      if (!RTCService.client.gotAnswer) {
        if (RTCService.recipient) {
          console.log("sending offer...", data);
          data.type = "offer";
          data.recipient = RTCService.recipient;
          SocketService.message(data);
        } else {
          console.log("no recipient to call...");
        }
      } else {
        console.log("have answer already...");
      }
    });
    // RTCService.client.peer = peer;
  },
  InitMedia(stream) {
    console.log("Received local stream");
    RTCService.localVideo = document.getElementById("localVideo");
    RTCService.remoteVideo = document.getElementById("remoteVideo");
    RTCService.localVideo.srcObject = stream;
    RTCService.localVideo.play();
    RTCService.localStream = stream;
    console.log("localstream: ", RTCService.localStream);
  },
  HandleReply() {
    // this means the other person has accepted the call.
    document.addEventListener(
      "accept",
      data => {
        // you made the call that is why you are receiving this event.
        // so the localstream has been created already.
        RTCService.MakePeer();
      },
      false
    );
    // this means the other person has sent an offer...
    document.addEventListener(
      "offer",
      data => {
        // handle the offer send by the other person,
        // by replying with an answer
        RTCService.FrontAnswer(data.detail);
      },
      false
    );
    // this means the other person has sent an answer...
    document.addEventListener(
      "answer",
      data => {
        RTCService.SignalAnswer(data.detail.answer);
      },
      false
    );
  },
  call(user_email) {
    RTCService.recipient = user_email;
    console.log("Requesting local stream");
    return navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(stream => {
        RTCService.InitMedia(stream);
        if (RTCService.recipient) {
          SocketService.message({
            type: "call",
            recipient: RTCService.recipient
          });
        } else {
          console.log("no recipient to call...");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  // Answer call
  AnswerCall(recipient) {
    // RTCService.FrontAnswer(offer);
    SocketService.message({
      type: "accept",
      recipient
    });
  },
  SignalAnswer(answer) {
    RTCService.client.gotAnswer = true;
    const { peer } = RTCService.client;
    peer.signal(answer);
    // RTCService.client.peer.on("error", err => console.log("error", err));
    // RTCService.client.peer.on("signal", data => {
    //   console.log("answer signal: ", data);
    // });
    // RTCService.client.peer.signal(JSON.stringify(answer));
  },
  DeclineCall() {
    console.log("decline call...");
  },
  FrontAnswer(offer) {
    // RTCService.client.peer =
    RTCService.InitPeer("notInit");
    RTCService.client.peer.on("signal", data => {
      console.log("socket sending answer: ", data);
      var d = {};
      d.type = "answer";
      d.recipient = RTCService.recipient;
      d.answer = data;
      SocketService.message(d);
    });
    console.log("offer: ", offer);
    RTCService.client.peer.signal(offer);
  },
  CreateVideo(stream) {
    RTCService.remoteVideo.srcObject = stream;
    RTCService.remoteVideo.play();
    RTCService.remoteVideo.addEventListener("click", () => {
      if (RTCService.remoteVideo.volume !== 0)
        RTCService.remoteVideo.volume = 0;
      else RTCService.remoteVideo.volume = 1;
    });
  },
  CreateDiv() {
    const div = document.createElement("div");
    div.setAttribute("class", "centered");
    div.id = "muteText";
    div.innerHTML = "Click to Mute/Unmute";
    document.querySelector("#peerDiv").appendChild(div);
    // if (checkboxTheme.checked === true)
    //   document.querySelector("#muteText").style.color = "#fff";
  },
  hangup() {
    document.getElementById("localVideo").remove();
    document.getElementById("remoteVideo").remove();
    if (RTCService.client.peer) {
      RTCService.client.peer.destroy();
    }
  }
};

export default RTCService;
