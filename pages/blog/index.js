import BlogList from "../../components/BlogList";
import { AppRoute } from "../../constants/appRoutes";
import React from "react";
import { Col, Row } from "react-bootstrap";
import * as _ from "lodash";
import styles from "./Blog.module.scss";
import { getContent } from '../../utils/contentful';
import ContentUtils from '../../utils/ContentUtils';
import Head from "next/head";
import SeoTages from "../../components/common/SeoTags";

const Blog = (props) => {
  const contentData = props.data;
  // console.log("<<<<<<<<<contentData", contentData);

  // const getImage = (data) => {
  //   const {
  //     image,
  //     postImage,
  //     postThumbnail,
  //   } = data.fields;
  //   return !_.isNil(postImage) ? postImage : (!_.isNil(image)  ?  image : postThumbnail);
  // };

  if (!contentData) {
    return (<></>);
  }
  // debugger;
  const blogs = _.filter(_.get(contentData, 'blogsData'), (itm) => _.get(itm, 'sys.contentType.sys.id') === 'blogPost');
  return (
    <>
      <SeoTages title={'Blog'} metaDescription={'TechRow Blog Content Educators: Why Immersive Media?'} ogImgUrl={'/logo.png'} />
      <section className={`container-wrapper ${styles.BlogListPage}`}>
        <div className="max-container">
          <div className={styles.BlogListHeader}>
            <Row>
              <Col xs={12} lg={5} className={styles.BlogHeadText}>
                <h1 className="text-secondary">TechRow Blog</h1>
              </Col>
            </Row>
          </div>
          <div className={styles.BlogLists}>
            {blogs.map((data, index) => {
              const {
                title,
                slug,
              } = data.fields;
              const image = ContentUtils.getImage(data);
              const thumbnail = ContentUtils.getThumbnail(data);
              if (!image) {
                return;
              }
              const url = _.get(image, 'fields.file.url');
              // debugger;
              return (
                <BlogList
                  key={`${index}-blog`}
                  title={title}
                  slug={slug}
                  image={`https:${url}`}
                  history={props.history}
                  RedirectTo={AppRoute.BLOG_DETAILS}
                  thumbnail={thumbnail}
                  summary={ContentUtils.getSummaryForPost(data)}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const blogsData = await getContent();

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify({
        blogsData: _.flatten(blogsData),
      }))
    }
  }
}

Blog.propTypes = {};

export default Blog;
