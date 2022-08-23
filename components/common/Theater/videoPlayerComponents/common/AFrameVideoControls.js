import React, { Fragment } from 'react'

const AFrameVideoControls = ({videoSelector, position}) => {
  return (
    <Fragment>
      {/* clickable class is not (currently) used for styling, it's only for improving raycaster performance */}
      <a-flex-container 
        flex-direction="column" justify-content="center" align-items="center" 
        component-padding="0.1" opacity="1" width="5.2" height="1.8"
        panel-color="#1c1c1c"
        position={position ? position : "0 -2 0"}
        look-at="[camera]"
        visible-only-in-vr 
      >
        <a-flex-container id="control-buttons"
          flex-direction="row" justify-content="center" align-items="center" 
          component-padding="0" panel-color="#2b2b2b" opacity="1" width="5" height="1"
          margin="0 0 0.05 0" style={{fontFamily: "Ionicons"}}
        >
          <a-icon-button
            id="control-back"
            height="0.75"
            icon="ios-rewind"
            margin="0 0.25 0 0.25"
            exit-vr-button
          />
          <a-icon-button
            id="control-play"
            height="0.75"
            icon="play"
            margin="0 0.25 0 0.25"
            play-vr-button={"iconPlay: play; iconPause: pause; video: " + videoSelector}
          />
          <a-icon-button
            id="control-volume"
            height="0.75"
            icon="volume-medium"
            margin="0 0.25 0 0.25"
            volume-vr-button={"iconNormal: volume-medium; iconMuted: android-volume-off; video: " + videoSelector}
          />
        </a-flex-container>

        <a-slider
          width="5" height="0.5"
          top-bottom-padding="0.1"
          slider-bar-depth="0.1"
          background-color="#2b2b2b"
          border-color="#1c1c1c"
          active-color="#52fc03"
          handle-outer-radius="0"
          handle-inner-radius="0"
          percent="0"
          margin="0.05 0 0 0"
          vr-progress-bar={"video: " + videoSelector}
        />
      </a-flex-container>
    </Fragment>
  );
};

export default AFrameVideoControls;