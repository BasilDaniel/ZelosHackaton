import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UIErrorHandler } from 'common/components/UIErrorHandler';
import { MoreInfoPage } from 'app/pages/MoreInfoPage';
import { communicationAuth, IAuthConnectedProps } from 'entities/Auth/Auth.communication';
import Login from 'entities/Auth/components/Login';
import NotFound from 'entities/Auth/components/NotFound';
import RoleLayoutSwitch from './pages/RoleLayoutSwitch';
import ApplicationPage from 'entities/Application/ApplicationPage';
import { ApplicationItem } from 'entities/Application/ApplicationItem';

export enum ERoutes {
  Login = 'login',
  ApplicationInfo = 'application-info',
  MoreInfo = 'more-info',
  ApplicationItem = 'application/:id'
}

class App extends React.Component<IAuthConnectedProps> {
  render() {
    return (
      <UIErrorHandler>
        <Switch>
          <Route path={`/${ERoutes.Login}`} component={Login} exact />
          <Route path={`/${ERoutes.MoreInfo}`} component={MoreInfoPage} exact />
          <Route path={`/${ERoutes.ApplicationInfo}`} component={ApplicationPage} exact />
          <Route path={`/${ERoutes.ApplicationItem}`} component={ApplicationItem} />
          <Route path="/" component={RoleLayoutSwitch} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </UIErrorHandler>
    );
  }
}

export default communicationAuth.injector(App);
