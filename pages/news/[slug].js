import React from "react";
import { getContent } from "../../utils/contentful";
import { Row } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import styles from "./News.module.scss";
import { AppRoute } from "../../constants/appRoutes";
import _ from 'lodash';
import { ContentUtils } from '../../utils/ContentUtils';
import BlogList from '../../components/BlogList';
import { LeftArrow } from '../../assets/images/svg';
import { useRouter } from "next/router";
import SeoTages from "../../components/common/SeoTags";

const News = (props) => {
  const contentData = props.data;
  const router = useRouter();

  const handleRedirection = () => {
    router.push(AppRoute.ABOUT_US);
  };

  if (!contentData) {
    return (<></>);
  }

  let tags = null;
  if (_.get(contentData, 'newsData')) {
    tags = _.get(contentData, 'newsData.metadata.tags');
  }
  return (
    <>
      <SeoTages title={_.get(contentData, 'newsData.title')} metaDescription={_.get(contentData, 'newsData.summary')} ogImgUrl={`https:${_.get(contentData, 'newsData.newsImage.fields.file.url')}`} />
      <section className={`container-wrapper ${styles.NewsPage}`}>
        <div className="max-container">
          <article className={styles.BlogMiddleContainer}>
            <div onClick={handleRedirection} className={styles.BackDetailBtn}>
              <LeftArrow /> BACK
          </div>
            <div>
              <h1 className="text-primary">
                {_.get(contentData, 'newsData.title')}
              </h1>
              <div className={styles.BlogSubTitle}>
                {_.get(contentData, 'newsData.postAuthor') ? (
                  <span className={"author-name"}>
                    {" "}
                    {_.get(contentData, 'newsData.postAuthor')}
                  </span>
                ) : null}
                <span>
                  {ContentUtils.formatDate(_.get(contentData, 'createdAtBlog'))}
                </span>
              </div>
              <div className={styles.BlogDescription}>
                {_.get(contentData, 'newsData.hyperlink') ?
                  <Markdown>
                    {_.get(contentData, 'newsData.hyperlink')}
                  </Markdown> : null
                }
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
            <div className={styles.RecentBlogHeader}>Recent News Entries</div>
            <Row>
              {_.get(contentData, 'news')
                .slice(0, 3)
                .map((data, index) => {
                  const {
                    title,
                    hyperlink,
                    newsImage,
                    summary,
                    slug,
                  } = data.fields;
                  const { url } = _.get(newsImage, 'fields.file');

                  return (
                    <BlogList
                      image={url}
                      title={title}
                      summary={hyperlink}
                      slug={slug}
                      history={props.history}
                      RedirectTo={AppRoute.NEWS_DETAILS}
                      key={`news-${index}`}
                    />
                  );
                })}
            </Row>
          </article>
        </div>
      </section>
    </>
  );
};

export async function getStaticPaths() {
  const news = await getContent("newsEntry", '-sys.createdAt');

  return {
    paths: news.map(newsDetail => ({
      params: {
        slug: _.get(newsDetail, 'fields.slug')
      }
    })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const news = await getContent("newsEntry", '-sys.createdAt');
  const newsData = _.find(news, (i) => { return _.get(i, 'fields.slug') === context.params.slug; });

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify({
        newsData: _.get(newsData, 'fields'),
        createdAtBlog: _.get(newsData, 'sys.createdAt'),
        news,
      }))
    }
  }
}

News.propTypes = {};

export default News;
