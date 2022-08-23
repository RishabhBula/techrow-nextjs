import PropTypes from 'prop-types';
import Header from '../Header';
import React from 'react';
import ColumnGrid from '../ColumnGrid';
import _ from 'lodash';

export const ValueBlock = (props) => {

console.log("valueProps:", props);
if(props) {
    return (
        <article className="navigation-detail-dark-v">
            <h2 className="nav-v-title">
                {_.get(props, 'valueBlockPanel.title')}
            </h2>
            <ColumnGrid
                contentData={_.get(props, 'valueBlockItem')}
            />
        </article>
    );
}

return null;
    }

Header.propTypes = {
    valueBlockPanel: PropTypes.any,
    valueBlockItem: PropTypes.any,
};

export default Header;
