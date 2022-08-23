import React from "react";
import styles from "./BlogDetail.module.scss";
import * as _ from "lodash";
import { Col, Row } from "react-bootstrap";
import { AppRoute } from "../../../constants/appRoutes";
import { LeftArrow } from "../../../assets/images/svg";
import { ContentUtils } from '../../../utils/ContentUtils';
import { getContent } from '../../../utils/contentful';
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import SeoTages from "../../../components/common/SeoTags";

const getBlogBody = (blogData) => {
  const fullPost = _.get(blogData, 'fields.fullPost.content');
  let blogBody = null;
  if (!_.isNil(fullPost)) {
    const contentNodes = _.flatMap(fullPost, 'content');
    blogBody = _.flatMap(contentNodes, (i) => {
      if (_.get(i, 'nodeType') === 'hyperlink') {
        const link = _.get(i, 'content[0].value');
        return (<Link href={link}>{link}</Link>);
      }
      return (<p>{_.get(i, 'value')}</p>);
    });


  } else {
    blogBody = (<p>{_.get(blogData, 'fields.summary')}</p>);
  }

  // console.log('blog body ', blogBody);
  return blogBody;

}

const BlogDetail = (props) => {
  const contentData = {
    blogData: _.get(props.data.blogData, 'fields'),
    blogBody: getBlogBody(props.data.blogData),
    createdAtBlog: _.get(props.data.blogData, 'fields.postPublishDate'),
    blogs: props.data.blogs,
  };
  const router = useRouter();

  if (!contentData) {
    return (<></>);
  }

  let file = null,
    tags = null;

  const thumbnail = _.get(contentData, 'blogData.postThumbnail');
  const fields = _.get(thumbnail, 'fields');
  const metadata = _.get(contentData, 'blogData.postThumbnail.fields');
  // const { fields, metadata } = postImage;
  file = _.get(fields, 'file');
  tags = _.get(metadata, 'tags');

  const handleBlogDetail = (slug) => {
    const blogDetailUrl = AppRoute.BLOG_DETAILS.replace(":slug", slug);
    router.push(blogDetailUrl);
    window.scrollTo(0, 0);
  };
  const handleRedirection = () => {
    router.push(AppRoute.BLOG);
  };

  function getRecentBlogPosts() {
    if (!_.get(contentData, 'blogs')) {
      return null;
    }
    return contentData.blogs
      .sort((a, b) => {
        return _.get(b, 'fields.postPublishDate') - _.get(a, 'fields.postPublishDate');
      })
      .slice(0, 3)
      .map((data, index) => {
        const {
          title,
          slug,
          postThumbnail,
        } = data.fields;

        const image = ContentUtils.getImage(data);
        const url = _.get(image, 'fields.file.url');
        const blogDate = _.get(data, 'fields.postPublishDate');
        const thumbanail = _.get(postThumbnail, 'fields.file.url');
        const summary = ContentUtils.getSummaryForPost(data);
        const body = ContentUtils.getSummaryForPost(data);
        return (
          <Col key={`blogs-${index}`} xs={12} sm={6} lg={4}>
            <div
              onClick={() => handleBlogDetail(slug)}
              className={styles.BlogDetailBox}
            >
              {thumbanail ? (
                <img src={thumbanail} alt="" />
              ) : (
                  <div
                    className={`${styles.BlogImg} background-container`}
                    style={{ backgroundImage: `url(https:${url})` }}
                  ></div>
                )}

              <div className={styles.RecentBlogDetail}>
                <h5 className={styles.BlogTitle}>{title}</h5>
                <h6 className="blog-time">{ContentUtils.formatDate(blogDate)}</h6>
                <hr className={styles.Divider} />
                <h5 className={styles.BlogDesc}>{getBlogBody(data)}</h5>
              </div>
            </div>
          </Col>
        );
      });
  }
  return (
    <>
      <SeoTages title={contentData ? _.get(contentData, 'blogData.title') : "Blog Title"} metaDescription={contentData ? _.get(contentData, 'blogData.summary') : "Blog Data"} ogImgUrl={file ? `https:${file.url}` : null} />
      <section className={`container-wrapper ${styles.BlogDetailPage}`}>
        <div className="max-container">
          <article className={`first-container ${styles.FirstContainer}`}>
            <div className={styles.ImageWrapper}>
              <img src={file ? `https:${file.url}` : null} alt="" />
            </div>
          </article>
          <article className={styles.BlogMiddleContainer}>
            <div onClick={handleRedirection} className={styles.BackDetailBtn}>
              <LeftArrow /> BACK TO BLOG
          </div>
            <div>
              <h1 className="text-primary">
                {_.get(contentData, 'blogData.title')}
              </h1>
              <div className={styles.BlogSubTitle}>
                {_.get(contentData, 'blogData.postAuthor') ? (
                  <span className={styles.AuthorName}>
                    {" "}
                    {_.get(contentData, 'blogData.postAuthor')}
                  </span>
                ) : null}
                <span>
                  {ContentUtils.formatDate(_.get(contentData, 'createdAtBlog'))}
                </span>
              </div>
              <div className={styles.BlogDescription}>
                {_.get(contentData, 'blogBody')}
              </div>
              <div className={styles.TagList}>
                {_.get(tags, 'length') ? `Tags:` : null}
                {_.get(tags, 'length')
                  ? tags.map((tag, i) => {
                    return (
                      <div key={`tag-${i}`} className={styles.Tags}>
                        {tag}
                      </div>
                    );
                  })
                  : null}
              </div>
            </div>
          </article>
          <article className={styles.RecentBlogWrapper}>
            <div className={styles.RecentBlogHeader}>Recent Blog Posts</div>
            <Row>
              {getRecentBlogPosts()}
            </Row>
          </article>
        </div>
      </section>
    </>
  );
};

export async function getStaticPaths() {
  const blogs = await getContent();

  return {
    paths: blogs.filter(blog => _.get(blog, 'fields.slug')).map(blog => ({
      params: {
        slug: _.get(blog, 'fields.slug')
      }
    })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const blogs = await getContent();
  const blogData = _.find(blogs, (x) => { return _.get(x, 'fields.slug') === context.params.slug });
  // debugger;
  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify({
        blogData,
        blogs
      }))
    }
  }
}

BlogDetail.propTypes = {};

export default BlogDetail;
