import React from 'react';
import { LayoutBasic } from 'common/components/LayoutBasic';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ERoutes } from 'app/App';
import { Button, Row } from 'antd';
import { ButtonWrapper } from 'common/components/ButtonWrapper';

class LandingPageComponent extends React.Component<RouteComponentProps> {
  render() {
    return (
      <LayoutBasic>
        <Row type="flex" justify="center" align="middle" className="content h-100">
          <div>
            <h1>Launch your own Zelos Community Helpdesk</h1>
            <p>
              Community Helpdesk for Zelos is a platform designed to receive and manage aid requests. It transforms help requests
              into clear tasks for volunteers to pick up. Community Helpdesk speeds up and facilitates the workflow of you and
              your team.
            </p>

            <p>
              Connect Community Helpdesk with your{' '}
              <a href="https://www.getzelos.com/" target="_blank" rel="noopener noreferrer">
                Zelos Volunteer Management
              </a>{' '}
              account to be able to send notifications and delegate tasks automatically to your volunteers. Find more information
              about the setup process and detailed instructions{' '}
              <a
                href="https://www.getzelos.com/how-to-set-up-community-helpdesk-for-zelos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              !
            </p>

            <ButtonWrapper align="right">
              <Button type="primary" onClick={this.goToOnboarding}>
                Get started
              </Button>
            </ButtonWrapper>
          </div>
        </Row>
      </LayoutBasic>
    );
  }

  goToMoreInfo = () => {
    const { history } = this.props;
    history.push(ERoutes.MoreInfo);
  };

  goToOnboarding = () => {
    const { history } = this.props;
    history.push(ERoutes.ApplicationInfo);
  };
}

export const LandingPage = withRouter(LandingPageComponent);
