import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import styles from './ColumnGrid.module.scss';
import { RightArrow } from "../../../assets/images/svg";
import { handleScrollToElement } from "../../../utils/helpers";
import _ from 'lodash';
import { useRouter } from "next/router";

const ColumnGrid = ({ contentData }) => {
  const router = useRouter();
  const handleNavigation = (link) => {
    if (link) {
      router.push(link)
    }else{
      handleScrollToElement("contact-us-form", null)
    }
  };
// debugger;
  if(!contentData){
    return (<></>);
  }

  if(!_.isArray(contentData)){
    contentData = [contentData];
  }
// debugger;
  return (
    <Fragment>
      <article>
        {contentData
              .map((data, index) => {
                const {
                  cta,
                  ctaLink,
                  description,
                  headline,
                  image,
                } = data.fields;
                return (
                  <Row
                    key={`${index}-row`}
                    className={styles.NavigationDetailWrapper}
                  >
                    <Col xs={12} md={6} className={styles.NavigationImg}>
                      <img src={`https:${_.get(image, 'fields.file.url')}`} alt="" />
                    </Col>
                    <Col xs={12} md={6} className={styles.NavigationDetail}>
                      <div>
                        <h2 className="text-secondary">{headline}</h2>
                        <p className="sub-title">{description}</p>
                        <p
                          className="load-more"
                          onClick={() =>
                            handleNavigation(ctaLink)
                          }
                        >
                          {cta}{" "}
                          <span className="ms-2">
                            <RightArrow />
                          </span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                );
              })}
      </article>
    </Fragment>
  );
};

ColumnGrid.propTypes = {};

export default ColumnGrid;
