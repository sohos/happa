'use strict';

import { Breadcrumb } from 'react-breadcrumbs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

class NextSteps extends React.Component {
  render() {
    return (
      <Breadcrumb
        data={{
          title: 'NEXT-STEPS',
          pathname:
            '/organizations/' +
            this.props.match.params.orgId +
            '/clusters/' +
            this.props.match.params.clusterId +
            '/getting-started/next-steps/',
        }}
      >
        <div className='centered col-9'>
          <h1>
            <span>🎉</span> Congratulations
          </h1>
          <p>
            You have created &ndash; and destroyed &ndash; your first
            application on your brand new Kubernetes cluster on Giant Swarm.
          </p>
          <br />

          <h3>Where to go from here?</h3>
          <p>
            Now that you have a running Kubernetes cluster, you can use it to
            deploy anything you like on it.
          </p>

          <p>
            We recommend to{' '}
            <a
              href='https://blog.giantswarm.io/getting-started-with-a-local-kubernetes-environment/'
              target='_blank'
              rel='noopener noreferrer'
            >
              choose a local development environment
            </a>{' '}
            so you can test your apps before deploying to your Giant Swarm
            cluster.
          </p>

          <p>
            If you have not done so already, you should get acquainted with the{' '}
            <a
              href='https://blog.giantswarm.io/understanding-basic-kubernetes-concepts-i-introduction-to-pods-labels-replicas/'
              target='_blank'
              rel='noopener noreferrer'
            >
              basic concepts of Kubernetes
            </a>
            .
          </p>

          <p>
            Last but not least, you should check out our{' '}
            <a
              href='https://docs.giantswarm.io/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Documentation
            </a>
            , including an{' '}
            <a
              href='https://docs.giantswarm.io/basics/kubernetes-fundamentals/'
              target='_blank'
              rel='noopener noreferrer'
            >
              overview of Kubernetes Fundamentals
            </a>{' '}
            and a selection of{' '}
            <a
              href='https://docs.giantswarm.io/guides/'
              target='_blank'
              rel='noopener noreferrer'
            >
              User Guides
            </a>{' '}
            that help you set up Monitoring, Logging, and more.
          </p>

          <div className='component_slider--nav'>
            <Link
              to={`/organizations/${this.props.match.params.orgId}/clusters/${
                this.props.match.params.clusterId
              }/getting-started/example/`}
            >
              <button>
                <i className='fa fa-chevron-left' /> Back
              </button>
            </Link>
          </div>
        </div>
      </Breadcrumb>
    );
  }
}

NextSteps.propTypes = {
  goToSlide: PropTypes.func,
  match: PropTypes.object,
};

export default NextSteps;
