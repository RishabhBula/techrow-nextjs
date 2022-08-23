import {
  connect, 
  disconnect, 
  sendAction, 
  play, 
  pause,
  onDisconnect,
  onDeviceAliasListReceived,
  onDeviceStateListReceived
} from "./headjackControlsModule";

const headjackControlsMiddleware = () => {
  let socket = null;

  const subscribeToEvents = (store) => {
    const state = store.getState();
    const { appId, authId } = state.userData.headJackCredentials;
  
    socket.on("connect", () => {
      console.log("socket connection established....socket id", socket.id); // 'G5p5...'
      if (socket.id) {
        // console.log("inside if")
        setTimeout(() => {
          socket.emit("appAuth", appId, authId);
          socket.emit("enableAppCinema", appId, authId, true);
          socket.emit("resetAppCountDown", appId, authId);
        }, 2000);
      }
    });

    //------error-log------//

    socket.on("connect_error", (error) => {
      // Notification("error","Reconnect","Reconnecting failed.");
      console.log("connect_error******// server connection failed", error);
    });

    socket.on("connect_timeout", (error) => {
      // Notification("error","Reconnect","Reconnecting timed out");
      console.log("connect_timeout******// server connection failed", error);
    });

    socket.on("disconnect", (error) => {
      // console.log("disconnect******// server connection failed== disconnected from server!",error);
      store.dispatch(onDisconnect());
      // Notification("error","Disconnect","Disconnected from server");
    });

    socket.on("reconnecting", (error) => {
      // Notification("error","Reconnect","Reconnecting to server...");
      console.log("reconnecting******// server connection failed", error);
    });

    socket.on("reconnect_failed", (error) => {
      // Notification("error","Reconnect","Reconnecting failed");
      console.log("reconnect_failed******// server connection failed", error);
    });

    socket.on("error", (error) => {
      console.log("error******//received exception from server", error);
    });

    //------error-log------//

    socket.on("exception", (error) => {
      // Notification("error","Error","Something wrong with connected to server. Please contact our support.");
      console.log("exception******//received exception from server", error);
    });
    socket.on("unauthorized", (error) => {
      console.log("unauthorized******", error);
    });

    socket.on("cinemaEnabled", (cinemaEnabled, status) => {
      // console.log("cinemaEnabled",cinemaEnabled,status);
      if (status == false) {
        socket.emit("enableAppCinema", appId, authId, true);
        socket.emit("resetAppCountDown", appId, authId);
      }
    });

    socket.on("appList", (appList) => {
      // console.log("logged")
      // console.log("appList",appList)
      // Notification("success","Success","Connected to server successfully");
    });
    socket.on("deviceAliasList", (aliasList) => {
      store.dispatch(onDeviceAliasListReceived(aliasList));
    });
    socket.on("deviceStateList", (appId, stateList) => {
      store.dispatch(onDeviceStateListReceived(stateList));
    });
  }

  return store => next => action => {
    switch(action.type) {
      case connect.toString():
        if (socket !== null) {
          socket.disconnect();
        }

        socket = io("https://cinema.headjack.io/", {
          transports: ["polling"],
          upgrade: false,
        });

        subscribeToEvents(store);
        break;

      case disconnect.toString():
        if (socket !== null) {
          socket.disconnect();
        }
        socket = null;
        break;

      case sendAction.toString():
        if (!socket) break;
        const state = store.getState();
        socket.emit(
          "sendAction",
          state.userData.headJackCredentials.appId,
          state.userData.headJackCredentials.authId,
          state.headjackControls.selectedDevices,
          action.payload,
          (action.payload === "play" || action.payload === "cancel" || action.payload === "download")
            ? [state.headjackControls.videoId] : []
        );
        break;

      case play.toString():
        if (!socket) break;
        
        const stateData = store.getState();
        const selectedDevices = stateData.headjackControls.selectedDevices;
        const deviceStateList = stateData.headjackControls.deviceStateList;
        const playDevices = [];
        const resumeDevices = [];

        for (let i = 0; i < selectedDevices.length; i++) {
          const selectedDeviceId = selectedDevices[i];
          if (deviceStateList[selectedDeviceId].status.name === "paused")
            resumeDevices.push(selectedDeviceId);
          else
            playDevices.push(selectedDeviceId);
        }

        if (resumeDevices.length > 0) {
          socket.emit(
            "sendAction",
            stateData.userData.headJackCredentials.appId,
            stateData.userData.headJackCredentials.authId,
            resumeDevices,
            "resume",
            []
          );
        }

        if (playDevices.length > 0) {
          socket.emit(
            "sendAction",
            stateData.userData.headJackCredentials.appId,
            stateData.userData.headJackCredentials.authId,
            playDevices,
            "play",
            [stateData.headjackControls.videoId]
          );
        }
        break;

      case pause.toString():
        store.dispatch(sendAction("pause"));
        break;
    }
    next(action);
  };
};

export default headjackControlsMiddleware();