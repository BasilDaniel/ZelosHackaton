import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { LayoutBasic } from 'common/components/LayoutBasic';
import { ERoutes } from 'app/App';
import { Button, Row } from 'antd';
import { ButtonWrapper } from 'common/components/ButtonWrapper';

class MoreInfoPageComponent extends React.Component<RouteComponentProps> {
  render() {
    return (
      <LayoutBasic>
        <Row type="flex" justify="center" align="middle" className="content h-100">
          <div>
            <h1>More Info</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Lectus sit amet est placerat in egestas erat. Nulla facilisi nullam vehicula ipsum. Et netus et malesuada
              fames. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Facilisis volutpat est velit
              egestas. Vestibulum lorem sed risus ultricies.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Lectus sit amet est placerat in egestas erat. Nulla facilisi nullam vehicula ipsum. Et netus et malesuada
              fames. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Facilisis volutpat est velit
              egestas. Vestibulum lorem sed risus ultricies. Faucibus pulvinar elementum integer enim neque. Pretium viverra
              suspendisse potenti nullam ac tortor vitae purus. Dui vivamus arcu felis bibendum ut tristique et egestas.
              Suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Quis hendrerit dolor magna eget est
              lorem ipsum. Eu sem integer vitae justo. Morbi tincidunt augue interdum velit euismod in pellentesque massa. In nisl
              nisi scelerisque eu ultrices vitae auctor eu. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices
              sagittis.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Lectus sit amet est placerat in egestas erat. Nulla facilisi nullam vehicula ipsum.
            </p>
            <ButtonWrapper align="right">
              <Button onClick={this.goBack}>
                Back
              </Button>
              <Button type="primary" onClick={this.goToOnboarding}>
                Get started
              </Button>
            </ButtonWrapper>
          </div>
        </Row>
      </LayoutBasic>
    );
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  goToOnboarding = () => {
    const { history } = this.props;
    history.push(ERoutes.ApplicationInfo);
  };
}

export const MoreInfoPage = withRouter(MoreInfoPageComponent);
