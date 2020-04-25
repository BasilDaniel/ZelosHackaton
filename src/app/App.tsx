import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UIErrorHandler } from 'common/components/UIErrorHandler';
import { MoreInfoPage } from 'app/pages/MoreInfoPage';
import { communicationAuth, IAuthConnectedProps } from 'entities/Auth/Auth.communication';
import Login from 'entities/Auth/components/Login';
import NotFound from 'entities/Auth/components/NotFound';
import RoleLayoutSwitch from './pages/RoleLayoutSwitch';

export enum ERoutes {
  Login = 'login',
  ApplicationInfo = 'application-info',
  MoreInfo = 'more-info',
  AdminBO = 'admin-bo'
}

class App extends React.Component<IAuthConnectedProps> {
  render() {
    return (
      <UIErrorHandler>
        <Switch>
          <Route path={`/${ERoutes.Login}`} component={Login} exact />
          <Route path={`/${ERoutes.MoreInfo}`} component={MoreInfoPage} exact />
          <Route path="/" component={RoleLayoutSwitch} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </UIErrorHandler>
    );
  }
}

export default communicationAuth.injector(App);
