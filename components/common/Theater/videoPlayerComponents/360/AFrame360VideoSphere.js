import React, { Fragment } from 'react'

const AFrame360VideoSphere = ({ projection, videoSelector, cursorSelector }) => {

  return (
    <Fragment>
      <a-videosphere
        id="video-screen"
        src={videoSelector}
        position="0 0 0"
        gui-interactable
        hide-cursor={"cursor: " + cursorSelector}
        stereo={
          projection === '360_LR' ? "eye: left" : (projection === '360_TB' ? "eye: left; split: vertical": null)
        }
      />

      {(projection === '360_LR' || projection === '360_TB') &&
        <a-videosphere
          id="video-screen-copy"
          src={videoSelector}
          position="0 0 0"
          stereo={
            projection === '360_LR'
              ? "eye: right"
              : "eye: right; split: vertical"
          }
        />
      }

    </Fragment>
  );
};

export default AFrame360VideoSphere;
