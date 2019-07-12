import m from "mithril";

var RTCService = {
  localVideo: document.getElementById("localVideo"),
  remoteVideo: document.getElementById("remoteVideo"),
  localStream: null,
  pc1: null,
  pc2: null,
  offerOptions: {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  },
  startTime: 0,
  getName(pc) {
    return pc === RTCService.pc1 ? "pc1" : "pc2";
  },
  getOtherPc(pc) {
    return pc === RTCService.pc1 ? RTCService.pc2 : RTCService.pc1;
  },
  start() {
    RTCService.localVideo = document.getElementById("localVideo");
    RTCService.remoteVideo = document.getElementById("remoteVideo");
    console.log("Requesting local stream");
    // startButton.disabled = true;
    // try {
    return navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true
      })
      .then(stream => {
        console.log("Received local stream");
        RTCService.localVideo.srcObject = stream;
        RTCService.localStream = stream;
        RTCService.addListeners();
      });
    // callButton.disabled = false;
    // } catch (e) {
    //   console.log(`getUserMedia() error: ${e.name}`);
    // }
  },
  addListeners() {
    RTCService.localVideo.addEventListener("loadedmetadata", () => {
      console.log(
        `Local video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`
      );
    });

    RTCService.remoteVideo.addEventListener("loadedmetadata", () => {
      console.log(
        `Remote video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`
      );
    });

    RTCService.remoteVideo.addEventListener("resize", () => {
      console.log(
        `Remote video size changed to ${RTCService.remoteVideo.videoWidth}x${RTCService.remoteVideo.videoHeight}`
      );
      // We'll use the first onsize callback as an indication that video has started
      // playing out.
      if (RTCService.startTime) {
        const elapsedTime = window.performance.now() - RTCService.startTime;
        console.log(`Setup time: ${elapsedTime.toFixed(3)}ms`);
        RTCService.startTime = null;
      }
    });
  },
  getSelectedSdpSemantics() {
    return { sdpSemantics: "unified-plan" };
    // const sdpSemanticsSelect = document.querySelector("#sdpSemantics");
    // const option = sdpSemanticsSelect.options[sdpSemanticsSelect.selectedIndex];
    // return option.value === "" ? {} : { sdpSemantics: option.value };
  },
  async call() {
    // callButton.disabled = true;
    // hangupButton.disabled = false;
    console.log("Starting call");
    RTCService.startTime = window.performance.now();
    const videoTracks = RTCService.localStream.getVideoTracks();
    const audioTracks = RTCService.localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      console.log(`Using video device: ${videoTracks[0].label}`);
    }
    if (audioTracks.length > 0) {
      console.log(`Using audio device: ${audioTracks[0].label}`);
    }
    const configuration = RTCService.getSelectedSdpSemantics();
    console.log("RTCPeerConnection configuration:", configuration);
    RTCService.pc1 = new RTCPeerConnection(configuration);
    console.log("Created local peer connection object pc1");
    RTCService.pc1.addEventListener("icecandidate", e =>
      RTCService.onIceCandidate(RTCService.pc1, e)
    );
    RTCService.pc2 = new RTCPeerConnection(configuration);
    console.log("Created remote peer connection object pc2");
    RTCService.pc2.addEventListener("icecandidate", e =>
      RTCService.onIceCandidate(RTCService.pc2, e)
    );
    RTCService.pc1.addEventListener("iceconnectionstatechange", e =>
      RTCService.onIceStateChange(RTCService.pc1, e)
    );
    RTCService.pc2.addEventListener("iceconnectionstatechange", e =>
      RTCService.onIceStateChange(RTCService.pc2, e)
    );
    RTCService.pc2.addEventListener("track", RTCService.gotRemoteStream);

    RTCService.localStream
      .getTracks()
      .forEach(track => RTCService.pc1.addTrack(track, RTCService.localStream));
    console.log("Added local stream to pc1");

    try {
      console.log("pc1 createOffer start");
      const offer = await RTCService.pc1.createOffer(RTCService.offerOptions);
      await RTCService.onCreateOfferSuccess(offer);
    } catch (e) {
      RTCService.onCreateSessionDescriptionError(e);
    }
  },
  onCreateSessionDescriptionError(error) {
    console.log(`Failed to create session description: ${error.toString()}`);
  },
  async onCreateOfferSuccess(desc) {
    console.log(`Offer from pc1\n${desc.sdp}`);
    console.log("pc1 setLocalDescription start");
    try {
      await RTCService.pc1.setLocalDescription(desc);
      RTCService.onSetLocalSuccess(RTCService.pc1);
    } catch (e) {
      onSetSessionDescriptionError();
    }

    console.log("pc2 setRemoteDescription start");
    try {
      await RTCService.pc2.setRemoteDescription(desc);
      RTCService.onSetRemoteSuccess(RTCService.pc2);
    } catch (e) {
      onSetSessionDescriptionError();
    }

    console.log("pc2 createAnswer start");
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    try {
      const answer = await RTCService.pc2.createAnswer();
      await RTCService.onCreateAnswerSuccess(answer);
    } catch (e) {
      RTCService.onCreateSessionDescriptionError(e);
    }
  },

  onSetLocalSuccess(pc) {
    console.log(`${RTCService.getName(pc)} setLocalDescription complete`);
  },

  onSetRemoteSuccess(pc) {
    console.log(`${RTCService.getName(pc)} setRemoteDescription complete`);
  },

  onSetSessionDescriptionError(error) {
    console.log(`Failed to set session description: ${error.toString()}`);
  },

  gotRemoteStream(e) {
    if (remoteVideo.srcObject !== e.streams[0]) {
      remoteVideo.srcObject = e.streams[0];
      console.log("pc2 received remote stream");
    }
  },

  async onCreateAnswerSuccess(desc) {
    console.log(`Answer from pc2:\n${desc.sdp}`);
    console.log("pc2 setLocalDescription start");
    try {
      await RTCService.pc2.setLocalDescription(desc);
      RTCService.onSetLocalSuccess(RTCService.pc2);
    } catch (e) {
      RTCService.onSetSessionDescriptionError(e);
    }
    console.log("pc1 setRemoteDescription start");
    try {
      await RTCService.pc1.setRemoteDescription(desc);
      RTCService.onSetRemoteSuccess(RTCService.pc1);
    } catch (e) {
      onSetSessionDescriptionError(e);
    }
  },

  async onIceCandidate(pc, event) {
    try {
      await RTCService.getOtherPc(pc).addIceCandidate(event.candidate);
      RTCService.onAddIceCandidateSuccess(pc);
    } catch (e) {
      RTCService.onAddIceCandidateError(pc, e);
    }
    console.log(
      `${RTCService.getName(pc)} ICE candidate:\n${
        event.candidate ? event.candidate.candidate : "(null)"
      }`
    );
  },

  onAddIceCandidateSuccess(pc) {
    console.log(`${RTCService.getName(pc)} addIceCandidate success`);
  },

  onAddIceCandidateError(pc, error) {
    console.log(
      `${RTCService.getName(
        pc
      )} failed to add ICE Candidate: ${error.toString()}`
    );
  },

  onIceStateChange(pc, event) {
    if (pc) {
      console.log(
        `${RTCService.getName(pc)} ICE state: ${pc.iceConnectionState}`
      );
      console.log("ICE state change event: ", event);
    }
  },

  hangup() {
    console.log("Ending call");
    RTCService.pc1.close();
    RTCService.pc2.close();
    RTCService.pc1 = null;
    RTCService.pc2 = null;
    hangupButton.disabled = true;
    callButton.disabled = false;
  }
};

export default RTCService;
