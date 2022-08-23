import PropTypes from 'prop-types';
import VideoContainer from '../VideoContainer';
import styles from './SizzleReel.module.scss';
import _ from 'lodash';

export const SizzleReel = (props) => {
    return (
        <article>
            <VideoContainer
                bannerClassName={`video-container ${styles.VideoContainer}`}
                imageClassName={styles.BannerVideoText}
                videoText={_.get(props, 'sizzleReel.sizzleHeadline.fields.file.url')}
                previewImage={_.get(props,'sizzleReel.previewImage.fields.file.url')}
                videoUrl={_.get(props, 'sizzleReel.video.fields.file.url')}
            />
        </article>
    );
}

SizzleReel.propTypes = {
    sizzleReel: PropTypes.any,
};

export default SizzleReel;
