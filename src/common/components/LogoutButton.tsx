import React from 'react';
import { Button } from 'antd';

import { IAuthConnectedProps, communicationAuth } from 'entities/Auth/Auth.communication';
import { ButtonWrapper } from 'common/components/ButtonWrapper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type AllProps = IAuthConnectedProps & RouteComponentProps;

class LogoutButton extends React.Component<AllProps> {
  render() {
    return (
      <div>
        <ButtonWrapper align="right">
          <Button onClick={this.logout}>Logout</Button>
        </ButtonWrapper>
      </div>
    );
  }

  logout = () => {
    const { deleteAuthModel, history } = this.props;
    deleteAuthModel();
    localStorage.setItem('creds', '');
    history.push('/');
  };
}
export default communicationAuth.injector(withRouter(LogoutButton));
