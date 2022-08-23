import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "headjackControls",
  initialState: {
    videoId: null,

    individualData: [],
    selectedDevices: [],
    deviceAliasList: {},
    deviceStateList: {}
  },

  reducers: {
    connect: (state, action) => {
      state.videoId = action.payload.videoId;
    },

    disconnect: (state) => {},
    sendAction: (state) => {},
    play: (state) => {},
    pause: (state) => {},

    onDisconnect: (state) => {
      state.individualData = [];
      state.selectedDevices = [];
    },

    onDeviceAliasListReceived: (state, action) => {
      state.deviceAliasList = action.payload;
    },

    onDeviceStateListReceived: (state, action) => {
      const deviceStateList = action.payload;
      state.deviceStateList = deviceStateList;
      
      let individualData = [];
      let deviceIds = [];
      Object.keys(deviceStateList).forEach((id) => {
        individualData.push({
          id: id,
          status: Object(deviceStateList)[id].status,
          persistentData: Object(deviceStateList)[id].persistentData,
        });
        deviceIds.push(id);
      });

      if (state.deviceAliasList) {
        Object.keys(state.deviceAliasList).forEach((data) => {
          individualData.forEach((item, key) => {
            if (item.id == data) {
              individualData[key].name = Object(state.deviceAliasList)[data];
            }
          });
        });
      }
      state.individualData = individualData;
  
      if (state.selectedDevices.length > 0) {
        state.selectedDevices = state.selectedDevices.filter((id) =>
          deviceIds.includes(id)
        );
      }
    },

    onSelectedDevicesChange: (state, action) => {
      state.selectedDevices = action.payload;
    }
  },
});

export const {
  connect,
  disconnect,
  sendAction,
  play,
  pause,
  onDisconnect,
  onSelectedDevicesChange,
  onDeviceAliasListReceived,
  onDeviceStateListReceived
} = slice.actions;

export default slice.reducer;