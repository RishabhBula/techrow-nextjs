import React from "react";
import { getContent } from "../../utils/contentful";
import { Row } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import styles from "./PressRelease.module.scss";
import { AppRoute } from "../../constants/appRoutes";
import BlogList from '../../components/BlogList';
import _ from 'lodash';
import { ContentUtils } from '../../utils/ContentUtils';
import { LeftArrow } from '../../assets/images/svg';
import { useRouter } from "next/router";
import SeoTages from "../../components/common/SeoTags";

const PressRelease = (props) => {
  const contentData = props.data;
  const router = useRouter();

  const handleRedirection = () => {
    router.push(AppRoute.ABOUT_US);
  };

  let tags = null;

  const prData = _.get(contentData, 'pressReleaseData');
  if (!prData) {
    return (<></>);
  }

  tags = _.get(contentData, 'pressReleaseData.metadata.tags');
  return (
    <>
    <SeoTages title={_.get(prData, 'title')} metaDescription={_.get(prData, 'summary')} ogImgUrl={`https:${_.get(contentData, 'pressReleaseData.image.fields.file.url')}`} />
      <section className={`container-wrapper ${styles.PressReleasePage}`}>
        <div className="max-container">
          <article className={styles.BlogMiddleContainer}>
            <div onClick={handleRedirection} className={styles.BackDetailBtn}>
              <LeftArrow /> BACK
          </div>
            <div>
              <h1 className="text-primary">
                {_.get(prData, 'title')}
              </h1>
              <div className={styles.BlogSubTitle}>
                {_.get(prData, 'postAuthor') ? (
                  <span className={styles.AuthorName}>
                    {" "}
                    {_.get(prData, 'postAuthor')}
                  </span>
                ) : null}
                <span>
                  {ContentUtils.formatDate(_.get(contentData, 'createdAtBlog'))}
                </span>
              </div>
              <div className={styles.BlogDescription}>
                {_.get(prData, 'summary') ?
                  <Markdown>
                    {_.get(prData, 'summary')}
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
            <div className={styles.RecentBlogHeader}>Recent Press Releases</div>
            <Row>
              {_.get(contentData, 'pressRelease')
                .slice(0, 3)
                .map((data, index) => {
                  const {
                    title,
                    summary,
                    image,
                    hyperlink,
                    slug,
                  } = data.fields;
                  const { url } = _.get(image, 'fields.file');
                  return (
                    <BlogList
                      image={url}
                      title={title}
                      summary={hyperlink}
                      slug={slug}
                      history={props.history}
                      RedirectTo={AppRoute.PRESS_RELEASE_DETAILS}
                      key={`releases-${index}`}
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
  const pressRelease = await getContent('pressRelease', '-sys.createdAt', null);

  return {
    paths: pressRelease.map(itm => ({
      params: {
        slug: _.get(itm, 'fields.slug')
      }
    })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const pressRelease = await getContent('pressRelease', '-sys.createdAt', null);
  const pressReleaseData = _.find(pressRelease, (i) => { return _.get(i, 'fields.slug') === slug; });

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify({
        pressReleaseData: _.get(pressReleaseData, 'fields'),
        createdAtBlog: _.get(pressReleaseData, 'fields.sys.createdAt'),
        pressRelease: pressRelease,
      }))
    }
  }
}

PressRelease.propTypes = {};

export default PressRelease;
