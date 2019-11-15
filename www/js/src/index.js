/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import m from "mithril";

import "font-awesome/css/font-awesome.css";

// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// onsenui
import "onsenui";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

import "../../css/index.css";

import Auth from "services/auth";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import TimeLine from "./components/timeline";
import Videos from "./components/videos";
import Messages from "./components/messages";
import CreatePost from "./components/createpost";
import SocketService from "./services/socket";
import Sean from "./components/sean";
import PostView from "./testcomponents/postview";

var app = {
  // Application Constructor
  initialize() {
    console.log("Initializing the application");
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady() {
    this.receivedEvent("deviceready");
    var root = document.getElementById("app-container");
    // Just for iOS devices.
    if (window.device.platform === "iOS") {
      cordova.plugins.iosrtc.registerGlobals();

      // load adapter.js
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "js/adapter-latest.js";
      script.async = false;
      document.getElementsByTagName("head")[0].appendChild(script);
    }

    Auth.getUserFromStorage().then(user => {
      SocketService.connect();
    });

    m.route(root, "/", {
      "/": {
        onmatch: () =>
          new Promise(resolve => {
            resolve(Home);
          })
      },
      "/login": {
        onmatch: () =>
          new Promise((resolve, reject) => {
            if (Auth.user.token) {
              // user is logged in, navigate to profile page.
              // for now go to the videos page
              m.route.set("/profile");
              return reject();
            }
            resolve(Login);
          })
      },
      "/register": {
        onmatch: () =>
          new Promise((resolve, reject) => {
            if (Auth.user.token) {
              // user is logged in, navigate to profile page.
              // for now go to the videos page
              m.route.set("/profile");
              return reject();
            }
            resolve(Register);
          })
      },
      "/profile": {
        onmatch: () =>
          new Promise(resolve => {
            console.log("will check for login here...");
            resolve(Profile);
          })
      },
      "/timeline": {
        onmatch: () =>
          new Promise(resolve => {
            console.log("will check for login here...");
            resolve(TimeLine);
          })
      },
      "/post": {
        onmatch: () =>
          new Promise(resolve => {
            console.log("will check for login here...");
            resolve(CreatePost);
          })
      },
      "/videos": {
        onmatch: () =>
          new Promise(resolve => {
            console.log("will check for login here...");
            resolve(Videos);
          })
      },
      "/messages": {
        onmatch: () =>
          new Promise(resolve => {
            console.log("will check for login here...");
            resolve(Messages);
          })
      },
      "/sean": {
        onmatch: () =>
          new Promise(resolve => {
            console.log("will check for login here...");
            resolve(Sean);
          })
      },
      "/sean/:postid": {
        onmatch: () =>
          new Promise(resolve => {
            console.log("will check for login here...");
            resolve(PostView);
          })
      }
    });
  },

  // Update DOM on a Received Event
  receivedEvent(id) {
    console.log(`Device is ready: ${id}`);
  }
};

app.initialize();
