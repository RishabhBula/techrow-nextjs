import React from "react";
import styles from "./k12.module.scss";
import ContactUs from "../../components/common/contactUs";
import SeoTages from "../../components/common/SeoTags";
import ContentUtils from '../../utils/ContentUtils';
import _ from 'lodash';
import { HeroPanel } from '../../components/common/HeroPanel';
import { ValueBlock } from '../../components/common/ValueBlock';
import { FeaturedContent } from '../../components/common/FeaturedContent';
import { Testimonials } from '../../components/common/Testimonials';
import Head from "next/head";

const K12Component = (props) => {
  const contentData = props.data;

  if (!contentData) {
    return (<></>);
  }

  return (
    <>
      <SeoTages title={"K12"} metaDescription={_.get(contentData, 'heroPanel.heroHeadline')} ogImgUrl={`https:${_.get(contentData, 'heroPanel.heroImage.fields.file.url')}`} />
      <section className={`container-wrapper ${styles.K12Page}`}>
        <div className="max-container">
          <HeroPanel heroPanelContent={_.get(contentData, 'heroPanel')} page={'k12'} />
          <FeaturedContent featuredContentPanel={_.get(contentData, 'featuredContentPanel')} featuredContentItem={_.get(contentData, 'featuredContentItemData')} />
          <ValueBlock valueBlockPanel={_.get(contentData, 'valueBlockPanel')} valueBlockItem={_.get(contentData, 'valueBlockItem')} />
          <Testimonials testimonialPanel={_.get(contentData, 'testimonialPanel')} testimonialItem={_.get(contentData, 'testimonialItem')} />
          <article>
            <div className="contact-us-container">
              <ContactUs
                contactContent={_.get(contentData, 'connectPanel')}
              ></ContactUs>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const contentData = await ContentUtils.getContentByPage("k12");

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify(contentData))
    }
  }
}

K12Component.propTypes = {
};

export default K12Component;
