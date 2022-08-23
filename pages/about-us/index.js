import React from "react";
import styles from "./AboutUs.module.scss";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import BlogList from "../../components/BlogList";
import * as _ from "lodash";
import {
  getContent
} from "../../utils/contentful";
import { AppRoute } from "../../constants/appRoutes";
import Head from "next/head";
import SeoTages from "../../components/common/SeoTags";

const AboutUs = (props) => {
  const contentData = props.data;

  const aboutUsIntro = _.get(contentData, 'aboutUs.aboutIntro.content');
  const aboutMainText = _.get(contentData, 'aboutUs.aboutMainText.content');

  if (!contentData) {
    return (<></>);
  }
  const metaDescription = aboutUsIntro.map((data, index) => {
    return (
      _.get(data, 'content[0].value')
    )
  })
  return (
    <>
      <SeoTages title={'About Techrow'} metaDescription={metaDescription[0]} ogImgUrl={`/logo.png`} />
      <section className={`container-wrapper ${styles.AboutusPage}`}>
        <div className={`max-container ${styles.MaxContainer}`}>
          <article className={styles.AboutDetail}>
            <h1 className="text-secondary">
              {_.get(contentData, 'aboutUs?.aboutTitle')}
            </h1>
            <div className="content-section">
              {aboutUsIntro.map((data, index) => {
                return (
                  <h3 key={`aboutIntro-${index}`}>
                    {_.get(data, 'content[0].value')}
                  </h3>
                );
              })}
              {aboutMainText.map((data, index) => {
                return (
                  <h5 key={`aboutMainText-${index}`}>
                    {_.get(data, 'content[0].value')}
                  </h5>
                );
              })}
            </div>
          </article>
          <article className={styles.NewsroomSection}>
            <Row>
              <Col xs={12} md={12}>
                <h2 className={styles.TabHeading}>The Newsroom</h2>
                <Tabs defaultActiveKey="news" className={styles.NewsroomTabs}>
                  <Tab eventKey="news" title="News">
                    <div className={styles.AboutTabs}>
                      {contentData.newsData
                        .slice(0, 4)
                        .map((data, index) => {
                          const {
                            title,
                            newsImage,
                            slug,
                            hyperlink,
                            summary
                          } = data.fields;
                          // debugger;
                          const url = _.get(newsImage, 'fields.file.url');
                          return (
                            <BlogList
                              image={url}
                              title={title}
                              summary={summary}
                              slug={slug}
                              history={props.history}
                              RedirectTo={AppRoute.NEWS_DETAILS}
                              key={`news-${index}`}
                            />
                          );
                        })}
                    </div>
                  </Tab>
                  <Tab eventKey="press" title="Press releases">
                    <div className="about-tabs">
                      {contentData.pressRelease
                        .slice(0, 4)
                        .map((data, index) => {
                          const { title, image, slug, summary } = data.fields;
                          const fields = _.get(image, 'fields');
                          const url = _.get(fields, 'file.url');
                          return (
                            <BlogList
                              image={url}
                              title={title}
                              slug={slug}
                              history={props.history}
                              key={`press-${index}`}
                              summary={summary}
                              RedirectTo={AppRoute.PRESS_RELEASE_DETAILS}
                            />
                          );
                        })}
                    </div>
                  </Tab>
                  <Tab eventKey="blog" title="Blog">
                    <div className="about-tabs">
                      {contentData.blogs
                        .slice(0, 4)
                        .map((data, index) => {
                          const {
                            title,
                            postImage,
                            slug,
                            postThumbnail,
                            summary
                          } = data.fields;
                          const fields = _.get(postImage, 'fields');
                          const url = _.get(fields, 'file.url');
                          const thumbnail = _.get(postThumbnail, 'fields.file.url');
                          return (
                            <BlogList
                              image={url}
                              title={title}
                              slug={slug}
                              history={props.history}
                              thumbnail={thumbnail}
                              RedirectTo={AppRoute.BLOG_DETAILS}
                              summary={summary}
                              key={`blog-${index}`}
                            />
                          );
                        })}
                    </div>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </article>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const aboutUsData = await getContent("aboutUs", null, null);
  const aboutUsTeamMember = await getContent("aboutUsTeamMember", null, null);
  const newsData = await getContent("newsEntry", "-sys.updatedAt", null);
  const pressRelease = await getContent("pressRelease", "-sys.updatedAt", null);
  const blogs = await getContent("blogPost", "-sys.updatedAt", null);

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify({
        aboutUs: _.get(aboutUsData, '[0].fields'),
        aboutUsTeamMember,
        newsData,
        pressRelease,
        blogs
      }))
    }
  }
}

AboutUs.propTypes = {};

export default AboutUs;
