import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import {Quotes} from '../../../assets/images/svg';
import styles from './Testimonials.module.scss';

export const Testimonials = (props) => {

console.log("testimonials:", props);

        return (
            <article>
                <div className={styles.TestimonialSaying}>
                    <div>
                        <div className={styles.TestimonialHeading}>
                            <h2 className="text-secondary text-center">
                                {_.get(props, 'testimonialsPanel.title')}
                            </h2>
                            <hr />
                        </div>
                        {_.get(props, 'testimonialItem')
                            .map((data, index) => {
                                const {
                                    jobTitle,
                                    quote,
                                    schoolName,
                                    visible,
                                } = data.fields;
                                return visible === "true" ? (
                                    <div
                                        key={`${index}-qoutes`}
                                        className={styles.TestimonialSectionDetail}
                                    >
                                        <div className={styles.TestimonialQuotes}>
                                            <Quotes />
                                        </div>
                                        <div>
                                            <h5
                                                className={styles.TestimonialTitle}
                                                dangerouslySetInnerHTML={{ __html: quote }}
                                            />

                                            <h6 className={styles.TestimonialSubtitle}>
                                                {jobTitle}
                                            </h6>
                                            <h6 className={`${styles.TestimonialSubtitle} ${styles.SchoolName}`}>
                                                {schoolName}
                                            </h6>
                                        </div>
                                    </div>
                                ) : null
                            })
                        }
                    </div>
                </div>
            </article>
        );

    }



Testimonials.propTypes = {
    testimonialsPanel: PropTypes.any,
    testimonialItem: PropTypes.any,
};

export default Testimonials;
