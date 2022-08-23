import React, { Fragment } from "react";

const AFrameCameraRig = ({cameraId, cursorId}) => {
  return (
    <Fragment>
      <a-entity id="rig">
        <a-camera
            id={cameraId}
            user-height="0"
            fov="80"
            look-controls-enabled
            wasd-controls-enabled="false"
            reverse-mouse-drag="true"
            near="0.5"
            far="10000"
            stereocam="eye: left;"
        >
          <a-gui-cursor id={cursorId}
            raycaster="objects: [gui-interactable]"
            fuse="true" fuse-timeout="2000"
            design="ring"
            visible-only-in-vr
            raycasting-only-in-vr
          />
        </a-camera>
      </a-entity>
    </Fragment>
  );
};

export default AFrameCameraRig;