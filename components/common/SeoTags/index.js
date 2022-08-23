import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const SeoTages = (props) => {
  const {
    title,
    metaDescription,
    ogImgUrl,
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        property="description"
        content={metaDescription}
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/logo.png" />
      <meta
        name="og:title"
        property="og:title"
        content={title}
      />
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta
        name="og:image"
        property="og:image"
        content={ogImgUrl}
      />
      <meta
        name="og:url"
        property="og:url"
        content={ogImgUrl}
      />
      <meta
        name="twitter:title"
        property="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        property="twitter:description"
        content={metaDescription}
      />
      <meta
        name="twitter:image"
        property="twitter:image"
        content={ogImgUrl}
      />
    </Head>
  );
};

SeoTages.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  ogImgUrl: PropTypes.string,
};

export default SeoTages;
