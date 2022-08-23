import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "hooks/use-auth";
import { Container, Row, Col } from "react-bootstrap";
import AFrameVideoPlayer from "./AFrameVideoPlayer";
import { useRouter } from "next/router";

import GoogleClassRoomShareButton from "../ClassRoom/googleClassroomShareBtn";
import HeadjackControls from "./HeadjackControls";
import { connect, disconnect } from "redux/actions/HeadjackControls";

// used to truncate video description to enable sharing videos with long description to Google Classroom
const maxChars = 900;

const TheaterComponent = ({ videoId }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const finishedLoading = useSelector((state) => !state.MyLibReducer.isLoading);
  const videoData = useSelector(
    (state) => state.MyLibReducer.data.flatMap((category) => category.videos).find((video) => video.id === videoId)
  );

  // Set initial value of vrTheaterMode to false, will display theater mode when vrTheaterMode is true
  const [vrTheaterMode, setVrTheaterMode] = useState(false);

  useEffect(() => {
    // Called when component is mounted
    if (videoData && user) {
      dispatch(connect({
        videoId: videoData.id,
        headjackAppId: user.headJackCredentials.appId,
        headjackAuthId: user.headJackCredentials.authId
      }));
    }

    if (!videoData && finishedLoading) {
      router.push('/portal/my-library')
    }

    return () => {
      // Called before component is unmounted
      dispatch(disconnect());
    };
  }, [finishedLoading, videoData, user]);

  const theaterButtonText = vrTheaterMode
    ? "Flatscreen Mode"
    : "VR Theater Mode";
    
  return (
    <div className='dashboard animated fadeIn theaterMode'>
      {finishedLoading && videoData && 
      <div className='theaterModeData'>
        <AFrameVideoPlayer videoData={videoData} vrTheaterMode={vrTheaterMode} key={vrTheaterMode} />
        <Container fluid>
          <Row className="justify-content-sm-center">
            {finishedLoading && user && user.userType == "educator" && (
              <Col xs={12} sm="auto" className="d-inline-flex justify-content-center align-items-center mt-3 mt-sm-2">
                <GoogleClassRoomShareButton
                  shareData={{
                    title: videoData.title,
                    body: videoData.description.length > maxChars ? videoData.description.slice(0, maxChars - 3) + '...' : videoData.description,
                    url: window.location.href,
                    size: 48,
                  }}
                />
                <div className='p-1 text-center font-weight-bold'>
                  Share to Google Classroom
                </div>
              </Col>
            )}
            {
              videoData.projection === "NONE" && (
                <Col xs={12} sm="auto" className="d-inline-flex justify-content-center align-items-center mt-3 mt-sm-2">
                  <button
                    type='button'
                    className='green-btn'
                    onClick={() => setVrTheaterMode(!vrTheaterMode)}>
                    {theaterButtonText}
                  </button>
                </Col>
              )
            }
          </Row>
        </Container>

        <h1>{videoData.title}</h1>
        <div className='discription'>
          <p>{videoData.description}</p>
        </div>

        {user && user.userType === "educator" ? <HeadjackControls /> : null}
      </div>
      }
    </div>
  );
};

export default TheaterComponent;
