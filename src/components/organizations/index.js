'use strict';

import { Breadcrumb } from 'react-breadcrumbs';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Detail from './detail/';
import List from './list/';
import PropTypes from 'prop-types';
import React from 'react';

class Organizations extends React.Component {
  render() {
    return (
      <Breadcrumb
        data={{ title: 'ORGANIZATIONS', pathname: this.props.match.url }}
      >
        <Switch>
          <Route exact path={`${this.props.match.path}`} component={List} />
          <Route path={`${this.props.match.path}/:orgId`} component={Detail} />
          <Redirect
            path={`${this.props.match.path}*`}
            to={`${this.props.match.url}`}
          />
        </Switch>
      </Breadcrumb>
    );
  }
}

Organizations.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export default connect()(Organizations);
