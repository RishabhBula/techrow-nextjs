import React, { useState } from "react";
import PropTypes from "prop-types";
import { Nav, Offcanvas } from "react-bootstrap";
import Link from 'next/link';
import styles from "./Header.module.scss";
import logo from "../../../assets/images/logo.png";
import { MenuBar } from "../../../assets/images/svg";
import { handleActiveClass } from "../../../utils/helpers";
import { AppRoute } from "../../../constants/appRoutes";
import { useRouter } from "next/router";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <header className={styles.HeaderWrapper}>
      <div className="content-section">
        <div className={`${styles.Header} max-container`}>
          <Link href={AppRoute.HOME}>
            <a className={styles.HeaderLogo}>
              <img src={logo.src} alt="logo" />
            </a>
          </Link>
          <div className={styles.HeaderNavList}>
            <Nav className={styles.HeaderNav}>
              <Link href={AppRoute.K12}>
                <a className={`nav-link ${styles.HeaderNavLink} ${handleActiveClass(router, AppRoute.K12)}`}>K-12</a>
              </Link>
              <Link href={AppRoute.HIGHER_EDUCATION}>
                <a className={`nav-link ${styles.HeaderNavLink} ${handleActiveClass(router, AppRoute.HIGHER_EDUCATION)}`}>Higher Education</a>
              </Link>
              <Link href={AppRoute.COMPANIES}>
                <a className={`nav-link ${styles.HeaderNavLink} ${handleActiveClass(router, AppRoute.COMPANIES)}`}>Companies</a>
              </Link>
              <Link href={AppRoute.CONTENT_CREATORS}>
                <a className={`nav-link ${styles.HeaderNavLink} ${handleActiveClass(router, AppRoute.CONTENT_CREATORS)}`}>Content Creators</a>
              </Link>
              <Link
                href={AppRoute.ABOUT_US}
              >
                <a className={`nav-link ${styles.HeaderNavLink} ${handleActiveClass(router, AppRoute.ABOUT_US)}`}>About Us</a>
              </Link>
              <a
                className={`nav-link ${styles.HeaderNavLink}`}
                href={"https://stream.techrow.org/auth/login"}
                target={"_blank"}
                rel="noreferrer"
              >
                <button className={`btn btn-outline-white ${styles.HeaderBtn}`}>
                  Login
                </button>
              </a>
            </Nav>
          </div>
          <div className={styles.HeaderMenubar} onClick={handleShow}>
            <MenuBar />
          </div>
        </div>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className={styles.MenuCanvas}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>
            {" "}
            <Link href={AppRoute.HOME}>
              <a className={styles.MenuLogo}><img src={logo.src} alt="logo" /></a>
            </Link>{" "}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.MenuCanvasBody}>
          <div className={styles.MenuNavList}>
            <Nav className={styles.MenuNav}>
              <Link href={AppRoute.K12}>
                <a className={`nav-link ${handleActiveClass(router, AppRoute.K12, 'active active--underline')}`}><span>K-12</span></a>
              </Link>
              <Link href={AppRoute.HIGHER_EDUCATION}>
                <a className={`nav-link ${handleActiveClass(router, AppRoute.HIGHER_EDUCATION, 'active active--underline')}`}><span>Higher Education</span></a>
              </Link>
              <Link href={AppRoute.COMPANIES}>
                <a className={`nav-link ${handleActiveClass(router, AppRoute.COMPANIES, 'active active--underline')}`}><span>Companies</span></a>
              </Link>
              <Link href={AppRoute.CONTENT_CREATORS}>
                <a className={`nav-link ${handleActiveClass(router, AppRoute.CONTENT_CREATORS, 'active active--underline')}`}><span>Content Creators</span></a>
              </Link>
              <Link
                href={AppRoute.ABOUT_US}
              >
                <a className={`nav-link ${handleActiveClass(router, AppRoute.ABOUT_US, 'active active--underline')}`}><span>About Us</span></a>
              </Link>
              <a
                className={`nav-link`}
                href={"https://stream.techrow.org/auth/login"}
                target={"_blank"}
                rel="noreferrer"
              >
                <button className={`btn btn-outline-white ${styles.HeaderBtn}`}>
                  Login
                </button>
              </a>
            </Nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

Header.propTypes = {
  showBackground: PropTypes.bool,
};

export default Header;
