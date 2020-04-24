import React from 'react';
import { Spiner } from 'common/components/Spiner';
import MainLayoutClient from 'app/pages/MainLayoutClient';
import MainLayoutAdmin from 'app/pages/MainLayoutAdmin';
import { communicationUsers, IUsersConnectedProps } from 'entities/User/User.communication';
import { IAuthConnectedProps, communicationAuth } from 'entities/Auth/Auth.communication';
import { EUserRole } from 'entities/User/User.models';

type AllProps = IAuthConnectedProps & IUsersConnectedProps;

class RoleLayoutSwitch extends React.Component<AllProps> {
  render() {
    const { usersUserModel } = this.props;
    const { data } = usersUserModel;
    if (!data) {
      return null;
    }

    switch (data?.role) {
      case EUserRole.Client:
        return <MainLayoutClient />;
      case EUserRole.Admin:
        return <MainLayoutAdmin />;
      default:
        return <Spiner size="large" align="center" />;
    }
  }
}
export default communicationAuth.injector(communicationUsers.injector(RoleLayoutSwitch));
