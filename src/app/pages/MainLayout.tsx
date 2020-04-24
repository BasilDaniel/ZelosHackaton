import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spiner } from 'common/components/Spiner';
import RoleLayoutSwitch from 'app/pages/RoleLayoutSwitch';
import { communicationUsers, IUsersConnectedProps } from 'entities/User/User.communication';
import { IAuthConnectedProps, communicationAuth } from 'entities/Auth/Auth.communication';
import NotFound from 'entities/Auth/components/NotFound';

type AllProps = IAuthConnectedProps & IUsersConnectedProps;

class MainLayout extends React.Component<AllProps> {
  async componentDidMount() {
    const { authModel, getUsersUserModel } = this.props;
    const { data, loading } = authModel;
    if (data?.access && !loading) {
      await getUsersUserModel(data.access.userId);
    }
  }
  render() {
    const { usersUserModel } = this.props;
    const { loading: userRoleLoading } = usersUserModel;
    if (userRoleLoading) {
      return <Spiner size="large" align="center" />;
    }

    return (
      <Switch>
        <Route path="/" component={RoleLayoutSwitch} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}
export default communicationAuth.injector(communicationUsers.injector(MainLayout));
