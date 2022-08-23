import React from "react";
import styles from "./BlogList.module.scss";
import { Col, Row } from "react-bootstrap";
import { RightArrow } from "../../assets/images/svg";
import { useRouter } from "next/router";

const BlogList = ({
  title,
  slug,
  image,
  thumbnail,
  RedirectTo,
    summary
}) => {
  const router = useRouter();
  const handleBlogDetail = () => {
    const blogDetailUrl = RedirectTo.replace(":slug", slug);
    router.push(blogDetailUrl);
  };
  return (
    <Row className={`tab-list ${styles.TabList}`}>
      <Col
        xs={12}
        lg={5}
        className={`tab-img ${styles.TabImg} ${!thumbnail ? `background-container` : ""}`}
        onClick={handleBlogDetail}
        style={{ backgroundImage: !thumbnail ? `url(${image})` : null }}
      >
        {thumbnail ? <img src={thumbnail} alt="" /> : null}
      </Col>
      <Col xs={12} lg={7} onClick={handleBlogDetail} className={styles.TabDetail}>
        <h3 className={styles.TabTitle}>{title}</h3>
        {summary ? (<h5 className="blog-desc">{summary}</h5>) : null}
        <h6 className="load-more justify-content-start">
          READ MORE{" "}
          <span className="ms-2">
            <RightArrow />
          </span>
        </h6>
      </Col>
    </Row>
  );
};

BlogList.propTypes = {};

export default BlogList;
