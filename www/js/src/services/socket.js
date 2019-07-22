import m from "mithril";
import Auth from "./auth";

const SocketService = {
  conn: null,
  connect() {
    const conn = new WebSocket(
      `${process.env.SOCKET_URL}/?jwt=${Auth.user.token}`
    );
    conn.onopen = (c, ev) => {
      SocketService.conn = conn;
    };
    conn.onmessage = e => {
      console.log("Message recieved: ", e.data);
      const data = JSON.parse(e.data);
      // Create a new event
      console.log(data.type, " event");
      var event = new CustomEvent(data.type, { detail: data });
      // Dispatch the event
      document.dispatchEvent(event);
    };
    conn.onclose = e => {
      console.log("Connection closed", e);
    };
  },
  message: data => {
    data.channel = "message";
    data.owner = Auth.user.email;
    SocketService.conn.send(JSON.stringify(data));
  }
};

export default SocketService;
