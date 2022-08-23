import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "../styles/Home.module.scss";
import ColumnGrid from "../components/common/ColumnGrid";
import { handleScrollToElement } from "../utils/helpers";
import _ from "lodash";
import ContentUtils from '../utils/ContentUtils';
import { useRouter } from "next/router";
import HeroPanel from "../components/common/HeroPanel";
import SizzleReel from "../components/common/SizzleReel";
import SeoTages from "../components/common/SeoTags";
import ContactUs from "../components/common/contactUs";
import Head from "next/head";

const Home = (props) => {
  const contentData = props.data;
  const router = useRouter();

  useEffect(() => {
    if (router && contentData && typeof window !== 'undefined') {
      if (router.query.hasOwnProperty('contact-us') && contentData) {
        handleScrollToElement("contact-us-form", null)
      }
    }
  }, [router, contentData]);

  if (!contentData) {
    return (<></>);
  }

  return (
    <>
      <SeoTages title={'Home'} metaDescription={_.get(contentData, 'heroPanel.heroHeadline')} ogImgUrl={`https:${_.get(contentData, 'heroPanel.heroImage.fields.file.url')}`} />
      <section className={`container-wrapper ${styles.Homepage}`}>
        <div className="max-container">
          <HeroPanel heroPanelContent={_.get(contentData, 'heroPanel')} page={'home'} />
          <SizzleReel sizzleReel={_.get(contentData, 'sizzleReel')} />
          <ColumnGrid
            contentData={_.get(contentData, 'valueBlockItem')}
            history={props.history}
          />
          <article>
            <div className={styles.AnywhereSection}>
              <Row className="align-items-center justify-content-center">
                <Col xs={12} sm={5} className="text-center">
                  <h5 className={styles.ImmersiveText}>
                    {_.get(contentData, 'immersivePromoPanel.toutText')}
                  </h5>
                  <img
                    src={`https:${_.get(contentData, 'immersivePromoPanel.textImage.fields.file.url')}`}
                    alt=""
                    className={styles.AnywhereImg}
                  />
                </Col>
                <Col xs={12} sm={7}>
                  {_.get(contentData, 'immersivePromoPanel.toutImage.fields.file.url') && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https:${_.get(contentData, 'immersivePromoPanel.toutImage.fields.file.url')}`}
                      alt=""
                      className={styles.HdboyImage}
                    />
                  )}
                </Col>
              </Row>
            </div>
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

export async function getStaticProps() {
  const contentData = await ContentUtils.getContentByPage("homepage");

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify(contentData))
    }
  }
}

export default Home;
