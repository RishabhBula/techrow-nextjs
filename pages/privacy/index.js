import React, { Fragment } from "react";
import {getContent} from "../../utils/contentful";
import styles from "./Privacy.module.scss";

const Privacy = (props) => {
  const contentData = props.data;

  return (
    <Fragment>
      <section className="container-wrapper terms-condition-page">
        <div className="max-container">
          <article className="first-container">
            <div className={styles.TermConditionWrapper}>
              <h1 className={styles.TermPageHeading}>
                {contentData ? contentData.privacy?.title : null}
              </h1>
              <div className={styles.TermConditionContent}>
                <p className={styles.TermDate}>
                  Effective{" "}
                  {contentData ? contentData.privacy?.effectiveDate : null}
                </p>
                <div className={styles.TermConditionDescription}>
                  {contentData
                    ? contentData.privacy?.privacyContent?.content &&
                      contentData.privacy?.privacyContent?.content.length
                      ? contentData.privacy?.privacyContent?.content.map(
                          (data, index) => {
                            return (
                              <p key={`privacy-${index}`}>
                                {data.content[0].value}
                              </p>
                            );
                          }
                        )
                      : null
                    : null}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </Fragment>
  );
};

export async function getStaticProps() {
    const privacy = await getContent("privacy");
  
    // Pass data to the page via props
    return {
      props: {
        data: JSON.parse(JSON.stringify({
            privacy: privacy[0].fields,
        }))
      }
    }
}

Privacy.propTypes = {};

export default Privacy;
