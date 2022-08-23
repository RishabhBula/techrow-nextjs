import PropTypes from 'prop-types';
import {Button, Col, Row} from 'react-bootstrap';
import {handleScrollToElement} from '../../../utils/helpers';
import _ from 'lodash';

export const HeroPanel = (props) => {
  return (
      <article className="first-container">
          <Row className="content-section">
              <Col xs={12} md={6} className="left-container">
                  <div>
                      <h1 className="text-secondary">
                          {_.get(props, 'heroPanelContent.heroHeadline')}
                      </h1>
                      <h5>{_.get(props, 'heroPanelContent.heroTout')}</h5>
                      <Button
                          className="text-uppercase mt-3 btn-secondary"
                          onClick={() => handleScrollToElement("contact-us-form", props.page)}
                      >
                          {_.get(props,'heroPanelContent.heroCtaLabel')}
                      </Button>
                  </div>
              </Col>
              <Col xs={12} md={6} className="right-container">
                  <img
                      src={ `https:${_.get(props, 'heroPanelContent.heroImage.fields.file.url')}`}
                      alt=""
                  />
              </Col>
          </Row>
      </article>
  );
}

HeroPanel.propTypes = {
    heroPanelContent: PropTypes.any,
    page: PropTypes.any
};

export default HeroPanel;
