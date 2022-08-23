import React from "react";
import styles from "./HigherEducation.module.scss";
import ContactUs from "../../components/common/contactUs";
import SeoTages from "../../components/common/SeoTags";
import ContentUtils from '../../utils/ContentUtils';
import _ from 'lodash';
import { HeroPanel } from '../../components/common/HeroPanel';
import { SizzleReel } from '../../components/common/SizzleReel';
import { ValueBlock } from '../../components/common/ValueBlock';
import Head from "next/head";

const HigherEducation = (props) => {
  const contentData = props.data;

  if (!contentData) {
    return (<></>);
  }

  return (
    <>
      <SeoTages title={"Higher Education"} metaDescription={_.get(contentData, 'heroPanel.heroHeadline')} ogImgUrl={`https:${_.get(contentData, 'heroPanel.heroImage.fields.file.url')}`} />
      <section className={`container-wrapper ${styles.HigherEducationPage}`}>
        <div className="max-container">
          <HeroPanel heroPanelContent={_.get(contentData, 'heroPanel')} page={'highered'} />
          <SizzleReel sizzleReel={_.get(contentData, 'sizzleReel')} />
          <ValueBlock valueBlockPanel={_.get(contentData, 'valueBlockPanel')} valueBlockItem={_.get(contentData, 'valueBlockItem')} />
          <article>
            <ContactUs
              contactContent={_.get(contentData, 'connectPanel')}
            ></ContactUs>
          </article>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const contentData = await ContentUtils.getContentByPage("higherEducation");

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify(contentData))
    }
  }
}

HigherEducation.propTypes = {};

export default HigherEducation;
