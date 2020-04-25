import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UIErrorHandler } from 'common/components/UIErrorHandler';
import { LandingPage } from 'app/pages/LandingPage';
import { communicationAuth, IAuthConnectedProps } from 'entities/Auth/Auth.communication';
import ProtectedRoute from 'entities/Auth/components/ProtectedRoute';
import Login from 'entities/Auth/components/Login';
import NotFound from 'entities/Auth/components/NotFound';
import { MoreInfoPage } from 'app/pages/MoreInfoPage';

export enum ERoutes {
  Login = 'login',
  SignUp = 'signup',
  ApplicationInfo = 'application-info',
  MoreInfo = 'more-info'
}

class App extends React.Component<IAuthConnectedProps> {
  render() {
    return (
      <UIErrorHandler>
        <Switch>
          <Route path={`/${ERoutes.Login}`} component={Login} exact />
          <Route path={`/${ERoutes.MoreInfo}`} component={MoreInfoPage} />
          <Route path="/" component={LandingPage} />
          <Route path="*" component={NotFound} />
          <ProtectedRoute path="/admin" component={() => <></>} /> {/* Path and component are dummy*/}
        </Switch>
      </UIErrorHandler>
    );
  }
}

export default communicationAuth.injector(App);
