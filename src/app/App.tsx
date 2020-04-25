import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UIErrorHandler } from 'common/components/UIErrorHandler';
import { communicationAuth, IAuthConnectedProps } from 'entities/Auth/Auth.communication';
import Login from 'entities/Auth/components/Login';
import NotFound from 'entities/Auth/components/NotFound';
import RoleLayoutSwitch from './pages/RoleLayoutSwitch';

export enum ERoutes {
  Login = 'login'
}

class App extends React.Component<IAuthConnectedProps> {
  render() {
    return (
      <UIErrorHandler>
        <Switch>
          <Route path={`/${ERoutes.Login}`} component={Login} exact />
          <Route path="/" component={RoleLayoutSwitch} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </UIErrorHandler>
    );
  }
}

export default communicationAuth.injector(App);
