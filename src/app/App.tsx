import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UIErrorHandler } from 'common/components/UIErrorHandler';
import MainLayout from 'app/pages/MainLayout';
import { communicationAuth, IAuthConnectedProps } from 'entities/Auth/Auth.communication';
import ProtectedRoute from 'entities/Auth/components/ProtectedRoute';
import Login from 'entities/Auth/components/Login';
import NotFound from 'entities/Auth/components/NotFound';

export enum ERoutes {
  Login = 'login',
  SignUp = 'signup'
}

class App extends React.Component<IAuthConnectedProps> {
  render() {
    return (
      <UIErrorHandler>
        <Switch>
          <Route path={`/${ERoutes.Login}`} component={Login} exact/>

          <ProtectedRoute path="/" component={MainLayout}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </UIErrorHandler>
    );
  }
}

export default communicationAuth.injector(App);
