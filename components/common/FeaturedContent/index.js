import PropTypes from 'prop-types';
import VideoContainer from '../VideoContainer';
import React from 'react';
import _ from 'lodash';
import Slider from "react-slick";
import VideoText from "../../../assets/images/video-preview-text.svg";
import { Badge } from "react-bootstrap";
import { useRouter } from 'next/router';
import styles from './FeaturedContent.module.scss';

export const FeaturedContent = (props) => {
    const router = useRouter();

    const handleClassDetail = (slug) => {
        // debugger;
        router.push(`/class-details/${slug}`);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

        return (
            <article className={styles.K12BannerMiddle}>
                <h2 className={`text-secondary text-center ${styles.TextSecondary}`}>
                    {_.get(props, 'featuredContentPanel.title')}
                </h2>
                <div className={styles.BannerWrapper}>
                    <VideoContainer
                        bannerClassName={`video-container ${styles.BannerImgWrapper}`}
                        imageClassName={styles.BannerVideoText}
                        videoHeadline={_.get(props, 'featuredContentPanel.videoHeadline')}
                        videoText={VideoText}
                        videoDescription={_.get(props, 'featuredContentPanel.videoDescription')}
                        isText
                        previewImage={_.get(props, 'featuredContentPanel.videoImage.fields.file.url')}
                        videoUrl={_.get(props, 'featuredContentPanel.video.fields.file.url')}
                    />
                    <div className={styles.BannerSliderWrapper}>
                        <Slider {...settings}>
                            {_.get(props, 'featuredContentItem').map((list, index) => {
                                const { classTitle, classPromoImage, id } =
                                list?.fields || {};
                                const { file } = classPromoImage?.fields || {};
                                console.log(classTitle, "listlistlist", list?.fields);
                                return (
                                    <div
                                        key={`${index}-list`}
                                        className={styles.BannerSlider}
                                        onClick={() => handleClassDetail(id)}>
                                        <img
                                            key={index}
                                            src={`https:${file?.url}`}
                                            alt=""
                                            className={styles.SliderImg}
                                        />
                                        <div className={`class-detail ${styles.ClassDetail}`}>
                                            <p className="class-type">
                                                <Badge pill bg="primary">
                                                    NEW
                                                </Badge>
                                            </p>
                                            <h3 className={styles.ClassTitle}>{classTitle}</h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </article>
        );


    }



FeaturedContent.propTypes = {
    featuredContentPanel: PropTypes.any,
    featuredContentItem: PropTypes.any,
};

export default FeaturedContent;
