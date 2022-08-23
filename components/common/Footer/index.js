import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import logo from "../../../assets/images/logo.png";
import { AppRoute } from "../../../constants/appRoutes";
import { Nav } from "react-bootstrap";
import { Facebook, Insta, Linkedin, Twitter, Youtube } from "../../../assets/images/svg";
import { handleActiveClass } from "../../../utils/helpers";
import {getContent} from "../../../utils/contentful";
import _ from 'lodash';
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const [footerContent, setFooterContent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    handleContent();
  }, []);

  const handleContent = async () => {
    const footerPanelData = await getContent("footerPanel");
    const footerLinkItemData = await getContent("footerLinkItem");
    setFooterContent({
      footerPanelData: footerPanelData[0].fields,
      footerLinkItemData: _.sortBy(footerLinkItemData, 'fields.order'),
    });
  };
  if(!footerContent){
    return (<></>);
  }

  return (
    <footer className={styles.Wrapper}>
      <div className={`${styles.Footer} max-container`}>
        <Link href={AppRoute.HOME}>
          <a className={styles.FooterLogo}>
            <img src={logo.src} alt="logo" />
          </a>
        </Link>
        <div className={styles.FooterNavList}>
          <Nav className={styles.FooterNav}>
            {_.get(footerContent, 'footerLinkItemData')
                  .map((data, index) => {
                    const { text, url } = data.fields;
                    const navigateTo = url?.split(".html")[0];
                    return url === "https://www.techrowfund.org/" ? (
                      <a
                        className={`nav-link ${styles.NavLink}`}
                        href={url}
                        key={`${index}-link`}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        {text}
                      </a>
                    ) : (
                      <Link
                        key={`${index}-link`}
                        href={navigateTo ? navigateTo : "/"}
                      >
                        <a className={`nav-link ${styles.NavLink} ${handleActiveClass(router, navigateTo)}`}>{text}</a>
                      </Link>
                    );
                  })}
          </Nav>
        </div>
        <div className={styles.FooterSocialList}>
          <a
            href={_.get(footerContent,'footerPanelData.facebook')}
            className={styles.SocialLink}
            target={"_blank"}
            rel="noreferrer"
          >
            {" "}
            <Facebook />{" "}
          </a>
          <a
            href={_.get(footerContent, 'footerPanelData.twitter')}
            className={styles.SocialLink}
            target={"_blank"}
            rel="noreferrer"
          >
            {" "}
            <Twitter />{" "}
          </a>
          <a
            href={_.get(footerContent, 'footerPanelData.instagram')}
            className={styles.SocialLink}
            target={"_blank"}
            rel="noreferrer"
          >
            {" "}
            <Insta />{" "}
          </a>
          <a
            href={_.get(footerContent, 'footerPanelData.youtube')}
            className={styles.SocialLink}
            target={"_blank"}
            rel="noreferrer"
          >
            {" "}
            <Youtube />{" "}
          </a>
          <a
            href={_.get(footerContent, 'footerPanelData.linkedin')}
            className={styles.SocialLink}
            target={"_blank"}
            rel="noreferrer"
          >
            {" "}
            <Linkedin />{" "}
          </a>
        </div>
        <div className={styles.CopyrightText}>
          © 2022 TechRow. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
