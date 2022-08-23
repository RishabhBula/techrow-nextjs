import React from "react";
import styles from "./Companies.module.scss";
import ContactUs from "../../components/common/contactUs";

import SeoTages from "../../components/common/SeoTags";
import _ from 'lodash';
import ContentUtils from '../../utils/ContentUtils';
import { ValueBlock } from '../../components/common/ValueBlock';
import HeroPanel from '../../components/common/HeroPanel';
import SizzleReel from '../../components/common/SizzleReel';
const CompaniesComponent = (props) => {
  const contentData = props.data;

  if (!contentData) {
    return (<></>);
  }

  return (
    <>
      <SeoTages title={"Companies"} metaDescription={_.get(contentData, 'heroPanel.heroHeadline')} ogImgUrl={`https:${_.get(contentData, 'heroPanel.heroImage.fields.file.url')}`} />
      <section className={`container-wrapper ${styles.CompaniesPage}`}>
        <div className="max-container">
          <HeroPanel heroPanelContent={_.get(contentData, 'heroPanel')} page={'companies'} />
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
  const contentData = await ContentUtils.getContentByPage("companies");

  // Pass data to the page via props
  return {
    props: {
      data: JSON.parse(JSON.stringify(contentData))
    }
  }
}

CompaniesComponent.propTypes = {};

export default CompaniesComponent;
