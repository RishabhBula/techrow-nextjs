import Link from "next/link";
import React, { Fragment } from "react";
import { Nav } from "react-bootstrap";
import styles from "./Partner.module.scss";

const Partner = ({ title, contentData }) => {

    if(!contentData){
        return (<></>);
    }

    return (
    <Fragment>
      <div className={`${styles.PartnerSection} bg-white`}>
        <h2 className="text-primary">{title}</h2>
        <Nav className={styles.Nav}>
          {contentData.sort((a, b) => a.fields.order > b.fields.order ? 1 : -1).map((data, index) => {
            const { image } = data.fields;
            const { file } = image.fields;
            return (
              <Link key={`${index}-partner`} href="/">
                <a className={`nav-link ${styles.NavLink}`}>
                  <img src={`https:${file.url}`} alt="" />
                </a>
              </Link>
            );
          })}
        </Nav>
      </div>
    </Fragment>
  );
};

Partner.propTypes = {};

export default Partner;
