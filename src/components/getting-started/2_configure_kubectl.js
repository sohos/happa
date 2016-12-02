'use strict';
import React from 'react';
import Slide from '../component_slider/slide';
import Markdown from './markdown';
import { CodeBlock, Prompt, Output } from './codeblock';
import FileBlock from './fileblock';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as clusterActions from '../../actions/clusterActions';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { browserHistory } from 'react-router';
import { flashAdd } from '../../actions/flashMessageActions';
import Button from '../button';
import GiantSwarm from '../../lib/giantswarm_client_wrapper';
import KubeConfig from './kubeconfig';
import platform from '../../lib/platform';
import ConfigureKubeCtlAlternative from './2_configure_kubectl_alternative';

import request from 'superagent-bluebird-promise';

var Modernizr = window.Modernizr;

var ConfigKubeCtl = React.createClass ({

  getInitialState: function() {
    return {
      loading: true,
      selectedPlatform: platform,
      alternativeOpen: false,
      gsctlVersion: '0.2.0'
    };
  },

  componentDidMount: function() {
    request.get('https://downloads.giantswarm.io/gsctl/VERSION')
    .then((response) => {
      if (response.text) {
        this.setState({
          gsctlVersion: response.text
        });
      }
    });


    if (!this.props.cluster) {
      this.props.dispatch(flashAdd({
        message: <span><b>This organization has no clusters</b><br/>This page might not work as expected.</span>,
        class: 'danger',
        ttl: 3000
      }));

      this.setState({
        loading: 'failed'
      });
    } else {
      this.setState({
        loading: true
      });

      this.props.actions.clusterLoadDetails(this.props.cluster.id)
      .then((cluster) => {
        this.setState({
          loading: false
        });
      })
      .catch((error) => {
        this.props.dispatch(flashAdd({
          message: 'Something went wrong while trying to load cluster details. Please try again later or contact support: support@giantswarm.io',
          class: 'danger',
          ttl: 3000
        }));

        this.setState({
          loading: 'failed'
        });
      });
    }
  },

  selectCluster: function(clusterId) {
    this.props.actions.clusterSelect(clusterId);
  },

  selectPlatform: function(platform) {
    this.setState({
      selectedPlatform: platform
    });
  },

  clusterId: function() {
    return this.props.cluster ? this.props.cluster.id : 'sample-cluster-id';
  },

  selectedInstallInstructions: function() {
    switch(this.state.selectedPlatform) {
      case 'Windows':
        return <div>
          <p>Download <a href={'http://downloads.giantswarm.io/gsctl/' + this.state.gsctlVersion + '/gsctl-' + this.state.gsctlVersion + '-windows-amd64.zip'}><code>gsctl</code> for Windows (64 Bit)</a> or <a href={'http://downloads.giantswarm.io/gsctl/' + this.state.gsctlVersion + '/gsctl-' + this.state.gsctlVersion + '-windows-386.zip'}>32 Bit</a></p>
          <p>Copy the contained gsctl.exe to a convenient location</p>
        </div>;
      case 'MacWithoutBrew':
        return <div>
          <CodeBlock>
            <Prompt>
              {`
                curl -O http://downloads.giantswarm.io/gsctl/` + this.state.gsctlVersion + `/gsctl-` + this.state.gsctlVersion + `-darwin-amd64.tar.gz
                tar xzf gsctl-` + this.state.gsctlVersion + `-darwin-amd64.tar.gz
                sudo cp gsctl-` + this.state.gsctlVersion + `-darwin-amd64/gsctl /usr/local/bin/
              `}
            </Prompt>
          </CodeBlock>
        </div>;
      case 'Mac':
        return <div>
          <p>Installation via <a href='http://brew.sh/' target='_blank'>homebrew</a>:</p>

          <CodeBlock>
            <Prompt>
              {`
                brew tap giantswarm/giantswarm
                brew install gsctl
              `}
            </Prompt>
          </CodeBlock>

        </div>;
      case 'Linux':
        return <div>
          <CodeBlock>
            <Prompt>
              {`
                curl -O http://downloads.giantswarm.io/gsctl/` + this.state.gsctlVersion + `/gsctl-` + this.state.gsctlVersion + `-linux-amd64.tar.gz
                tar xzf gsctl-` + this.state.gsctlVersion + `-linux-amd64.tar.gz
                sudo cp gsctl-` + this.state.gsctlVersion + `-linux-amd64/gsctl /usr/local/bin/
              `}
            </Prompt>
          </CodeBlock>
        </div>;
      default:
        <p>Shouldn't be here</p>;

    }
  },

  isSelectedPlatform: function(platform) {
    return (this.state.selectedPlatform === platform);
  },

  toggleAlternative: function() {
    this.setState({
      alternativeOpen: ! this.state.alternativeOpen
    });
  },

  render() {
    return (
      <Slide>
        <h1>Configure kubectl for your cluster {this.props.cluster ? <code>{this.clusterId()}</code> : ''}</h1>

        <p>Before we continue, make sure that you have the right cluster selected to configure access to:</p>

        {
          this.props.allClusters.length > 1 ?
          <div className='well select-cluster'>
            <div className="select-cluster--dropdown-container">
              <label>Select Cluster:</label>
              <DropdownButton id="cluster-slect-dropdown" title={this.props.cluster.id}>
                {
                  _.map(this.props.allClusters,
                    clusterId => <MenuItem key={clusterId} onClick={this.selectCluster.bind(this, clusterId)}>{clusterId}</MenuItem>
                  )
                }
              </DropdownButton>
            </div>

            <p>You might have access to additional clusters after switching to a different organization.</p>
          </div>
          :
          undefined
        }

        <p>The gsctl command line utility provides access to your Giant Swarm resources. It's perfectly suited to create credentials for kubectl in one step. Let's install gsctl quickly.</p>

        <p>In case you can't install gsctl right now, we provide an <a href="#alternative">alternative solution below.</a></p>

        <div className="platform_selector">
          <ul className='platform_selector--tabs'>
            <li className={this.isSelectedPlatform('Linux') ? 'active' : null}
                onClick={this.selectPlatform.bind(this, 'Linux')}>Linux</li>

            <li className={this.isSelectedPlatform('Mac') ? 'active' : null}
                onClick={this.selectPlatform.bind(this, 'Mac')}>Mac Homebrew</li>

            <li className={this.isSelectedPlatform('MacWithoutBrew') ? 'active' : null}
                onClick={this.selectPlatform.bind(this, 'MacWithoutBrew')}>Mac</li>

            <li className={this.isSelectedPlatform('Windows') ? 'active' : null}
                onClick={this.selectPlatform.bind(this, 'Windows')}>Windows</li>
          </ul>

          <div className="platform_selector--content">
            {this.selectedInstallInstructions()}
          </div>
        </div>

        <p>Run this command to make sure the installation succeeded:</p>

        <CodeBlock>
          <Prompt>
            {`gsctl info`}
          </Prompt>
        </CodeBlock>

        <p>Next, we let gsctl do several things in one step:</p>

        <ul>
          <li>Create a new key pair (certificate and private key) for you to access this cluster</li>
          <li>Download your key pair</li>
          <li>Download the CA certificate for your cluster</li>
          <li>Update your kubectl configuration to add settings and credentials for the cluster</li>
        </ul>

        <p>Here is the command that you need to execute for all this:</p>

        <CodeBlock>
          <Prompt>
            {`gsctl create kubeconfig --cluster ` + this.clusterId() + ` --auth-token ` + this.props.user.authToken}
          </Prompt>
        </CodeBlock>

        <p>In case you wonder: --cluster &le;cluster_id&ge; selects the cluster to provide access to. --auth-token &le;token&ge; saves you from having to enter you password again in gsctl, by re-using the token from your current web UI session.</p>

        <div className="well" id="alternative">
          <div onClick={this.toggleAlternative} className="toggle-alternative">
            {
              this.state.alternativeOpen ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-right"></i>
            }

            &nbsp; Show alternative method to configure kubectl without gsctl
          </div>
          {
            this.state.alternativeOpen ? <ConfigureKubeCtlAlternative /> : undefined
          }
        </div>

        <p>After execution, you should see what happened in detail. After credentials and settings have been added, the context matching your Giant Swarm Kubernetes cluster has been selected for use in kubectl. You can now check things using these commands:</p>

        <CodeBlock>
          <Prompt>
            {`kubectl cluster-info`}
          </Prompt>
        </CodeBlock>

        <p>This should print some information on your cluster.</p>

        <CodeBlock>
          <Prompt>
            {`kubectl get nodes`}
          </Prompt>
        </CodeBlock>

        <p>Here you should see a list of the worker nodes in your cluster.</p>

        <p>Now that this is done, let's deploy some software on your cluster and dig a little deeper.</p>

        <div className="component_slider--nav">
          <button onClick={this.props.goToSlide.bind(null, 'download')}><i className="fa fa-caret-left"></i> Back</button>
          <button className='primary' onClick={this.props.goToSlide.bind(null, 'example')}>Continue <i className="fa fa-caret-right"></i></button>
        </div>
      </Slide>
    );
  }
});

function mapStateToProps(state, ownProps) {
  var selectedOrganization = state.entities.organizations.items[state.app.selectedOrganization];
  var selectedCluster = state.entities.clusters.items[state.app.selectedCluster];

  return {
    cluster: selectedCluster,
    allClusters: state.entities.organizations.items[state.app.selectedOrganization].clusters,
    user: state.app.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(clusterActions, dispatch),
    dispatch: dispatch
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigKubeCtl);
