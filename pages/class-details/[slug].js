import React from "react";
import styles from "./ClassDetails.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import ContactUs from "../../components/common/contactUs";
import { Idea, Calander } from "../../assets/images/svg";
import Share from "../../assets/images/share.svg";
import VideoContainer from "../../components/common/VideoContainer";
import { handleScrollToElement } from "../../utils/helpers";
import { RWebShare } from "react-web-share";
import { getContent } from '../../utils/contentful';
import _ from 'lodash';
import { useRouter } from "next/router";
import Head from "next/head";
import SeoTages from "../../components/common/SeoTags";

const ClassDetails = (props) => {
  const contentData = props.data;
  const router = useRouter();

  if (!contentData) {
    return (<></>);
  }
  // debugger;
  const classDetail = _.get(contentData, 'classDetail');
  const playlist = _.get(contentData, 'playList');
  return (
    <>
      <SeoTages title={_.get(classDetail, 'className')} metaDescription={_.get(classDetail, 'classDescription')} ogImgUrl={_.get(classDetail, 'classTrailer.fields.file.url')} />
      <section className={`container-wrapper ${styles.ClassDetailPage}`}>
        <div className="max-container">
          <article className={`first-container ${styles.FirstContainer}`}>
            <Row className={`${styles.ClassFirstSection} content-section ${styles.ContentSection}`}>
              <Col xs={12} xl={6} className={`left-container ${styles.LeftContainer}`}>
                <div>
                  <h1 className="text-secondary">
                    {_.get(classDetail, 'className')}
                  </h1>
                  <h5>
                    {" "}
                    {_.get(classDetail, 'classInstructor')}
                  </h5>
                  <RWebShare
                    data={{
                      text: _.get(classDetail, 'classDescription'),
                      url: typeof window !== 'undefined' ? window.location.href : `${process.env.NEXT_BASE_URL}${router.pathname}`,
                      title: _.get(classDetail, 'className'),
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <div className={styles.ClassDetailLabel}>
                      <img src={Share.src} alt="" /> SHARE
                    </div>
                  </RWebShare>
                  <h5 className={styles.NavigationSubtitle}>
                    {_.get(classDetail, 'classDescription')}
                  </h5>
                  <div className={styles.ClassDetailWrapper}>
                    <div className={styles.ClassDetailLabel}>
                      <span>
                        <Idea />
                      </span>{" "}
                      TOPIC:
                    </div>
                    <div className={styles.ClassDetailValue}>
                      {_.get(classDetail, 'classTopic')}
                    </div>
                  </div>
                  <div className={styles.ClassDetailWrapper}>
                    <div className={styles.ClassDetailLabel}>
                      <span>
                        <Calander />
                      </span>{" "}
                      Length:
                    </div>
                    <div className={styles.ClassDetailValue}>
                      {_.get(classDetail, 'classTotalDuration')}
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} xl={6} className={`right-container ${styles.RightContainer}`}>
                <div>
                  <VideoContainer
                    videoUrl={_.get(classDetail, 'classTrailer.fields.file.url')}
                    bannerClassName={`video-container ${styles.VideoContainer}`}
                  />
                  <p className={styles.WatchTrailer}>Watch Trailer</p>
                  <div className="text-center">
                    <Button
                      onClick={() => handleScrollToElement("contact-us-form", null)}
                      className="text-uppercase btn-secondary"
                    >
                      CONTACT US
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </article>
          <article className={styles.ClassMiddleContainer}>
            <Row className={`content-section ${styles.ContentSection}`}>
              <Col xs={12} lg={5}>
                <div className={styles.SessionInstructor}>
                  <h3 className="text-secondary">Meet the Instructor</h3>
                  <p className="sub-title">
                    {_.get(classDetail, 'instructorBio.content[0].content[0].value')}
                  </p>
                </div>
              </Col>
              <Col xs={12} lg={7} className={styles.SessionDetail}>
                <div className={styles.SessionPlaylist}>
                  <h1 className="text-secondary text-center">Session Playlist</h1>
                  <h4 className={styles.SessionSubTitle}>
                    {_.get(playlist, 'length') ? _.get(playlist, 'length') : 0}{" "}
                    video lessons (
                    {_.get(classDetail, 'classTotalDuration')}
                    )
                  </h4>
                  <div className={styles.SessionList}>
                    <ol type="1">
                      {playlist
                        .map((data, index) => {
                          const { duration, text } = data.fields;
                          return (
                            <div key={`playlist-${index}`}>
                              <li>
                                <div className={styles.SessionData}>
                                  <span>{text}</span>
                                  <span className={styles.Time}>{duration}</span>
                                </div>
                              </li>
                            </div>
                          );
                        })}
                    </ol>
                  </div>
                </div>
              </Col>
            </Row>
          </article>
          <article>
            <ContactUs
              contactContent={_.get(contentData, 'connectPanel')}
            ></ContactUs>
          </article>
        </div>
      </section>
    </>
  );
};

export async function getStaticPaths() {
  const classes = await getContent("classDetail");

  return {
    paths: classes.map(itm => ({
      params: {
        slug: itm.fields.id
      }
    })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const classes = await getContent("classDetail", null, {
    id: slug
  });
  const classDetail = _.find(classes, (itm) => { return itm.fields.id === slug });
  const fields = {
    webpage: "homepage"
  };
  const connectPanelData = await getContent("connectPanel", null, fields);
  const playlistFields = {
    id: slug
  };
  const playList = await getContent("playlistItem", null, playlistFields);
  const filteredPlayList = _.sortBy(_.filter(playList, (itm) => { return _.get(itm, 'fields.id') === slug; }), 'fields.order');
  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify({
        classDetail: _.get(classDetail, 'fields'),
        connectPanel: _.get(connectPanelData, '[0].fields'),
        playList: filteredPlayList,
      }))
    }
  }
}

ClassDetails.propTypes = {};

export default ClassDetails;
