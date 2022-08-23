// move blog list functions here

import * as _ from 'lodash';
import {AppRoute} from '../constants/appRoutes';
import React from 'react';
import {getContent} from './contentful';
import BlogList from '../components/BlogList';

export class ContentUtils {
    static getBlogLists = function (route, size, history) {
        // get content data from redux and filter
        const contentData = {};
        let imageUrl = null;
        if (route === AppRoute.NEWS_DETAILS) {
            imageUrl = _.get(contentData, 'newsImage.fields.file.url');
        } else if (AppRoute.BLOG_DETAILS) {
            imageUrl = _.get(contentData, 'postImage.fields.file.url');
        } else {
            imageUrl = _.get(contentData, 'image.fields.file.url');
        }
// debugger;
        return contentData.newsData
            .slice(0, 4)
            .map((data, index) => {
                const {
                    title,
                    newsImage,
                    slug,
                    hyperlink,
                } = data.fields;

                return (
                    <BlogList
                        image={imageUrl}
                        title={title}
                        summary={hyperlink}
                        slug={slug}
                        history={history}
                        RedirectTo={route}
                        key={`news-${index}`}
                    />
                );
            });
    }
    static formatDate = function (dt) {
        if(!dt){
            return null;
        }
        const date = new Date(dt);
        return new Intl.DateTimeFormat('en-us', {year: "numeric", month: "short", day: "2-digit"}).format(date);
    }

    static filterByContentType = function (content, desiredType) {
        return _.filter(content, (x) => {
            const type = _.get(x, 'sys.contentType.sys.id');
            // console.log("type: "+type);
            return _.isEqual(desiredType, type);
        })
    }
    static filterByWebpage = function (content, webpage) {
        return _.filter(content, (x) => {
            const page = _.get(x, 'fields.webpage');
            return _.isEqual(webpage, page);
        })
    }

    static async getContentByPage(page){
        const content = await getContent(null, null, {webpage: page});
        const heroPanelData = await ContentUtils.filterByContentType(content, "heroPanel");
        const sizzleReelData = await ContentUtils.filterByContentType(content, "sizzleReel");
        const valueBlockPanelData = await ContentUtils.filterByContentType(content, "valueBlockPanel");
        const valueBlockItemData = await ContentUtils.filterByContentType(content, "valueBlockItem");
        const connectPanelData = await ContentUtils.filterByContentType(content, "connectPanel");
        const testimonialsPanelData = await ContentUtils.filterByContentType(content, "testimonialsPanel");
        const testimonialItemData = await ContentUtils.filterByContentType(content, "testimonialItem");
        const featuredContentPanel = await ContentUtils.filterByContentType(content, "featuredContentPanel");
        const featuredContentItemData = await ContentUtils.filterByContentType(content, "featuredContentItem");
        const contentPartnersPanel = await ContentUtils.filterByContentType(content, "contentPartnersPanel");
        const contentPartnersLogo = await ContentUtils.filterByContentType(content, "contentPartnerLogo");
        const immersivePromoPanel = await ContentUtils.filterByContentType(content, "immersivePromoPanel");
// debugger;
        const contentData = {
            heroPanel: _.get(_.head(ContentUtils.filterByWebpage(heroPanelData, page)), 'fields'),
            sizzleReel: _.get(_.head(ContentUtils.filterByWebpage(sizzleReelData, page)), 'fields'),
            valueBlockPanel: _.get(_.head(ContentUtils.filterByWebpage(valueBlockPanelData, page)), 'fields'),
            valueBlockItem: ContentUtils.filterByWebpage(valueBlockItemData, page),
            connectPanel: _.get(_.head(ContentUtils.filterByWebpage(connectPanelData, page)), 'fields'),
            testimonialsPanel: _.get(_.head(testimonialsPanelData), 'fields'),
            testimonialItem: testimonialItemData,
            featuredContentPanel: _.get(_.head(featuredContentPanel), 'fields'),
            featuredContentItemData: featuredContentItemData,
            contentPartnersPanel: _.get(_.head(contentPartnersPanel), 'fields'),
            contentPartnersLogo: contentPartnersLogo,
            immersivePromoPanel: immersivePromoPanel
        };
// debugger;
        return contentData;
    }

    static getImage = (data) => {
        const {
            image,
            postImage,
            postThumbnail,
        } = data.fields;
        return !_.isNil(postImage) ? postImage : (!_.isNil(image)  ?  image : postThumbnail);
    };

    static getThumbnail = (data) => {
        const {
            image,
            postImage,
            postThumbnail,
        } = data.fields;
        return _.get(!_.isNil(postThumbnail) ? postThumbnail : (!_.isNil(postImage)  ?  postImage : image), 'fields.file.url');
    };

    static getSummaryForPost = (data) => {
        const {
            fullPost,
            summary
        } = data.fields;
// debugger;
        if(!_.isNil(summary)){
            return (<p>{summary}</p>);
        }

        let fullPostSummary = "";

        if(!_.isNil(fullPost)) {
            const contentNodes = _.flatMap(fullPost, 'content');
            fullPostSummary = _.flatMap(contentNodes, (i) => {
                if (_.get(i, 'nodeType') === 'hyperlink') {
                    return;
                }
                return (<p>{_.get(i, 'value')}</p>);
            });
        }
        return _.get(fullPostSummary, '0');
    };
}

export default ContentUtils;
