import React, { Fragment } from "react";
import { getContent } from "../../utils/contentful";
import styles from "./ToS.module.scss";

const TermsAndCondition = (props) => {
  const contentData = props.data;
  return (
    <Fragment>
      <section className="container-wrapper terms-condition-page">
        <div className="max-container">
          <article className="first-container">
            <div className={styles.TermConditionWrapper}>
              <h1 className={styles.TermPageHeading}>
                {contentData ? contentData.tos?.title : null}
              </h1>
              <div className={styles.TermConditionContent}>
                <p className={styles.TermDate}>
                  Effective{" "}
                  {contentData ? contentData.tos?.effectiveDate : null}
                </p>
                <div className={styles.TermConditionDescription}>
                  {contentData
                    ? contentData.tos?.termsOfUseContent?.content &&
                      contentData.tos?.termsOfUseContent?.content.length
                      ? contentData.tos?.termsOfUseContent?.content.map(
                        (data, index) => {
                          return (
                            <p key={`tos-${index}`}>
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
  const tos = await getContent("termsOfUse");

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify({
        tos: tos[0].fields,
      }))
    }
  }
}

TermsAndCondition.propTypes = {};

export default TermsAndCondition;
