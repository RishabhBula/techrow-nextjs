import React from "react";
import styles from "./ContentCreators.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import ContactUs from "../../components/common/contactUs";
import Partner from "../../components/Partner";
import { CheckCircle } from "../../assets/images/svg";
import { handleScrollToElement } from "../../utils/helpers";
import SeoTages from "../../components/common/SeoTags";
import ContentUtils from '../../utils/ContentUtils';
import _ from 'lodash';
import Head from "next/head";

const ContentCreators = (props) => {
  const contentData = props.data;

  let heroPanelTexts = null;
  if (contentData) {
    heroPanelTexts = _.split(_.get(contentData, 'heroPanel.heroTout'), "·");
  }
  // debugger;
  if (!contentData) {
    return (<></>);
  }

  return (
    <>
      <SeoTages title={"Content Creators"} metaDescription={_.get(contentData, 'heroPanel.heroHeadline')} ogImgUrl={`https:${_.get(contentData, 'heroPanel.heroImage.fields.file.url')}`} />
      <section className={`container-wrapper ${styles.ContentCreatorPage}`}>
        <div className="max-container">
          <article className={`first-container ${styles.FirstContainer}`}>
            <Row className={`content-section ${styles.Row}`}>
              <Col xs={12} md={6} className={`left-container ${styles.LeftContainer}`}>
                <div>
                  <h1 className="text-secondary">
                    {_.get(contentData, 'heroPanel.heroHeadline')}
                  </h1>
                  <ul className="custom-list checked-data">
                    {heroPanelTexts && heroPanelTexts.length
                      ? heroPanelTexts.map((data, index) => {
                        return data !== "" ? (
                          <li key={`text-${index}`}>
                            <CheckCircle />
                            <h5 dangerouslySetInnerHTML={{ __html: data }} />
                          </li>
                        ) : null;
                      })
                      : null}
                  </ul>
                  <Button
                    className="text-uppercase mt-3 btn-secondary"
                    onClick={() => handleScrollToElement("contact-us-form", null)}
                  >
                    {_.get(contentData, 'heroPanel.heroCtaLabel')}
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={6} className="right-container">
                <img
                  src={`https:${_.get(contentData, 'heroPanel.heroImage.fields.file.url')}`} alt=""
                />
              </Col>
            </Row>
          </article>
          <article className="">
            <Partner
              title={_.get(contentData, 'contentPartnersPanel.title')}
              contentData={_.get(contentData, 'contentPartnersLogo')}
            />
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
  const contentData = await ContentUtils.getContentByPage("contentCreators");

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify(contentData))
    }
  }
}

ContentCreators.propTypes = {};

export default ContentCreators;
