import React, { Fragment } from 'react'

const AFrameTheaterScene = ({ videoSelector, cursorSelector }) => {

  return (
    <Fragment>
      <a-assets>
        <a-asset-item id="object" src="/aframe-assets/theater/Theater.obj"></a-asset-item>
        <a-asset-item id="material" src="/aframe-assets/theater/Theater.mtl"></a-asset-item>
      </a-assets>

      <a-entity position="0 -1.03 -4.7">
        <a-obj-model src="#object" mtl="#material" />
        <a-video 
          id="video-screen" 
          src={videoSelector}
          gui-interactable
          hide-cursor={"cursor: " + cursorSelector}
          position="-0.210 2.117 -6.550"
          scale="16 9 0"
        />
        <a-entity 
          id="ambient-light" 
          light="color: #efebd8; intensity: 0.7; type: ambient;" 
          theater-lights={"video: " + videoSelector}
        />
      </a-entity>
    </Fragment>
  );
};

export default AFrameTheaterScene;