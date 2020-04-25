import React from 'react';

import { Spiner } from 'common/components/Spiner';
import MainLayoutAdmin from 'app/pages/MainLayoutAdmin';
import { LandingPage } from 'app/pages/LandingPage';
import { IAuthConnectedProps, communicationAuth } from 'entities/Auth/Auth.communication';

type AllProps = IAuthConnectedProps;

class RoleLayoutSwitch extends React.Component<AllProps> {
  render() {
    const { authModel } = this.props;
    const { data, loading } = authModel;
    if (loading) {
      return <Spiner size="large" align="center" />;
    }

    if (data && data.access) {
      return <MainLayoutAdmin />;
    } else {
      return <LandingPage />;
    }
  }
}
export default communicationAuth.injector(RoleLayoutSwitch);
