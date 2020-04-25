import React from 'react';
import { LayoutBasic } from 'common/components/LayoutBasic';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ERoutes } from 'app/App';

class LandingPageComponent extends React.Component<RouteComponentProps> {
  render() {
    return (
      <LayoutBasic>
        <div>
          <h1>Launch your own Zelos Community Helpdesk</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Lectus sit amet est placerat in egestas erat. Nulla facilisi nullam vehicula ipsum. Et netus et malesuada
            fames. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Facilisis volutpat est velit egestas.
            Vestibulum lorem sed risus ultricies. Faucibus pulvinar elementum integer enim neque. Pretium viverra suspendisse
            potenti nullam ac tortor vitae purus. Dui vivamus arcu felis bibendum ut tristique et egestas. Suspendisse potenti
            nullam ac tortor vitae purus faucibus ornare suspendisse. Quis hendrerit dolor magna eget est lorem ipsum. Eu sem
            integer vitae justo. Morbi tincidunt augue interdum velit euismod in pellentesque massa. In nisl nisi scelerisque eu
            ultrices vitae auctor eu. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis.
          </p>
          <div className="row end pt-200 pb-200">
            <button className="button button__white" onClick={this.goToMoreInfo}>
              More info
            </button>
            <button className="button button__green ml-250" onClick={this.goToOnboarding}>
              Get started
            </button>
          </div>
        </div>
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
