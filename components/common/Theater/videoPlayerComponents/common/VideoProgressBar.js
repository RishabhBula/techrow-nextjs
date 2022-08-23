import React, { useRef } from 'react';
import clamp from 'lodash/clamp';

const VideoProgressBar = ({ progress, onProgressChange }) => {

    var bgRef = useRef(null);

    const handleClick = (e) => {
        const seekedPosition = e.nativeEvent.offsetX / bgRef.current.offsetWidth;
        const percent = clamp(seekedPosition, 0, 1);
        onProgressChange(percent);
    };

    return (
        <div 
            id="html-progress-outer"
            ref={bgRef}
            className="progress"
            onClick={handleClick}
        >
            <div 
                id="html-progress-inner" 
                className="progress-bar"
                style={{width: `${progress * 100}%`}}
                role="progressbar" 
                aria-valuenow={progress} 
                aria-valuemin="0.0" 
                aria-valuemax="1.0"
            ></div>
        </div>
    );
}

export default VideoProgressBar;