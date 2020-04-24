import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IUsersConnectedProps, communicationUsers } from 'entities/User/User.communication';
import { IAuthConnectedProps, communicationAuth } from 'entities/Auth/Auth.communication';

type AllProps = IAuthConnectedProps & IUsersConnectedProps & RouteComponentProps;

class MainPageClient extends React.Component<AllProps> {
  render() {
    return <main className="main-page-client">MainPageClient</main>;
  }
}

export default communicationAuth.injector(communicationUsers.injector(withRouter(MainPageClient)));
